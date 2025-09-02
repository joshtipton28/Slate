export type Placement = "top"|"bottom"|"left"|"right";
export function position(anchor:DOMRect, target:DOMRect, o:{placement:Placement, offset?:number}){
  const off = o.offset ?? 8; let x=0,y=0,p=o.placement;
  const vw = window.innerWidth, vh = window.innerHeight;
  const fitsTop = target.height+off < anchor.top;
  const fitsBottom = anchor.bottom + target.height + off < vh;
  const fitsLeft = target.width + off < anchor.left;
  const fitsRight = anchor.right + target.width + off < vw;
  if(p==="top" && !fitsTop) p = fitsBottom ? "bottom" : p;
  if(p==="bottom" && !fitsBottom) p = fitsTop ? "top" : p;
  if(p==="left" && !fitsLeft) p = fitsRight ? "right" : p;
  if(p==="right" && !fitsRight) p = fitsLeft ? "left" : p;
  if(p==="top"){ x = anchor.left + (anchor.width-target.width)/2; y = anchor.top - target.height - off; }
  if(p==="bottom"){ x = anchor.left + (anchor.width-target.width)/2; y = anchor.bottom + off; }
  if(p==="left"){ x = anchor.left - target.width - off; y = anchor.top + (anchor.height-target.height)/2; }
  if(p==="right"){ x = anchor.right + off; y = anchor.top + (anchor.height-target.height)/2; }
  return {x: Math.max(8, Math.min(vw-target.width-8, x)), y: Math.max(8, Math.min(vh-target.height-8, y)), placement:p};
}
