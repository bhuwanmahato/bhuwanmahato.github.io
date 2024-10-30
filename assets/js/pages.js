document.addEventListener("DOMContentLoaded", () => {
  // Image animation
  const images = document.querySelectorAll(".gallery-image");
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  images.forEach((image) => {
    imageObserver.observe(image);
  });

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Add active class to nav items when scrolling
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -30% 0px", // Adjusted rootMargin for better detection
    threshold: [0, 0.1, 0.5], // Multiple thresholds for better accuracy
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active class from all nav links
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add active class to corresponding nav link
        const targetId = entry.target.id;
        const correspondingLink = document.querySelector(
          `.nav-link[href="#${targetId}"]`
        );
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Smooth scroll to section when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Scroll to top functionality
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }

  // Initial check for scroll position
  toggleScrollButton();

  // Progress bar functionality
  const progressBar = document.querySelector(".progress-bar");

  function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;
    toggleScrollButton(); // Update scroll button visibility
  }

  // Listen for scroll events - combine both functions
  window.addEventListener("scroll", updateProgressBar);

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initial progress bar update
  updateProgressBar();
});
