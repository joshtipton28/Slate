#!/usr/bin/env node
import { mkdirSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
const [, , cmd, template='vite', target='slate-app'] = process.argv;
const templates = resolve(new URL('../templates', import.meta.url).pathname);
const help=()=>console.log(`Slate CLI
Usage:
  slate init <template> [target]
Templates:
  ${readdirSync(templates).join(', ')}`);
if(!cmd || /-h|--help/.test(cmd)) { help(); process.exit(0); }
if(cmd==='init'){ const src=resolve(templates,template); if(!existsSync(src)){ console.error('Unknown template:', template); process.exit(1); }
  const dest=resolve(process.cwd(), target); mkdirSync(dest,{recursive:true}); cpSync(src,dest,{recursive:true}); console.log(`✓ Created ${template} at ${target}`); process.exit(0);}
help(); process.exit(1);
