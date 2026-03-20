// Script para efeito de digitação no hero.
(function () {
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const seg0 = "Olá eu sou";
  const seg1 = "Leandro Araújo";
  const seg2 = "e seja bem vindo ao meu portfólio.";

  const el0 = document.getElementById("typing-seg0");
  const el1 = document.getElementById("typing-seg1");
  const el2 = document.getElementById("typing-seg2");
  const cursor = document.querySelector(".typing-cursor");

  if (!el0 || !el1 || !el2) return;

  if (prefersReduced) {
    el0.textContent = seg0;
    el1.textContent = seg1;
    el2.textContent = seg2;
    if (cursor) cursor.style.display = "none";
    return;
  }

  function typeInto(el, text, speedMs) {
    return new Promise((resolve) => {
      let i = 0;
      const tick = () => {
        el.textContent = text.slice(0, i);
        i++;
        if (i > text.length) {
          resolve();
          return;
        }
        setTimeout(tick, speedMs);
      };
      tick();
    });
  }

  (async function runTyping() {
    const speedMs = 28; // velocidade do "digitando"
    await typeInto(el0, seg0, speedMs);
    await new Promise((r) => setTimeout(r, 220));
    await typeInto(el1, seg1, speedMs);
    await new Promise((r) => setTimeout(r, 220));
    await typeInto(el2, seg2, speedMs);
  })();
})();

// Intersection Observer para animações de entrada (reveal)
(function () {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();



// Mobile Menu Toggle
(function () {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      // Alterna o ícone se ele existir
      const icon = menuBtn.querySelector('i');
      if (icon) {
        if (nav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Fechar menu ao clicar em um link
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
})();
