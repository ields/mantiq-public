import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"



// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [], // Add DynamicNav to header to show section links
  afterBody: [],
  footer: Component.Footer({
    links: {},
    sections: [
      {
        title: "للتَّصويب والإضافات",
        color: "#1fe0d0ff", // Secondary
        links: {
          "البريد": "mailto:fayram@mailfence.com",
        },
      },
      {
        title: "منصات الشيخ عبد الحميد التركماني",
        color: "#1fe0d0ff", // Secondary
        links: {
          تيليجرام: "https://t.me/AbdHamidTurkmen",
          " فيس بوك": "https://www.facebook.com/abdulhameedturkumani/",
          "إكس": "https://x.com/AbdHamidTurkmen",
        },
      },
      {
        title: " مصادر متعلقة",
        color: "#1fe0d0ff", // Secondary
        links: {
          "Open Logic Project": "https://builds.openlogicproject.org",
          "Art of Reasoning": "https://art-of-reasoning.huygens.knaw.nl",
          "Logic Matters": "https://www.logicmatters.net",
        },
      },

      {
        title: " محتوى الصفحة",
        color: "#1fe0d0ff", // Secondary
        links: {
          "Markdown[.md]": "https://github.com/ields/logicledge-content.git",
        },
      },
    ]
  }),
}
/* footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz", 
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
*/

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
        
      ],
    }),
    
     
Component.Explorer({
   // checking this is the right section
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: true,
  // COPY FROM HERE DOWN ---------
  sortFn: (a, b) => {
    // 1. DEFINE YOUR CUSTOM ORDER HERE
    // specific folder names get specific numbers (lower = higher up)
    const nameOrderMap: Record<string, number> = {
      "المنطق [0]": 1,     // Change "Start Here" to your first folder name
      "المِرْقَاة": 2,    // Change to your second folder
      "التَّهذِيب": 3,
      "الشَّمْسِيَّة": 4,        // Change to your third
      "العلم الحصولي": 5,
      "التصور": 6,
      "التصديق": 7,
      "الحجة": 8,
      "الكلي": 9,
      "الجزئي":10,
      "المُعرِّف":11,
      "Archives": 100,     // Force this to the bottom

    
      // --- Inside "المنطق [0]" Folder ---
      "مقدمة": 1,  // This will sort to the top *inside* Projects
      "التصورات": 2,
      "التصديقات": 3,
      "Archived": 99,        // This will sink to the bottom *inside* Projects

      "التعريف": 1,
      "موضوعه":2,
      "وجهُ الحاجةِ":3,
      "مباحث الألفاظ": 4,
      // --- Inside "Areas" Folder ---

      "Health": 1,
      "Finance": 2,
      

      // --- Specific Files ---
      "Start Here": 0,
    }

    let orderA = nameOrderMap[a.displayName] ?? 999
    let orderB = nameOrderMap[b.displayName] ?? 999

    // 2. Apply the custom order
    if (orderA !== orderB) {
      return orderA - orderB
    }

    // // 3. CORRECTED LOGIC: Use .isFolder instead of checking children manually

    if (a.isFolder && !b.isFolder) {
      return -1 // Folder comes before File
    }
    if (!a.isFolder && b.isFolder) {
      return 1 // File comes after Folder
    }

    // 4. Everything else sorts Alphabetically
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
}),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
