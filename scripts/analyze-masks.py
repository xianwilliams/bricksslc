"""Measure imagegen cutout registration; originals remain untouched.
Export transforms for SVG masks, and optimize generated masks to lossless WebP.
No generated RGB pixels are used in the rendered subject photographs.
"""
import cv2, json, numpy as np
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
entries=json.loads((root/'research/masks-generated.json').read_text())
layers=root/'public/media/layers';layers.mkdir(exist_ok=True)
manifestPath=root/'lib/photo-layers.json'
manifest=json.loads(manifestPath.read_text()) if manifestPath.exists() else {}
sift=cv2.SIFT_create(nfeatures=7000,contrastThreshold=.018)
for name,path in entries.items():
 if name in manifest and (layers/f'{name}.webp').exists():continue
 original=root/'public/media'/f'{name}.webp'
 if not original.exists():original=root/'public/media'/f'{name}.jpg'
 a=cv2.imread(str(original));b=cv2.imread(path)
 if a is None or b is None:raise ValueError(name)
 ia=Image.open(original);ib=Image.open(path).convert('RGBA')
 ka,da=sift.detectAndCompute(cv2.cvtColor(a,cv2.COLOR_BGR2GRAY),None)
 kb,db=sift.detectAndCompute(cv2.cvtColor(b,cv2.COLOR_BGR2GRAY),None)
 matched=cv2.BFMatcher().knnMatch(db,da,k=2)
 good=[m for m,n in matched if m.distance < .72*n.distance]
 mat=None;inliers=0
 if len(good)>5:
  pointsB=np.float32([kb[m.queryIdx].pt for m in good]);pointsA=np.float32([ka[m.trainIdx].pt for m in good]);mat,ins=cv2.estimateAffinePartial2D(pointsB,pointsA,method=cv2.RANSAC,ransacReprojThreshold=5)
  inliers=int(ins.sum()) if ins is not None else 0
 if mat is None or inliers<5:
  mat=np.float64([[ia.width/ib.width,0,0],[0,ia.height/ib.height,0]])
 # Lossless format optimization only. Geometry and alpha are applied in browser SVG.
 ib.save(layers/f'{name}.webp','WEBP',lossless=True,method=6)
 manifest[name]={'width':ia.width,'height':ia.height,'maskWidth':ib.width,'maskHeight':ib.height,'transform':[round(float(x),6) for x in [mat[0,0],mat[1,0],mat[0,1],mat[1,1],mat[0,2],mat[1,2]]],'inliers':inliers,'matches':len(good)}
 print(name,inliers,'/',len(good),manifest[name]['transform'],flush=True)
(root/'lib/photo-layers.json').write_text(json.dumps(manifest,indent=2))
