const once = new Set<string>();
const warn = (m:string)=>{ if(!once.has(m)){ once.add(m); console.warn(`[Slate shims] ${m}`);} };
export function scanAndWarn(root: ParentNode = document){
  ([
    ['.top-bar','SwitchNav'], ['.reveal','Modal'], ['.accordion','Stack'], ['.button','Button'], ['.callout,.alert-box','Notice']
  ] as [string,string][]).forEach(([sel,name])=>{
    if ((root as Document).querySelector(sel)) warn(`Legacy selector "${sel}" detected; prefer ${name}.`);
  });
}
if (typeof window !== 'undefined') window.addEventListener('DOMContentLoaded',()=>scanAndWarn());
