import json,urllib.request,pathlib,concurrent.futures,re
from PIL import Image,ImageDraw
s=json.load(open('research/site.json'));jobs=[]
for i,name in [(0,'logo'),(1,'secondary'),(6,'pattern')]: jobs.append((s['about-us']['images'][i]['src'].split('/v1/')[0],pathlib.Path(f'public/brand/{name}.png')))
for slug in ('about-us','businessclub','carclub','bricks-art'):
 for i,im in enumerate(s[slug]['images']):
  if i<7 or im['alt'] in ('Instagram','Facebook','Youtube','TikTok','pattern.png'):continue
  url=im['src'].split('/v1/')[0];ext=url.rsplit('.',1)[-1];jobs.append((url,pathlib.Path(f'research/official/{slug}-{i}.{ext}')))
h=pathlib.Path('research/home.html').read_text()
fonts=list(dict.fromkeys(re.findall(r'https://static.wixstatic.com/ufonts/[^"\)]+woff2',h)))
for i,u in enumerate(fonts):jobs.append((u,pathlib.Path(f'public/brand/type-{i}.woff2')))
def dl(j):
 u,p=j;p.parent.mkdir(parents=True,exist_ok=True)
 try:p.write_bytes(urllib.request.urlopen(u,timeout=30).read())
 except Exception as e:print('FAILED',p,str(e))
list(concurrent.futures.ThreadPoolExecutor(6).map(dl,jobs))
for pat in ('about-us-*','businessclub-*'):
 files=sorted(pathlib.Path('research/official').glob(pat),key=lambda p:int(p.stem.rsplit('-',1)[-1]));sheet=Image.new('RGB',(1250,((len(files)+4)//5)*240),'#222222');d=ImageDraw.Draw(sheet)
 for j,p in enumerate(files):
  try:
   im=Image.open(p).convert('RGB');im.thumbnail((240,205));x=j%5*250;y=j//5*240;sheet.paste(im,(x,y));d.text((x,y+211),p.name,fill='white')
  except:pass
 sheet.save('research/official-'+pat.replace('-*','')+'.jpg')
print('DOWNLOADED',len(jobs),'FONTS',len(fonts))
