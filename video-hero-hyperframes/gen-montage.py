# Genera compositions/montage.html (14 productos x 1,0 s) con el estilo original. python3 gen-montage.py
import re
orig=open('/tmp/montage-orig.html').read() if __import__('os').path.exists('/tmp/montage-orig.html') else open('compositions/montage.html').read()
style=re.search(r'<style>.*?</style>',orig,re.S).group(0)
P=[("flyers","Flyers","#E91E8F","#fff","50% 30%"),("afiches","Afiches en tela PVC","#F47A20","#fff","50% 40%"),("stickers","Stickers","#47B7E8","#0F1730","50% 50%"),
   ("etiquetas","Etiquetas","#7DBA2F","#0F1730","50% 50%"),("tarjetas","Tarjetas","#F5C51B","#0F1730","50% 50%"),("pendones","Pendones","#2D3E9F","#fff","50% 40%"),
   ("calendarios","Calendarios 2027","#E91E8F","#fff","30% 40%"),("credenciales","Credenciales","#47B7E8","#0F1730","60% 50%"),("lanyards","Lanyards","#7DBA2F","#0F1730","50% 50%"),
   ("talonarios","Talonarios","#F5C51B","#0F1730","50% 50%"),("menus","Menús","#F47A20","#fff","50% 50%"),("sublimacion","Poleras y bolsas","#2D3E9F","#fff","60% 50%"),
   ("senaletica","Señalética","#E91E8F","#fff","60% 50%"),("imanes","Imanes","#47B7E8","#0F1730","50% 50%")]
D=1.0; shots=[]; tw=[]
for i,(k,n,bg,col,pos) in enumerate(P):
    s=i*D
    shots.append(f'''    <div id="s-{k}" class="clip shot" data-start="{s:.1f}" data-duration="{D}" data-track-index="{i+1}" style="z-index:{i+2}">
      <div id="n-{k}" class="name" style="color:{col}"><span class="big">{n}</span></div>
      <div id="c-{k}" class="card"><div id="k-{k}" class="kb"><img id="i-{k}" src="assets/{k}.jpg" style="object-position:{pos}" alt="{n}" /></div></div>
    </div>''')
    tw.append(f'  tl.to("#m-ground",{{backgroundColor:"{bg}",duration:0.3,ease:"power2.inOut"}},{max(0,s-0.2):.2f});')
    if i==0:
        tw.append(f'  tl.set("#c-{k}",{{x:0,opacity:1}},0); tl.set("#n-{k}",{{opacity:1}},0);')
    else:
        tw.append(f'  tl.fromTo("#c-{k}",{{x:340,opacity:0,filter:"blur(14px)"}},{{x:0,opacity:1,filter:"blur(0px)",duration:0.36,ease:"expo.out"}},{s+0.02:.2f});')
        tw.append(f'  tl.fromTo("#n-{k}",{{opacity:0,filter:"blur(8px)"}},{{opacity:1,filter:"blur(0px)",duration:0.16,ease:"power4.out"}},{s+0.08:.2f});')
    tw.append(f'  tl.fromTo("#k-{k}",{{scale:1.07}},{{scale:1.0,duration:{D},ease:"power2.out"}},{s:.2f});')
    tw.append(f'  tl.to("#c-{k}",{{x:-300,opacity:0,filter:"blur(12px)",duration:0.2,ease:"power3.in"}},{s+D-0.22:.2f});')
    tw.append(f'  tl.to("#n-{k}",{{opacity:0,filter:"blur(6px)",duration:0.12,ease:"power3.in"}},{s+D-0.17:.2f});')
head=orig[:orig.index('<div id="s-')] if '<div id="s-' in orig else ''
pre=re.search(r'<template>.*?<div id="root"[^>]*>.*?(?=\s*<div id="s-)',orig,re.S).group(0)
html=pre+'\n'+'\n'.join(shots)+'\n  </div>\n  <script>\n  const tl = gsap.timeline({ paused: true });\n'+'\n'.join(tw)+'\n  window.__timelines["montage"] = tl;\n  </script>\n</template>\n'
open('compositions/montage.html','w').write(html)
TOTAL=len(P)*D
idx=open('index.html').read()
idx=re.sub(r'(id="montage"[^>]*data-duration=")[0-9.]+"',lambda m:m.group(1)+f'{TOTAL}"',idx)
idx=re.sub(r'(id="endcard"[^>]*data-start=")[0-9.]+"',lambda m:m.group(1)+f'{TOTAL}"',idx)
idx=re.sub(r'(id="root"[^>]*data-duration=")[0-9.]+"',lambda m:m.group(1)+f'{TOTAL+3.2:.1f}"',idx)
open('index.html','w').write(idx)
print('ok',TOTAL)
