import { initTabs } from "../../../../packages/js/src/tabs";
import { initStack } from "../../../../packages/js/src/stack";
import { open as openModal, close as closeModal } from "../../../../packages/js/src/modal";
// Auto-init
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll<HTMLElement>(".tabs").forEach(initTabs);
  document.querySelectorAll<HTMLElement>(".stack").forEach(initStack);
  // Modal demo hooks
  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = (btn as HTMLElement).getAttribute("data-open-modal")!;
      const el = document.getElementById(id)!;
      openModal(el);
      const overlay = document.querySelector<HTMLElement>(".modal-overlay");
      overlay?.setAttribute("open","");
      overlay?.addEventListener("click", ()=>{ closeModal(el); overlay.removeAttribute("open"); }, { once:true });
    });
  });
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const el = (btn as HTMLElement).closest<HTMLElement>(".modal")!;
      closeModal(el);
      document.querySelector<HTMLElement>(".modal-overlay")?.removeAttribute("open");
    });
  });
});
