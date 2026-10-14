/* ============================================================
   main.js — nav, theme, scroll reveal, counters, toast,
              contact form, status bar, misc wiring
   ============================================================ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------- toast ---------------- */
  const toastEl = $("#toast");
  let toastTimer = null;
  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  };

  /* ---------------- navbar ---------------- */
  const navbar = $("#navbar");
  const navToggle = $("#navToggle");
  const navBackdrop = $("#navBackdrop");

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }
  if (navBackdrop) navBackdrop.addEventListener("click", closeNav);
  $$(".nav-links a").forEach((a) => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* ---------------- theme toggle ---------------- */
  const themeToggle = $("#themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const html = document.documentElement;
      const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
      html.setAttribute("data-theme", next);
      try { localStorage.setItem("portfolio-theme", next); } catch (e) {}
    });
  }

  /* ---------------- scroll: navbar state + progress bar ---------------- */
  const progress = $("#scrollProgress");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (navbar) navbar.classList.toggle("scrolled", y > 8);
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- active nav link ---------------- */
  const sections = ["about", "experience", "projects", "skills", "certifications", "education", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinksById = new Map(
    $$(".nav-links a").map((a) => [a.getAttribute("href").replace("#", ""), a])
  );
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          navLinksById.forEach((link) => link.classList.remove("active"));
          const link = navLinksById.get(en.target.id);
          if (link) link.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------------- reveal on scroll ---------------- */
  let revealsStarted = false;
  const startReveals = () => {
    if (revealsStarted) return;
    revealsStarted = true;
    const items = $$(".reveal, .reveal-left, .reveal-right");
    if (REDUCED || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      runCounters();
      runBars();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          io.unobserve(en.target);
          if (en.target.querySelector("[data-count]") || en.target.matches("[data-count]")) runCounters();
          if (en.target.querySelector(".bar-fill")) runBars();
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
    /* safety: any element still hidden after entering view */
    runCounters();
    runBars();
  };

  /* ---------------- animated counters ---------------- */
  let countersDone = false;
  const runCounters = () => {
    if (countersDone) return;
    const nodes = $$("[data-count]");
    if (!nodes.length) return;
    const visible = nodes.filter((n) => n.getBoundingClientRect().top < window.innerHeight);
    if (!visible.length) return;
    countersDone = true;
    visible.forEach((node) => {
      const target = parseInt(node.dataset.count, 10) || 0;
      const suffix = node.dataset.suffix || "";
      if (REDUCED) { node.textContent = target + suffix; return; }
      const dur = 1300;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };
  /* re-evaluate if user scrolls fast before observer fires */
  window.addEventListener("scroll", () => { if (!countersDone) runCounters(); }, { passive: true });

  /* ---------------- animated bars (languages) ---------------- */
  const runBars = () => {
    $$(".bar-fill").forEach((bar) => {
      if (bar.dataset.done) return;
      const r = bar.getBoundingClientRect();
      if (r.top < window.innerHeight - 30 && r.bottom > 0) {
        bar.dataset.done = "1";
        bar.style.width = (bar.dataset.level || 0) + "%";
      }
    });
  };
  window.addEventListener("scroll", runBars, { passive: true });

  /* ---------------- profile photo fallback ---------------- */
  const photo = $("#profilePhoto");
  const fallback = $("#avatarFallback");
  if (photo && fallback) {
    const showFallback = () => { photo.style.display = "none"; fallback.hidden = false; };
    photo.addEventListener("error", showFallback);
    if (photo.complete && photo.naturalWidth === 0) showFallback();
  }

  /* ---------------- project repo links ---------------- */
  /* set data-repo="owner/repo" in index.html to point a card at a specific repo */
  $$(".project-link[data-repo]").forEach((link) => {
    const repo = link.dataset.repo.trim();
    if (repo) link.href = "https://github.com/" + repo;
  });

  /* ---------------- copy email ---------------- */
  const copyBtn = $("#copyEmail");
  const EMAIL = "Bouzidiarbia99@gmail.com";
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(EMAIL);
        ok = true;
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
        document.body.removeChild(ta);
      }
      toast(ok ? I18N.t("toast.copied") : EMAIL);
    });
  }

  /* ---------------- contact form → mailto ---------------- */
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const name = $("#cfName").value.trim();
      const email = $("#cfEmail").value.trim();
      const msg = $("#cfMsg").value.trim();
      const subject = encodeURIComponent(`Portfolio contact — ${name}`);
      const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
      toast(I18N.t("toast.sent"));
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  /* ---------------- back to top ---------------- */
  const backTop = $("#backTop");
  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
    });
  }

  /* ---------------- status bar clock (Europe/Paris) ---------------- */
  const timeEl = $("#statusTime");
  if (timeEl) {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZone: "Europe/Paris"
    });
    const tick = () => { timeEl.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- boot coordination: reveals start after boot ---------------- */
  window.addEventListener("boot:done", startReveals, { once: true });
  /* fallback if effects.js never fires (error / reduced-motion boot) */
  setTimeout(startReveals, 2600);
});
