from html.parser import HTMLParser
from pathlib import Path
import urllib.request,json,concurrent.futures,re
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.images=[];self.text=[];self.skip=0;self.scripts=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t in ('script','style'):self.skip+=1
  if t=='script' and 'src' in d:self.scripts.append(d['src'])
  if t=='a' and 'href' in d:self.links.append(d['href'])
  if t=='img':self.images.append({k:d.get(k) for k in ('src','alt','width','height')})
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if not self.skip and d.strip():self.text.append(d.strip())
urls=['socialclub','copy-of-founder-page','book-online','event-details/bricks-kickoff','booking-services-sitemap.xml']
p=Parser();p.feed(Path('research/home.html').read_text());urls += [x.replace('https://www.bricksslc.com/','') for x in p.links if any(t in x for t in ('privacy','terms'))]
def get(u):
 try:
  b=urllib.request.urlopen('https://www.bricksslc.com/'+u,timeout=30).read().decode();Path('research/'+(u or 'home').replace('/','_')+'.html').write_text(b);p=Parser();p.feed(b);return (u,dict(text=p.text,images=p.images,links=sorted(set(p.links))))
 except Exception as e:return (u,{'error':str(e)})
r=json.load(open('research/site.json'));r.update(dict(concurrent.futures.ThreadPoolExecutor(6).map(get,dict.fromkeys(urls))));Path('research/site.json').write_text(json.dumps(r,indent=2))
print('Additional pages saved')
