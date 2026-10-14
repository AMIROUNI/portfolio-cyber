/* ============================================================
   effects.js — boot sequence, matrix rain, typing roles,
                 cursor glow, 3D tilt
   All effects respect prefers-reduced-motion and pause when
   the tab is hidden.
   ============================================================ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     1. BOOT SEQUENCE (once per session, skippable)
     ========================================================= */
  const boot = document.getElementById("boot");
  const finishBoot = (() => {
    let done = false;
    return () => {
      if (done) return;
      done = true;
      if (boot) boot.classList.add("hidden");
      document.body.style.overflow = "";
      try { sessionStorage.setItem("ab-boot", "1"); } catch (e) {}
      window.dispatchEvent(new Event("boot:done"));
    };
  })();

  if (boot) {
    let seen = false;
    try { seen = sessionStorage.getItem("ab-boot") === "1"; } catch (e) {}

    if (seen || REDUCED) {
      boot.classList.add("hidden");
      finishBoot();
    } else {
      document.body.style.overflow = "hidden";
      const lines = boot.querySelectorAll(".boot-line");
      const granted = boot.querySelector(".boot-granted");
      lines.forEach((l, i) => setTimeout(() => l.classList.add("show"), 250 + i * 430));
      setTimeout(() => granted && granted.classList.add("show"), 1750);
      setTimeout(finishBoot, 2650);

      const skip = () => finishBoot();
      boot.addEventListener("click", skip);
      window.addEventListener("keydown", skip, { once: true });
      window.addEventListener("wheel", skip, { once: true, passive: true });
    }
  } else {
    finishBoot();
  }

  /* =========================================================
     2. MATRIX / BINARY RAIN (hero canvas)
     ========================================================= */
  const canvas = document.getElementById("matrixRain");
  if (canvas && !REDUCED) {
    const ctx = canvas.getContext("2d");
    const CHARS = "0101001101010010abcdef0123456789";
    const FONT = 15;
    let cols = 0;
    let drops = [];
    let running = false;
    let rafId = 0;
    let last = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
      cols = Math.floor(canvas.width / FONT);
      drops = new Array(cols).fill(0).map(() => Math.random() * -40);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--bg-0").trim() || "#05080d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = (ts) => {
      if (!running) return;
      if (ts - last > 55) {
        last = ts;
        /* trail fade */
        ctx.fillStyle = "rgba(5, 8, 13, 0.09)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = FONT + "px 'JetBrains Mono', monospace";
        for (let i = 0; i < cols; i++) {
          const ch = CHARS[(Math.random() * CHARS.length) | 0];
          const x = i * FONT;
          const y = drops[i] * FONT;
          ctx.fillStyle = Math.random() > 0.965 ? "#00d4ff" : "#00ff9c";
          ctx.fillText(ch, x, y);
          if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    start();
    window.addEventListener("resize", () => { resize(); }, { passive: true });
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    /* pause when hero is scrolled out of view */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => (entries[0].isIntersecting ? start() : stop()),
        { threshold: 0 }
      ).observe(canvas);
    }
  }

  /* =========================================================
     3. TYPING EFFECT (rotating roles, translated)
     ========================================================= */
  const typedEl = document.getElementById("typedRole");
  if (typedEl) {
    if (REDUCED) {
      typedEl.textContent = I18N.t("hero.roles")[0] || "";
    } else {
      let roles = I18N.t("hero.roles") || [];
      let ri = 0, ci = 0, deleting = false, timer = null;

      const tick = () => {
        const word = roles[ri] || "";
        if (!deleting) {
          ci++;
          typedEl.textContent = word.slice(0, ci);
          if (ci >= word.length) {
            deleting = true;
            timer = setTimeout(tick, 1900);
            return;
          }
          timer = setTimeout(tick, 62);
        } else {
          ci--;
          typedEl.textContent = word.slice(0, ci);
          if (ci <= 0) {
            deleting = false;
            ri = (ri + 1) % roles.length;
            timer = setTimeout(tick, 380);
            return;
          }
          timer = setTimeout(tick, 28);
        }
      };

      const restart = () => {
        clearTimeout(timer);
        roles = I18N.t("hero.roles") || [];
        ri = 0; ci = 0; deleting = false;
        typedEl.textContent = "";
        timer = setTimeout(tick, 350);
      };

      restart();
      document.addEventListener("langchange", restart);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) clearTimeout(timer);
        else { clearTimeout(timer); timer = setTimeout(tick, 300); }
      });
    }
  }

  /* =========================================================
     4. CURSOR GLOW (desktop pointers only)
     ========================================================= */
  const glow = document.querySelector(".cursor-glow");
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (glow && finePointer && !REDUCED) {
    let gx = -500, gy = -500, cx = -500, cy = -500, glowRaf = 0;

    window.addEventListener("mousemove", (e) => {
      gx = e.clientX;
      gy = e.clientY;
      if (!glowRaf) glowRaf = requestAnimationFrame(follow);
    }, { passive: true });

    const follow = () => {
      cx += (gx - cx) * 0.14;
      cy += (gy - cy) * 0.14;
      glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(gx - cx) > 0.5 || Math.abs(gy - cy) > 0.5) {
        glowRaf = requestAnimationFrame(follow);
      } else {
        glowRaf = 0;
      }
    };
  } else if (glow) {
    glow.style.display = "none";
  }

  /* =========================================================
     5. 3D TILT (HUD cards, desktop only)
     ========================================================= */
  if (finePointer && !REDUCED) {
    document.querySelectorAll(".tilt").forEach((card) => {
      let raf = 0;
      card.addEventListener("mousemove", (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            `perspective(800px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-2px)`;
          raf = 0;
        });
      });
      card.addEventListener("mouseleave", () => {
        cancelAnimationFrame(raf);
        raf = 0;
        card.style.transform = "";
      });
    });
  }
});
