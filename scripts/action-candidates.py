from pathlib import Path
from PIL import Image,ImageDraw
import subprocess,io,concurrent.futures
ranges=[(1,28,42),(1,60,78),(1,602,616),(1,826,840),(1,1225,1240),(1,1326,1338),(1,1699,1707),(1,1944,1956),(2,184,196),(2,283,297),(2,426,436),(2,605,620),(2,708,722),(2,862,878),(2,1004,1017),(2,1370,1400)]
for j,(ep,start,end) in enumerate(ranges):
 times=list(range(start,end,2));w=320;h=202;sheet=Image.new('RGB',(w*4,h*((len(times)+3)//4)),(15,15,15));d=ImageDraw.Draw(sheet)
 def get(t):
  b=subprocess.check_output(['ffmpeg','-hide_banner','-loglevel','error','-ss',str(t),'-i',f'BRICKS GFX ASSETS/VIDEOS/BRICKED UP EP {ep}.mp4','-vf','scale=320:180','-frames:v','1','-f','image2pipe','-vcodec','mjpeg','pipe:1']);return t,Image.open(io.BytesIO(b)).copy()
 for i,(t,img) in enumerate(concurrent.futures.ThreadPoolExecutor(4).map(get,times)):
  x=i%4*w;y=i//4*h;sheet.paste(img,(x,y));d.text((x+5,y+182),f'EP{ep} {t}s',fill='white')
 sheet.save(f'research/action-{j}.jpg');print(j,ep,start,end,flush=True)
