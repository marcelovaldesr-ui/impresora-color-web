# Genera 3 variantes 9:16 (mismo cuerpo, distinto gancho). python3 gen.py A|B|C
import sys, os
V = sys.argv[1]
P = [("flyers","Flyers","#E91E8F","#fff","50% 30%"),("stickers","Stickers","#47B7E8","#0F1730","50% 50%"),("etiquetas","Etiquetas","#7DBA2F","#0F1730","50% 50%"),("imanes","Imanes","#F5C51B","#111827","50% 50%"),("tarjetas","Tarjetas","#F47A20","#0F1730","50% 50%"),("pendones","Pendones","#2D3E9F","#fff","50% 40%"),("calendarios","Calendarios 2027","#E91E8F","#fff","30% 40%"),("credenciales","Credenciales","#47B7E8","#0F1730","50% 50%")]
HOOK = {
 "A": ("¿Necesitas imprimir<br>para tu negocio?", "En Chillán lo hacemos<br><b>todo en un solo lugar</b>", "#0F1730", None),
 "B": ("Así se ve<br>tu marca impresa", "Flyers, etiquetas, pendones<br><b>y mucho más</b>", "#0F1730", "assets/cal2027-mural.jpg"),
 "C": ("Desde 1991<br>imprimiendo Chillán", "Más de 30 años<br><b>haciendo crecer negocios</b>", "#2D3E9F", None),
}[V]
T0, D = 2.6, 1.0
shots, tw = [], []
for i,(k,name,bg,col,pos) in enumerate(P):
    s = T0 + i*D
    shots.append(f'''<div id="s-{k}" class="clip shot" data-start="{s:.2f}" data-duration="{D}" data-track-index="{i+3}" style="z-index:{i+3}">
  <div id="c-{k}" class="card"><div id="k-{k}" class="kb"><img src="assets/{k}.jpg" style="object-position:{pos}" alt="{name}" /></div></div>
  <div id="n-{k}" class="name" style="color:{col}">{name}</div></div>''')
    tw.append(f'tl.to("#ground",{{backgroundColor:"{bg}",duration:0.3,ease:"power2.inOut"}},{s-0.15:.2f});')
    tw.append(f'tl.fromTo("#c-{k}",{{y:260,opacity:0,scale:0.92}},{{y:0,opacity:1,scale:1,duration:0.38,ease:"expo.out"}},{s+0.02:.2f});')
    tw.append(f'tl.fromTo("#k-{k}",{{scale:1.08}},{{scale:1,duration:{D},ease:"power2.out"}},{s:.2f});')
    tw.append(f'tl.fromTo("#n-{k}",{{opacity:0,y:30}},{{opacity:1,y:0,duration:0.2,ease:"power4.out"}},{s+0.1:.2f});')
    tw.append(f'tl.to(["#c-{k}","#n-{k}"],{{y:-220,opacity:0,duration:0.2,ease:"power3.in"}},{s+D-0.22:.2f});')
