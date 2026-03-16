const userOpts = {
  // Define any specific options here if needed, or leave empty
}

document.addEventListener("nav", () => {
  const logo = document.querySelector(".Logo") as HTMLImageElement
  
  if (!logo) return

  // Preload the hover image to prevent flickering
  const hoverSrc = logo.getAttribute("data-hover")
  if (hoverSrc) {
    const img = new Image()
    img.src = hoverSrc
  }

  const baseSrc = logo.getAttribute("data-base-src") || logo.src

  logo.addEventListener("mouseenter", () => {
    if (logo.getAttribute("data-hover")) {
      logo.src = logo.getAttribute("data-hover")!
    }
  })

  logo.addEventListener("mouseleave", () => {
    logo.src = baseSrc
  })
})