import { initTabs } from "../../../../packages/js/src/tabs";
import { initStack } from "../../../../packages/js/src/stack";
import { open as openModal, close as closeModal } from "../../../../packages/js/src/modal";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll<HTMLElement>(".tabs").forEach(initTabs);
  document.querySelectorAll<HTMLElement>(".stack").forEach(initStack);

  // Modal demo
  document.querySelectorAll<HTMLElement>("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-open-modal")!;
      const modal = document.getElementById(id)! as HTMLElement;
      const overlay = document.querySelector<HTMLElement>(".modal-overlay");
      openModal(modal);
      overlay?.setAttribute("open","");
      overlay?.addEventListener("click", () => { closeModal(modal); overlay.removeAttribute("open"); }, { once:true });
    });
  });
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = (btn as HTMLElement).closest<HTMLElement>(".modal")!;
      closeModal(modal);
      document.querySelector<HTMLElement>(".modal-overlay")?.removeAttribute("open");
    });
  });
});
