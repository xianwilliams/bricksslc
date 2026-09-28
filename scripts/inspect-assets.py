import zipfile,pathlib,json,io,subprocess,math
from PIL import Image,ImageOps,ImageDraw
root=pathlib.Path('BRICKS GFX ASSETS'); out=pathlib.Path('research');(out/'thumbs').mkdir(parents=True,exist_ok=True)
items=[]
for p in sorted((root/'PHOTO'/'RANDOM LIFESTYLE').glob('*.jpg')): items.append((str(p),None,p.name))
for z in sorted((root/'PHOTO').glob('*.zip')):
 with zipfile.ZipFile(z) as f:
  for n in sorted(f.namelist()):
   if n.lower().endswith(('.jpg','.jpeg','.png')) and not n.startswith('__MACOSX'): items.append((str(z),n,pathlib.Path(n).name))
rows=[]
for i,(p,n,name) in enumerate(items):
 try:
  im=Image.open(io.BytesIO(zipfile.ZipFile(p).read(n))) if n else Image.open(p)
  im=ImageOps.exif_transpose(im).convert('RGB');w,h=im.size
  im.thumbnail((640,440));im.save(out/'thumbs'/f'{i:03}.jpg',quality=86)
  rows.append(dict(id=i,source=p,entry=n,name=name,width=w,height=h))
 except Exception as e:print(name,type(e).__name__)
(out/'photos.json').write_text(json.dumps(rows,indent=2))
for k in range(math.ceil(len(rows)/30)):
 batch=rows[k*30:(k+1)*30];sheet=Image.new('RGB',(1500,6*190),(18,18,18));d=ImageDraw.Draw(sheet)
 for j,r in enumerate(batch):
  im=Image.open(out/'thumbs'/f"{r['id']:03}.jpg");im.thumbnail((290,155));x=(j%5)*300;y=(j//5)*190;sheet.paste(im,(x,y));d.text((x+3,y+157),f"{r['id']:03} {r['name'][:38]}",fill='white')
 sheet.save(out/f'photos-{k}.jpg',quality=92)
print('PHOTO COUNT',len(rows),flush=True)
for ep in (1,2):
 p=root/'VIDEOS'/f'BRICKED UP EP {ep}.mp4';dd=out/f'ep{ep}';dd.mkdir(exist_ok=True)
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(p),'-vf','fps=1/20,scale=320:-1','-q:v','3',str(dd/'%03d.jpg')],check=True)
 frames=sorted(dd.glob('*.jpg'))
 for k in range(math.ceil(len(frames)/30)):
  sheet=Image.new('RGB',(1600,6*206),(18,18,18));d=ImageDraw.Draw(sheet)
  for j,p in enumerate(frames[k*30:(k+1)*30]):
   im=Image.open(p);x=j%5*320;y=j//5*206;sheet.paste(im,(x,y));t=(int(p.stem)-1)*20+10;d.text((x+5,y+183),f'EP {ep}  {t//60:02}:{t%60:02}  ({t}s)',fill='white')
  sheet.save(out/f'episode-{ep}-{k}.jpg',quality=88)
 print('EP',ep,'FRAMES',len(frames),flush=True)
