import subprocess,pathlib
from PIL import Image,ImageDraw
sets={1:[(22,38),(44,79),(260,290),(322,355),(599,615),(826,842),(1100,1116),(1218,1237),(1320,1340),(1485,1510),(1700,1720),(1790,1815)],2:[(57,76),(179,199),(243,260),(280,301),(320,340),(419,438),(527,549),(601,620),(982,1012),(1020,1040),(1222,1243),(1698,1728)],3:[(0,65)]}
for ep,ranges in sets.items():
 out=pathlib.Path('research')/f'candidates-{ep}';out.mkdir(exist_ok=True)
 source=pathlib.Path('BRICKS GFX ASSETS/VIDEOS')/(f'BRICKED UP EP {ep}.mp4' if ep<3 else 'HEADERVIDEO.mp4')
 sheet=Image.new('RGB',(1200,len(ranges)*160 if ep<3 else 5*160),'#151515');d=ImageDraw.Draw(sheet)
 times=[(a+(b-a)*j/5) for a,b in ranges for j in range(5)] if ep<3 else list(range(0,65,3))
 for n,t in enumerate(times):
  p=out/f'{t:.1f}.jpg';subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',str(source),'-frames:v','1','-vf','scale=240:-1','-q:v','3',str(p)],check=True)
  im=Image.open(p);x=n%5*240;y=n//5*160;sheet.paste(im,(x,y));d.text((x+4,y+136),f'{t:.1f}s',fill='white')
 sheet.save(f'research/candidates-{ep}.jpg',quality=90)
 print('CANDIDATES',ep,flush=True)
