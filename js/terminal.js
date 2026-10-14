/* ============================================================
   terminal.js — interactive mini terminal widget
   Commands: help · whoami · skills · contact · clear
   Easter egg: sudo hire-me
   Answers are translated via I18N.t()
   ============================================================ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const out = document.getElementById("termOutput");
  const form = document.getElementById("termForm");
  const input = document.getElementById("termInput");
  if (!out || !form || !input) return;

  const scroll = () => { out.scrollTop = out.scrollHeight; };

  const print = (text, cls = "out") => {
    String(text).split("\n").forEach((line) => {
      const div = document.createElement("div");
      div.className = "term-line " + cls;
      div.textContent = line;
      out.appendChild(div);
    });
    scroll();
  };

  const welcome = () => {
    print(I18N.t("term.welcome"), "ok");
    print(I18N.t("term.hintline"), "info");
  };

  /* re-render welcome on language change */
  document.addEventListener("langchange", () => {
    print("— locale: " + I18N.getLang().toUpperCase() + " —", "info");
    print(I18N.t("term.hintline"), "info");
  });

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;

    print("visitor@soc:~$ " + cmd, "cmd");

    const key = cmd.toLowerCase();

    if (key === "clear") {
      out.innerHTML = "";
      return;
    }
    if (key === "help") {
      print(I18N.t("term.a.help"), "out");
      return;
    }
    if (key === "whoami") {
      print(I18N.t("term.a.whoami"), "out");
      return;
    }
    if (key === "skills") {
      print(I18N.t("term.a.skills"), "out");
      return;
    }
    if (key === "contact") {
      print(I18N.t("term.a.contact"), "out");
      return;
    }
    if (key === "sudo hire-me" || key === "sudo hire me") {
      print(I18N.t("term.a.sudo"), "ok");
      return;
    }
    /* unknown command */
    print(I18N.t("term.a.notfound").replace("{cmd}", cmd), "err");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    run(input.value);
    input.value = "";
    scroll();
  });

  welcome();
  scroll();
});