h1, h2, hc, himg = HOOK
END = T0 + len(P)*D
hookimg = f'<div id="h-card" class="card hcard"><div class="kb"><img src="{himg}" style="object-position:50% 50%" alt="Calendario 2027" /></div></div>' if himg else ''
html = f'''<!doctype html>
<html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
*{{margin:0;padding:0;box-sizing:border-box}} html,body{{width:1080px;height:1920px;overflow:hidden;background:#FAFBFF}}
#root{{position:absolute;inset:0;overflow:hidden;font-family:Montserrat,sans-serif}}
#ground{{position:absolute;inset:0;background:#FAFBFF;z-index:0}}
#stripe{{position:absolute;left:0;right:0;top:0;height:18px;display:flex;z-index:50}} #stripe span{{flex:1}}
.shot{{position:absolute;inset:0}}
.card{{position:absolute;left:140px;top:400px;width:800px;height:800px;border-radius:40px;overflow:hidden;background:#fff;box-shadow:0 40px 90px rgba(15,23,48,.3);border:12px solid #fff}}
.kb{{position:absolute;inset:0}} .kb img{{width:100%;height:100%;object-fit:cover;display:block}}
.name{{position:absolute;left:0;right:0;top:1240px;text-align:center;font-weight:900;font-size:88px;letter-spacing:-.03em;line-height:1.05}}
#tag{{position:absolute;left:50%;top:300px;transform:translateX(-50%);z-index:60;background:#fff;color:#0F1730;font-weight:800;font-size:34px;padding:16px 30px;border-radius:999px;white-space:nowrap;box-shadow:0 10px 30px rgba(15,23,48,.18)}}
#hook{{position:absolute;inset:0;z-index:40}}
#h1{{position:absolute;left:140px;right:140px;top:420px;text-align:center;font-weight:900;font-size:92px;line-height:1.04;letter-spacing:-.035em;color:{hc}}}
#h2{{position:absolute;left:140px;right:140px;top:1000px;text-align:center;font-weight:700;font-size:52px;line-height:1.18;color:#0F1730}} #h2 b{{color:#E91E8F}}
.hcard{{top:360px;height:640px}}
#end{{position:absolute;inset:0;z-index:45;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px}}
#e-logo{{width:340px;height:340px;border-radius:50%;overflow:hidden}} #e-logo img{{width:100%;height:100%;object-fit:cover}}
#e-cta{{font-weight:900;font-size:76px;color:#111827;text-align:center;line-height:1.05;letter-spacing:-.03em}} #e-cta b{{color:#E91E8F}}
#e-btn{{background:#25D366;color:#fff;font-weight:900;font-size:52px;padding:26px 50px;border-radius:999px}}
#e-info{{font-weight:700;font-size:40px;color:#2D3E9F;text-align:center}}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="15" data-width="1080" data-height="1920">
<div id="ground"></div>
<div id="stripe"><span style="background:#E91E8F"></span><span style="background:#47B7E8"></span><span style="background:#7DBA2F"></span><span style="background:#F5C51B"></span><span style="background:#F47A20"></span><span style="background:#2D3E9F"></span></div>
<div id="hook" class="clip" data-start="0" data-duration="{T0}" data-track-index="1">
  {hookimg}
  <div id="h1" {'style="top:1030px;font-size:76px"' if himg else ''}>{h1}</div>
  <div id="h2" {'style="top:1230px"' if himg else ''}>{h2}</div>
</div>
<div id="body" class="clip" data-start="{T0}" data-duration="{END-T0:.2f}" data-track-index="2" style="position:absolute;inset:0;z-index:30">
  <div id="tag">Impresora Color · Chillán</div>
  {''.join(shots)}
</div>
<div id="end" class="clip" data-start="{END:.2f}" data-duration="{15-END:.2f}" data-track-index="20">
  <div id="e-logo"><img src="assets/logo.jpg" alt="Impresora Color Chillán" /></div>
  <div id="e-cta">Cotiza hoy por<br><b>WhatsApp</b></div>
  <div id="e-btn">+56 9 9844 1157</div>
  <div id="e-info">Arauco 1060, Chillán<br>impresoracolor.cl</div>
</div>
</div>
<script>
const tl = gsap.timeline({{ paused: true }});
{'tl.fromTo("#h-card",{scale:1.15,opacity:0},{scale:1,opacity:1,duration:0.5,ease:"expo.out"},0);' if himg else ''}
tl.fromTo("#h1",{{opacity:0,y:60,scale:.94}},{{opacity:1,y:0,scale:1,duration:0.45,ease:"expo.out"}},{0.25 if himg else 0.05});
tl.fromTo("#h2",{{opacity:0,y:40}},{{opacity:1,y:0,duration:0.35,ease:"power3.out"}},0.9);
tl.to(["#h1","#h2"{',"#h-card"' if himg else ''}],{{opacity:0,y:-80,duration:0.22,ease:"power3.in"}},{T0-0.25:.2f});
tl.fromTo("#tag",{{opacity:0,y:-20}},{{opacity:1,y:0,duration:0.3,ease:"power3.out"}},{T0:.2f});
{chr(10).join(tw)}
tl.to("#ground",{{backgroundColor:"#FAFBFF",duration:0.35,ease:"power2.inOut"}},{END-0.1:.2f});
tl.fromTo("#e-logo",{{scale:.6,opacity:0}},{{scale:1,opacity:1,duration:0.5,ease:"back.out(1.4)"}},{END+0.05:.2f});
tl.fromTo("#e-cta",{{opacity:0,y:30}},{{opacity:1,y:0,duration:0.3,ease:"power4.out"}},{END+0.35:.2f});
tl.fromTo("#e-btn",{{opacity:0,scale:.8}},{{opacity:1,scale:1,duration:0.35,ease:"back.out(1.6)"}},{END+0.55:.2f});
tl.to("#e-btn",{{scale:1.06,duration:0.4,ease:"sine.inOut",yoyo:true,repeat:3}},{END+1.2:.2f});
tl.fromTo("#e-info",{{opacity:0}},{{opacity:1,duration:0.3}},{END+0.8:.2f});
window.__timelines["main"] = tl;
</script></body></html>'''
open('index.html','w').write(html)
