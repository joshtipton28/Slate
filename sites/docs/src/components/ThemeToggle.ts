export function initThemeToggle(btn:HTMLElement){
  btn.addEventListener('click',()=>{
    const html = document.documentElement;
    const dark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', dark ? 'light' : 'dark');
  });
}
