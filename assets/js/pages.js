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

  // Enhanced Navigation Highlighting
  const sections = document.querySelectorAll(".content-section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");

  // Options for the intersection observer
  const navOptions = {
    rootMargin: "-50% 0px -50% 0px", // Considers element in viewport when it's in the middle 50%
    threshold: 0,
  };

  // Create a map to store section positions
  const sectionPositions = new Map();

  // Function to update section positions
  const updateSectionPositions = () => {
    sections.forEach((section) => {
      sectionPositions.set(
        section.id,
        section.getBoundingClientRect().top + window.scrollY
      );
    });
  };

  // Initial update of section positions
  updateSectionPositions();

  // Update section positions on window resize
  window.addEventListener("resize", updateSectionPositions);

  // Function to get the current section
  const getCurrentSection = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let currentSection = "";
    sectionPositions.forEach((position, id) => {
      if (scrollPosition >= position) {
        currentSection = id;
      }
    });

    return currentSection;
  };

  // Function to update active navigation link
  const updateActiveLink = () => {
    const currentSection = getCurrentSection();

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === "#" + currentSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    updateActiveLink();
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Check if it's not the home link
      if (href !== "/") {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Scroll to Top functionality
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Show/hide button based on scroll position
  const toggleScrollButton = () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  };

  // Initial check for scroll position and active section
  toggleScrollButton();
  updateActiveLink();

  // Listen for scroll events
  window.addEventListener("scroll", () => {
    toggleScrollButton();
  });

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Image lazy loading
  const lazyLoadImages = () => {
    const images = document.querySelectorAll(".gallery-image:not([src])");
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("visible");
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "100px" }
    );

    images.forEach((img) => imageObserver.observe(img));
  };

  lazyLoadImages();
});
