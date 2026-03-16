import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { joinSegments } from "../util/path"
// @ts-ignore
import script from "./scripts/pageTitle.inline" // Import script to handle logo hover effect

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const iconPath = joinSegments(baseDir, "static/Logo.png") // Original logo path
  const hoverIconPath = joinSegments(baseDir, "static/Logo-hover.png") // Hover logo path (swapped on mouse enter)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
         <img class="Logo" src={iconPath} alt={title} data-hover={hoverIconPath}/> {/* data-hover stores alternate image path */}
      </a>
    </h2>
  )
}
   PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title a {
  display: inline-block; /* Allows proper hover effect positioning */
}

.Logo {
  max-height: 88px;
  min-height: 33px;
  max-width: 88px;
  min-width: 33px;
  margin: 0;
  margin-top:10px;
  margin-left:-50%;
  margin-right:50%;
  
  transition: opacity 0.12s ease; /* Smooth fade transition on hover */
  cursor: pointer; /* Shows clickable pointer */
}

.page-title a:hover .Logo {
  opacity: 100;  /* Fades logo slightly on hover */
}
`



export default (() => PageTitle) satisfies QuartzComponentConstructor