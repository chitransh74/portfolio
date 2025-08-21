// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }),
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background opacity on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 23, 42, 0.98)";
  } else {
    header.style.background = "rgba(15, 23, 42, 0.95)";
  }
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute("data-progress");
          entry.target.style.width = progress + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  skillBars.forEach((bar) => observer.observe(bar));
};

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((el) => observer.observe(el));
};

// Testimonials slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-card");

const showTestimonial = (index) => {
  testimonials.forEach((testimonial, i) => {
    if (i === index) {
      testimonial.classList.add("active");
    } else {
      testimonial.classList.remove("active");
    }
  });
};

const nextTestimonial = () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
};

// Auto-rotate testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Counter animation for stats
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-item h3");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.textContent.replace("+", ""));
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target + "+";
              clearInterval(timer);
            } else {
              entry.target.textContent = Math.floor(current) + "+";
            }
          }, 30);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
};

// Typing animation for hero title
const typeWriter = () => {
  const text = "Content Writer";
  const typingElement = document.querySelector(".typing-animation");
  let i = 0;

  typingElement.textContent = "";

  const type = () => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  };

  type();
};

// Add scroll-triggered animations to elements
const addScrollAnimations = () => {
  // Add classes for animation
  document
    .querySelectorAll(".section-title")
    .forEach((el) => el.classList.add("fade-in"));
  document
    .querySelectorAll(".about-text")
    .forEach((el) => el.classList.add("slide-in-left"));
  document
    .querySelectorAll(".about-image")
    .forEach((el) => el.classList.add("slide-in-right"));
  document.querySelectorAll(".skill-category").forEach((el, index) => {
    el.classList.add(index % 2 === 0 ? "slide-in-left" : "slide-in-right");
  });
  document
    .querySelectorAll(".project-card")
    .forEach((el) => el.classList.add("fade-in"));
  document.querySelectorAll(".timeline-item").forEach((el, index) => {
    el.classList.add(index % 2 === 0 ? "slide-in-left" : "slide-in-right");
  });
  document
    .querySelectorAll(".contact-info")
    .forEach((el) => el.classList.add("slide-in-left"));
  document
    .querySelectorAll(".contact-cta")
    .forEach((el) => el.classList.add("slide-in-right"));
};

// Parallax effect for hero section
const parallaxEffect = () => {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".hero");
    const speed = scrolled * 0.5;

    if (parallax) {
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });
};

// Initialize all animations and effects
document.addEventListener("DOMContentLoaded", () => {
  typeWriter();
  addScrollAnimations();
  animateOnScroll();
  animateSkillBars();
  animateCounters();
  parallaxEffect();

  // Add loading animation
  document.body.classList.add("loaded");
});

// Preloader (optional)
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.remove(), 500);
  }
});

// Add smooth reveal animation for page load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = "1";
  }, 100);
});
