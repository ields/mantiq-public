(function () {
  function applyFilter() {
    const isDark = document.documentElement.getAttribute("saved-theme") === "dark";
    const imgs = document.querySelectorAll("img.theme-image");
    imgs.forEach((img) => {
      if (isDark) {
        // Dark mode: lighten image for dark background
        img.style.filter = "brightness(1.2) saturate(1.1)";
      } else {
        // Light mode: darken slightly for light background
        img.style.filter = "brightness(0.3) saturate(1.2)";
        
      }
    });
  }

  new MutationObserver(() => applyFilter()).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["saved-theme"],
  });

  document.addEventListener("DOMContentLoaded", applyFilter);
})();