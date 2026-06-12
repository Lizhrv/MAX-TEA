// ===== MAX TEA — Interacciones =====

// Año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  links.classList.toggle("open");
});

// Cerrar menú al hacer clic en un enlace
links.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => links.classList.remove("open"));
});

// Visor del logo: al hacer clic en el logo (menú o footer) se abre completo
const logobox = document.getElementById("logobox");
const logoboxClose = document.getElementById("logoboxClose");

function openLogobox(e) {
  if (e) e.preventDefault();
  logobox.classList.add("open");
  logobox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLogobox() {
  logobox.classList.remove("open");
  logobox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".nav__brand, .footer__logo").forEach((el) => {
  el.addEventListener("click", openLogobox);
});
logoboxClose.addEventListener("click", closeLogobox);
logobox.addEventListener("click", (e) => {
  if (e.target === logobox) closeLogobox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLogobox();
});

// Aparición suave al hacer scroll — a prueba de fallos:
// si el navegador no soporta IntersectionObserver o algo falla,
// el contenido permanece SIEMPRE visible (la clase .reveal solo se
// agrega cuando el observer está activo).
const revealEls = document.querySelectorAll(
  ".product, .about__card, .nutrition__info, .nutrition__ingredients, .contact__card"
);

if ("IntersectionObserver" in window && revealEls.length) {
  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealEls.forEach((el) => observer.observe(el));

  // Red de seguridad: revelar todo después de 2s por si el observer falla
  setTimeout(() => {
    revealEls.forEach((el) => el.classList.add("revealed"));
  }, 2000);
}
