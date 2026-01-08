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
        title: "Documentation",
        color: "#e89217", // Orange
        links: {
          "Getting Started": "/",
          API: "/docs/api",
          "Configuration": "/docs/config",
        },
      },
      {
        title: "Community",
        color: "#176de8", // Blue
        links: {
          Discord: "https://discord.gg",
          Forum: "https://forum.example.com",
          "Contact Us": "mailto:hello@example.com",
        },
      },
      {
        title: "Resources",
        color: "#4caf50", // Green
        links: {
          Blog: "/blog",
          "Privacy Policy": "/privacy",
          License: "/license",
        },
      },
    ],
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
    Component.Explorer(),
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
