export function initAnimations() {
  const hero = document.querySelector(".hero--enter");

  if (hero) {
    requestAnimationFrame(() => {
      hero.classList.add("is-loaded");
    });
  }

  const sections = document.querySelectorAll(".section--enter");

  if (!sections.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => {
      const items = section.querySelectorAll(".reveal");

      items.forEach((el) => {
        el.style.setProperty("--d", "0ms");
      });

      section.classList.add("is-visible");
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        const items = section.querySelectorAll(".reveal");

        items.forEach((el, idx) => {
          el.style.setProperty("--d", prefersReduced ? "0ms" : `${idx * 90}ms`);
        });

        if (entry.isIntersecting) {
          section.classList.add("is-visible");
        } else {
          section.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  sections.forEach((section) => io.observe(section));
}
