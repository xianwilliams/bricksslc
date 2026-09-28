"""Web delivery excerpts from supplied BRICKED UP episodes; silent all-intra H.264."""
import subprocess,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
shots=[('court-motion',1,1327,4),('create-motion',2,429.5,3.5),('celebrate-motion',2,1385,4),('car-motion',1,1228.1,1.95)]
for name,ep,start,duration in shots:
 source=root/'BRICKS GFX ASSETS/VIDEOS'/f'BRICKED UP EP {ep}.mp4'
 out=root/'public/media'/f'{name}.mp4'
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-ss',str(start),'-i',str(source),'-t',str(duration),'-an','-vf','scale=1280:-2,fps=24','-c:v','libx264','-preset','fast','-crf','24','-g','1','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],check=True)
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(out),'-frames:v','1','-q:v','2',str(root/'public/media'/f'{name}-poster.jpg')],check=True)
(root/'scrollcraft/builds/bricks/scroll-films-edl.json').write_text(json.dumps([dict(name=n,episode=e,start=s,duration=d) for n,e,s,d in shots],indent=2))
