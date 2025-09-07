import { initTabs } from "../../../../packages/js/src/tabs";
import { initStack } from "../../../../packages/js/src/stack";
import { open as openModal, close as closeModal } from "../../../../packages/js/src/modal";
import { initThemeToggle } from "../components/ThemeToggle.ts";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll<HTMLElement>(".tabs").forEach(initTabs);
  document.querySelectorAll<HTMLElement>(".stack").forEach(initStack);

  document.querySelectorAll<HTMLElement>("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-open-modal")!;
      const el = document.getElementById(id)! as HTMLElement;
      const overlay = document.querySelector<HTMLElement>(".modal-overlay");
      openModal(el);
      overlay?.setAttribute("open", "");
      overlay?.addEventListener("click", () => { closeModal(el); overlay.removeAttribute("open"); }, { once: true });
    });
  });
  document.querySelectorAll<HTMLElement>("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const el = (btn as HTMLElement).closest<HTMLElement>(".modal")!;
      closeModal(el);
      document.querySelector<HTMLElement>(".modal-overlay")?.removeAttribute("open");
    });
  });

  const btn = document.querySelector<HTMLButtonElement>('#theme-toggle');
  if (btn) initThemeToggle(btn);
});
