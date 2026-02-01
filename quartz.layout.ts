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
