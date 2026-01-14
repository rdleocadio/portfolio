document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // HERO ENTER
  // =========================
  const hero = document.querySelector(".hero--enter");
  if (hero) {
    // garante que o browser aplique o estado inicial antes de animar
    requestAnimationFrame(() => {
      hero.classList.add("is-loaded");
    });
  }

  // =========================
  // SCROLL STAGGER (por seção)
  // =========================
  const sections = document.querySelectorAll(".section--enter");
  if (!sections.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        const items = section.querySelectorAll(".reveal");

        // define delays uma vez (e mantém 0ms em reduced motion)
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
      rootMargin: "0px 0px -10% 0px",
    }
  );

  sections.forEach((s) => io.observe(s));
});
