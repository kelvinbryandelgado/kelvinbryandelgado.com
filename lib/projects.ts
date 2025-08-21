import fs from 'node:fs'
import path from 'node:path'
export type Project={title:string,stage:string,percent:number,eta:string,description?:string,links?:{label:string,url:string}[],poster?:string,video_url?:string}
const file=path.join(process.cwd(),'content','projects.json')
export async function getProjects(){ if(!fs.existsSync(file)) return []; const raw=fs.readFileSync(file,'utf8'); try{const arr=JSON.parse(raw) as Project[]; return Array.isArray(arr)?arr:[]}catch{return []} }
