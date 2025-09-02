function setInert(except: Element){ document.querySelectorAll<HTMLElement>("body > *").forEach(n=>{ if(n!==except && n instanceof HTMLElement) n.inert = true; }); }
function clearInert(){ document.querySelectorAll<HTMLElement>("body > *").forEach(n=>{ if(n instanceof HTMLElement) n.inert = false; }); }
export function open(el:HTMLElement){ el.setAttribute("open",""); setInert(el); const focusable = el.querySelector<HTMLElement>("[autofocus],button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"); (focusable||el).focus(); el.dispatchEvent(new CustomEvent("slate:open",{bubbles:true})); }
export function close(el:HTMLElement){ el.removeAttribute("open"); clearInert(); el.dispatchEvent(new CustomEvent("slate:close",{bubbles:true})); }
