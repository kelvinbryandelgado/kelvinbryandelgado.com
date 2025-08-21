import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
export type Work={slug:string,title:string,type:'story'|'essay'|'review'|'film',date:string,summary?:string,tags?:string[],status?:'published'|'draft',cover?:string,external_url?:string,video_url?:string,body?:string}
const worksDir=path.join(process.cwd(),'content','works')
export async function getAllWorks(opts?:{limit?:number,publishedOnly?:boolean,type?:string}){
  const files=fs.existsSync(worksDir)?fs.readdirSync(worksDir):[]
  const items:Work[]=[]
  for(const file of files){
    if(!file.endsWith('.md')&&!file.endsWith('.mdx')) continue
    const slug=file.replace(/\.(md|mdx)$/,'')
    const raw=fs.readFileSync(path.join(worksDir,file),'utf8')
    const {data,content}=matter(raw)
    const item:Work={slug,title:data.title||slug,type:(data.type||'essay'),date:data.date||'',summary:data.summary||'',tags:data.tags||[],status:data.status||'published',cover:data.cover||'',external_url:data.external_url||'',video_url:data.video_url||'',body:content?marked.parse(content) as string:''}
    if(opts?.publishedOnly&&item.status!=='published') continue
    if(opts?.type&&item.type!==opts.type) continue
    items.push(item)
  }
  items.sort((a,b)=>(a.date<b.date?1:-1))
  return opts?.limit?items.slice(0,opts.limit):items
}
export async function getWork(slug:string){
  const file=path.join(worksDir,slug+'.md'), file2=path.join(worksDir,slug+'.mdx')
  const filename=fs.existsSync(file)?file:fs.existsSync(file2)?file2:null
  if(!filename) return null
  const raw=fs.readFileSync(filename,'utf8')
  const {data,content}=matter(raw)
  const item:Work={slug,title:data.title||slug,type:(data.type||'essay'),date:data.date||'',summary:data.summary||'',tags:data.tags||[],status:data.status||'published',cover:data.cover||'',external_url:data.external_url||'',video_url:data.video_url||'',body:content?marked.parse(content) as string:''}
  return item
}
