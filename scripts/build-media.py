from pathlib import Path
from PIL import Image,ImageOps
import json,subprocess,io,zipfile,concurrent.futures
out=Path('public/media');out.mkdir(exist_ok=True);work=Path('research/edits');work.mkdir(exist_ok=True)
def ff(args):subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y']+args,check=True)
subprocess.run(['python3','scripts/refine-montage.py'],check=True)
# A short authored edit for scroll: people at floor level, then the actual mezzanine wide.
for i,(ep,ss,du) in enumerate([(2,607.5,3.2),(1,30.0,3.0)]):
 ff(['-ss',str(ss),'-i',f'BRICKS GFX ASSETS/VIDEOS/BRICKED UP EP {ep}.mp4','-vf','scale=1440:810,fps=30,setsar=1','-frames:v',str(round(du*30)),'-an','-c:v','libx264','-preset','fast','-crf','22','-g','1','-pix_fmt','yuv420p',str(work/f'scrub-{i}.mp4')])
(work/'scrub.txt').write_text("file 'scrub-0.mp4'\nfile 'scrub-1.mp4'");ff(['-f','concat','-safe','0','-i',str(work/'scrub.txt'),'-c','copy','-movflags','+faststart',str(out/'warehouse-journey.mp4')]);ff(['-ss','5','-i',str(out/'warehouse-journey.mp4'),'-frames:v','1','-q:v','2',str(out/'warehouse-wide.jpg')]);print('SCROLL FILM',flush=True)
for name,ss,du in [('culture',0,22),('cars',23,18),('studio',16,9)]:
 ff(['-ss',str(ss),'-i','BRICKS GFX ASSETS/VIDEOS/HEADERVIDEO.mp4','-t',str(du),'-vf','scale=1280:720,fps=24','-an','-c:v','libx264','-preset','fast','-crf','23','-movflags','+faststart',str(out/f'{name}.mp4')]);ff(['-ss','1','-i',str(out/f'{name}.mp4'),'-frames:v','1','-q:v','2',str(out/f'{name}-poster.jpg')])
ff(['-i','BRICKS GFX ASSETS/VIDEOS/WELCOMETOBRICKS.mp4','-vf','scale=1280:720','-c:v','libx264','-preset','fast','-crf','21','-c:a','aac','-b:a','128k','-movflags','+faststart',str(out/'welcome.mp4')]);ff(['-ss','5','-i',str(out/'welcome.mp4'),'-frames:v','1','-q:v','2',str(out/'welcome-poster.jpg')]);print('WELCOME FILM',flush=True)
# Identity in a filename/title is used for labeling; no identity is inferred by matching faces.
for name,ep,ss in [('founder-scene',1,1720),('basketball',1,829.6),('creators',2,1024),('editors',1,603),('art-wall',2,1409),('wall',1,854),('lounge',2,291)]:
 ff(['-ss',str(ss),'-i',f'BRICKS GFX ASSETS/VIDEOS/BRICKED UP EP {ep}.mp4','-frames:v','1','-q:v','2',str(out/f'{name}.jpg')])
rows=json.load(open('research/photos.json'))
selection={0:'house-dog',1:'warehouse',4:'talk',6:'work',7:'collaborate',8:'table',9:'manifesto',14:'art-car',15:'dog-lounge',18:'dj',30:'night',39:'court',43:'balcony',56:'bts',61:'casino',82:'rambo',84:'supercar',104:'crowd',107:'party',114:'casino-table',116:'event-wide'}
for idx,name in selection.items():
 r=rows[idx];im=Image.open(io.BytesIO(zipfile.ZipFile(r['source']).read(r['entry']))) if r['entry'] else Image.open(r['source']);im=ImageOps.exif_transpose(im).convert('RGB');im.thumbnail((1800,1500));im.save(out/f'{name}.webp',quality=86,method=6)
for p in Path('research/official').glob('*'):
 try:
  im=Image.open(p);im.thumbnail((1300,1500));im.save(out/f'{p.stem}.webp',quality=88,method=6)
 except:pass
print('ALL MEDIA READY',flush=True)
