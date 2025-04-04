document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navLinks = document.getElementById("nav-links")

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav") && !event.target.closest("#hamburger")) {
      navLinks.classList.remove("active")
    }
  })

  // Close menu when clicking on a link
  const navLinksItems = document.querySelectorAll(".nav-links a")
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
    })
  })
})

