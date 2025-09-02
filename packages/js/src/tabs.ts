import { createRover } from "./focus";
export function initTabs(root:HTMLElement){ const list = root.querySelector<HTMLElement>(".tabs__list"); const tabs = root.querySelectorAll<HTMLElement>(".tabs__tab"); const panels = root.querySelectorAll<HTMLElement>(".tabs__panel");
  if(list) createRover(list, ".tabs__tab");
  tabs.forEach((t,i)=> t.addEventListener("click", ()=>{ tabs.forEach((tt,j)=>{ tt.setAttribute("aria-selected", String(i===j)); panels[j]?.toggleAttribute("hidden", i!==j); }); }));
}
