import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// --- CONFIGURATION ---
// 1. Where is your Obsidian Vault located on your computer?
const VAULT_PATH = '/Users/macields/Vaults/mantiq-public';

// 2. Point this to your sort plugin's data file.
// COMMON PATHS:
// Bartender:  path.join(VAULT_PATH, '.obsidian/plugins/obsidian-bartender/data.json')
// Bookmarks:  path.join(VAULT_PATH, '.obsidian/bookmarks.json')
const SORT_CONFIG_PATH = path.join(VAULT_PATH, '/Users/macields/Vaults/mantiq-public/content/.obsidian/bookmarks.json');

// 3. Where is your Quartz content folder?
const QUARTZ_CONTENT_PATH = 'content';
// ---------------------

async function main() {
  if (!fs.existsSync(SORT_CONFIG_PATH)) {
    console.error(`❌ Could not find sort config at: ${SORT_CONFIG_PATH}`);
    return;
  }

  console.log(`Reading sort order from: ${SORT_CONFIG_PATH}`);
  const data = JSON.parse(fs.readFileSync(SORT_CONFIG_PATH, 'utf8'));
  
  // Parse the sort order based on which plugin you use
  let fileList = [];

  // PARSER FOR BARTENDER (Modify if using a different plugin)
  if (data.file_sorter) {
    // This extracts the custom order from Bartender
    // Note: Bartender structure varies, this is a general catch for the custom list
    // You might need to inspect your data.json to match exact keys
    Object.keys(data.file_sorter).forEach(folder => {
        fileList.push(...data.file_sorter[folder]);
    });
  } 
  // PARSER FOR BOOKMARKS (Core Plugin)
  else if (data.items) {
    fileList = data.items
      .filter(item => item.type === 'file' || item.type === 'folder')
      .map(item => item.path);
  }

  console.log(`Found ${fileList.length} sorted items.`);

  // Apply order to files
  fileList.forEach((filePath, index) => {
    // Determine where this file lives in Quartz
    const quartzFilePath = path.join(QUARTZ_CONTENT_PATH, filePath);
    
    // Check if it's a file or a folder (for folders, look for index.md)
    let targetFile = quartzFilePath;
    if (!fs.existsSync(targetFile) && !targetFile.endsWith('.md')) {
        targetFile = path.join(targetFile, 'index.md');
    }

    if (fs.existsSync(targetFile)) {
      updateFrontmatter(targetFile, index + 1);
    }
  });
}

function updateFrontmatter(filePath, orderValue) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(fileContent);

  // Only update if the order is different to avoid unnecessary writes
  if (parsed.data.order !== orderValue) {
    parsed.data.order = orderValue;
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated: ${path.basename(filePath)} -> Order: ${orderValue}`);
  }
}

main();