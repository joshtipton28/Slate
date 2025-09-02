export function createRover(listEl: HTMLElement, itemSelector: string) {
  const items = () => Array.from(listEl.querySelectorAll<HTMLElement>(itemSelector));
  listEl.addEventListener("keydown", (e) => {
    const arr = items(); if(!arr.length) return;
    const i = arr.findIndex(el => el.getAttribute("tabindex")==="0");
    const next = (d:number) => (i<0?0:(i+d+arr.length)%arr.length);
    if(e.key==="ArrowRight"||e.key==="ArrowDown"){ e.preventDefault(); arr.forEach(el=>el.tabIndex=-1); arr[next(1)].tabIndex=0; arr[next(1)].focus(); }
    if(e.key==="ArrowLeft"||e.key==="ArrowUp"){ e.preventDefault(); arr.forEach(el=>el.tabIndex=-1); arr[next(-1)].tabIndex=0; arr[next(-1)].focus(); }
  });
}
