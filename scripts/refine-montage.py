from pathlib import Path
import subprocess,json,concurrent.futures
out=Path('public/media');work=Path('research/montage-final');work.mkdir(exist_ok=True)
shots=[(1,30,2,'warehouse-wide'),(2,187,1.8,'creating-phone-film'),(1,1228.1,1.8,'race-car-detail'),(1,829.8,2,'basketball-pass'),(2,1385,2.2,'celebration'),(2,288,1.8,'through-the-house'),(1,602,1.8,'edit-suite'),(2,429,1.6,'drawing'),(2,608.8,1.8,'table-laughter'),(1,342,1,'warehouse-light'),(2,713,1.4,'handshake'),(1,1327,2,'shooting-hoops'),(1,271,1.4,'studio-walk'),(2,875,1.6,'birthday-in-the-house'),(1,1952,1.8,'warehouse-dog'),(2,332,2.4,'house-culture'),(1,30.4,1.6,'wide-return')]
assert round(sum(s[2] for s in shots),2)==30
# Exact frame counts avoid a 23.976-to-30fps rounding loss at each edit point.
def ff(args):subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y']+args,check=True)
def cut(x):
 i,(ep,start,dur,label)=x;path=work/f'{i:02}.mp4';ff(['-ss',str(start),'-i',f'BRICKS GFX ASSETS/VIDEOS/BRICKED UP EP {ep}.mp4','-vf','scale=1600:900,fps=30,setsar=1,setpts=PTS-STARTPTS','-frames:v',str(round(dur*30)),'-an','-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p',str(path)]);return path
files=list(concurrent.futures.ThreadPoolExecutor(3).map(cut,enumerate(shots)));(work/'concat.txt').write_text('\n'.join(f"file '{p.name}'" for p in files));ff(['-f','concat','-safe','0','-i',str(work/'concat.txt'),'-c','copy','-movflags','+faststart',str(out/'bricks-montage.mp4')]);ff(['-i',str(out/'bricks-montage.mp4'),'-vf','scale=854:480','-an','-c:v','libx264','-preset','fast','-crf','25','-movflags','+faststart',str(out/'bricks-montage-mobile.mp4')]);ff(['-ss','0.7','-i',str(out/'bricks-montage.mp4'),'-frames:v','1','-q:v','2',str(out/'hero-poster.jpg')])
current=0;edl=[]
for ep,ss,du,label in shots:edl.append(dict(episode=ep,sourceIn=ss,duration=du,timelineIn=round(current,2),label=label));current+=du
for p in ['research/montage-edl.json','scrollcraft/builds/bricks/montage-edl.json']:Path(p).write_text(json.dumps(edl,indent=2))
print(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size','-show_entries','stream=nb_frames','-of','json',str(out/'bricks-montage.mp4')]).decode())
ff(['-i',str(out/'bricks-montage.mp4'),'-vf','fps=2,scale=320:-1,tile=5x12:padding=3:margin=3','-frames:v','1','research/montage-final-review.jpg'])
