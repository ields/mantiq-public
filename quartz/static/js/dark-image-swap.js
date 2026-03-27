(function () {
  function applyFilter() {
    const isDark = document.documentElement.getAttribute("saved-theme") === "dark";
    const imgs = document.querySelectorAll("img.theme-image");
    imgs.forEach((img) => {
      if (isDark) {
        // Dark mode: shift to teal/cyan color
        img.style.filter = "brightness(3.7)  hue-rotate(360deg)";
      } else {
        // Light mode: shift to blue color
        img.style.filter = "hue-rotate(-225deg) brightness(0.5)";
      }
    });
  }

  new MutationObserver(() => applyFilter()).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["saved-theme"],
  });

  document.addEventListener("DOMContentLoaded", applyFilter);
})();