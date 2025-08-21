import type { Config } from 'tailwindcss'
const config:Config={content:['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],theme:{extend:{colors:{ivory:'#FAFAF8',ink:'#1C1C1C',mute:'#6C757D',accent:{600:'#2A3E64',700:'#213251'}},fontFamily:{serif:['var(--font-eb-garamond)'],sans:['var(--font-source-sans)']},container:{center:true,padding:'1rem'}}},plugins:[]};
export default config
