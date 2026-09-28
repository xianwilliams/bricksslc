import { chromium } from 'playwright-core';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:960}});
await context.addInitScript(()=>{Element.prototype.requestPointerLock=()=>{};Element.prototype.setPointerCapture=()=>{};Object.defineProperty(navigator,'clipboard',{value:{writeText:async (text)=>{window.capturedPrompt=text;}}});});
const p=await context.newPage();
for(const [name,url] of [['motionsites','https://motionsites.ai/'],['klausen','https://klausen.com/'],['phive','https://phive.pt/en']]){
 try{
  await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(4500);await p.screenshot({path:`research/${name}-desktop.png`});
  if(name==='motionsites'){
   const results=[];const buttons=p.getByRole('button',{name:'Copy prompt',exact:true});const count=await buttons.count();console.log('FREE PROMPTS',count);
   for(let i=0;i<Math.min(5,count);i++){
    await buttons.nth(i).click();await p.waitForTimeout(500);const text=await p.evaluate(()=>window.capturedPrompt);results.push({index:i,text});
   }
   await writeFile('research/free-motion-prompts.json',JSON.stringify(results,null,2));console.log(results.map(x=>({index:x.index,text:x.text?.slice(0,280)})));
  }else{
   await p.evaluate(()=>window.scrollTo(0,window.innerHeight*3));await p.waitForTimeout(1500);await p.screenshot({path:`research/${name}-middle.png`});
  }
 }catch(e){console.log(name,e.message)}
}
await browser.close();
