import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
  sections?: {
    title: string
    links: Record<string, string>
    color?: string
  }[]
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const sections = opts?.sections ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p> 
          {i18n(cfg.locale).components.footer.createdWith}{" "}
           <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        
        {/* Default links */}
        {Object.entries(links).length > 0 && (
          <ul class="footer-links">
            {Object.entries(links).map(([text, link]) => (
              <li>
                <a href={link}>{text}</a>
              </li>
            ))}
          </ul>
        )}

        {/* Separate colored sections */}
        {sections.length > 0 && (
          <div class="footer-sections">
            {sections.map((section) => (
              <div class="footer-section" style={section.color ? `--section-color: ${section.color}` : ""}>
                <h4 class="section-title">{section.title}</h4>
                <ul class="section-links">
                  {Object.entries(section.links).map(([text, link]) => (
                    <li>
                      <a href={link}>{text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor



          

