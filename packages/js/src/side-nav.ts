export function initSideNav(drawer:HTMLElement, overlay:HTMLElement){ function show(){ overlay.setAttribute("open",""); drawer.setAttribute("open",""); } function hide(){ overlay.removeAttribute("open"); drawer.removeAttribute("open"); }
  overlay.addEventListener("click", hide);
  drawer.addEventListener("keydown", (e)=>{ if(e.key==="Escape") hide(); });
  return {show, hide};
}
