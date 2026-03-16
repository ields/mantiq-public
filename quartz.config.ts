import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "المنطق",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
  
    analytics: {
      provider: "plausible",
    },
    locale: "ar-SA",
    baseUrl: "logicledge.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "monospace",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8ff",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#124669ff",
          tertiary: "#469c86ff",
          highlight: "#8f9fa926",
          textHighlight: "#fff23688",
          hovercolor:"#6e09b6ff"
        },
        darkMode: {
          light: "rgba(15, 16, 16, 1)", //#0e1010ff"
          lightgray: "#202021ff",
          gray: "#30363d",
          darkgray: "#b7b9bdff",
          dark: "#c9d1d9",
          secondary: "#00e5bf",
          tertiary: "#169681ff", //#32857aff //#d20cffff
          highlight: "rgba(56, 139, 253, 0.15)",
          textHighlight: "#2b1787ff",
          hovercolor:"#00fac8"
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

/// darkMode: {
//  light: "#0d1117",              // main background
//  lightgray: "#161b22",          // secondary background / cards
//  gray: "#30363d",               // borders / subtle separators
//  darkgray: "#8b949e",           // muted text
//  dark: "#c9d1d9",               // main text color
// secondary: "#58a6ff",          // primary accent / links
//  tertiary: "#3fb950",           // secondary accent / success
//  highlight: "rgba(56, 139, 253, 0.15)", // selection / hover highlight
//  textHighlight: "#bb800966",    // inline text highlight
//}
