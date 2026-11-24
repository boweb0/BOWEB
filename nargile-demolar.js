/* ============================================================
   IRAKLI WEB  |  10 nargile / shisha site demosu
   app.js bu dosyayı window.NARGILE_DEMOS olarak okur ve taslaklara ekler.
   Her demo kendi içinde tam bir sayfadır; {{SITE_ADI}}, {{LOGO}}, {{TELEFON}},
   {{ADRES}}, {{WHATSAPP}} yer tutucuları panelden gelen bilgiyle dolar.
   ============================================================ */
(function(){
'use strict';

/* ---------- nargile çizimi (özgün, tek renk çifti ile boyanır) ---------- */
const hk=(a,b)=>`<svg class="hk" viewBox="0 -50 140 330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<g class="sm" fill="none" stroke="${b}" stroke-width="3" stroke-linecap="round" opacity=".5"><path d="M56 4C46-8 70-14 58-26C50-34 64-40 56-48"/><path d="M66 6C76-4 56-12 68-24" opacity=".7"/></g>
<path d="M42 10h36l-7 30H49z" fill="${a}"/><rect x="37" y="5" width="46" height="7" rx="3.5" fill="${b}"/>
<circle cx="53" cy="22" r="2" fill="#000" opacity=".3"/><circle cx="62" cy="28" r="2" fill="#000" opacity=".3"/><circle cx="70" cy="21" r="2" fill="#000" opacity=".3"/>
<ellipse cx="60" cy="42" rx="36" ry="6" fill="${b}"/>
<rect x="55" y="44" width="10" height="108" fill="${a}"/>
<ellipse cx="60" cy="70" rx="9" ry="3" fill="${b}"/><ellipse cx="60" cy="100" rx="14" ry="4.5" fill="${b}"/><ellipse cx="60" cy="130" rx="9" ry="3" fill="${b}"/>
<path d="M60 150C14 162 10 238 34 256H86C110 238 106 162 60 150Z" fill="${a}"/>
<path d="M24 214C50 222 70 208 98 216L96 232C80 250 40 250 22 232Z" fill="${b}" opacity=".25"/>
<path d="M38 176C29 200 31 228 41 246" stroke="${b}" stroke-width="3" fill="none" opacity=".35" stroke-linecap="round"/>
<rect x="30" y="254" width="60" height="9" rx="4.5" fill="${b}"/>
<path d="M65 118C120 116 122 190 105 214" stroke="${b}" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M65 118C120 116 122 190 105 214" stroke="${a}" stroke-width="6" fill="none" stroke-dasharray="2 6" opacity=".6"/>
<rect x="98" y="208" width="14" height="26" rx="5" fill="${b}" transform="rotate(14 105 221)"/>
</svg>`;

/* ---------- aroma ve menü kataloğu ---------- */
const F={
  elma:['Çift Elma','Anason notalı, vazgeçilmez klasik.','#a8321f'],
  nane:['Nane','Ferah ve hafif, her mevsim.','#2e9e6b'],
  limnane:['Limon Nane','Ekşi ve serin, yaz favorisi.','#9ccc3c'],
  karpuz:['Karpuz','Tatlı, sulu ve hafif içim.','#e2475a'],
  uzum:['Üzüm','Yumuşak ve dolgun içim.','#6a3a8c'],
  seftali:['Şeftali','Bal gibi tatlı, meyvemsi.','#f2a15a'],
  visne:['Vişne','Mayhoş ve yoğun aromalı.','#8e1b34'],
  mango:['Mango','Tropikal ve kremsi.','#f5b72a'],
  bogurtlen:['Böğürtlen','Koyu meyve, hafif ekşi.','#3a2a5c'],
  kavun:['Kavun','Yaz sofrasının tadı.','#e8c76a'],
  buzlu:['Buzlu Nane','Serinlik veren mentol.','#5bc8d8'],
  gul:['Gül','Nazik ve çiçeksi.','#e58aa6'],
  kiraz:['Kiraz','Tatlı ve parlak.','#c2203c'],
  ananas:['Ananas','Tropik ve canlı.','#e6c229'],
  orman:['Orman Meyveleri','Karışık yabani meyveler.','#6b2c5a'],
  sakiz:['Sakız','Geleneksel, sütsü bir tat.','#d9d2a0'],
  cilek:['Çilek','Tatlı ve yumuşak.','#e0405a'],
  kahve:['Kahve','Kavrulmuş, yoğun.','#6b4026']
};
const M={
  klasik:['Klasik Nargile','Seçtiğiniz aromayla','350 ₺'],
  premium:['Premium Nargile','Karışım aroma, uzun içim','450 ₺'],
  cift:['Çift Kişilik Set','2 nargile ve çay servisi','650 ₺'],
  kahve:['Türk Kahvesi','Lokumla servis edilir','90 ₺'],
  cay:['Demli Çay','Bardak veya demlik','40 ₺'],
  limon:['Taze Limonata','Naneli ve buzlu','120 ₺'],
  meyve:['Meyve Tabağı','Mevsim meyveleri','220 ₺'],
  soguk:['Soğuk İçecekler','Kola, soda, ayran','80 ₺'],
  salep:['Salep','Tarçınlı, sıcak servis','110 ₺'],
  kuru:['Kuruyemiş Tabağı','Karışık, taze kavrulmuş','160 ₺'],
  tavla:['Tavla ve Okey','Masa başında, ücretsiz','Ücretsiz']
};

/* ---------- sayfa üretici ---------- */
function page(c){
  const fl=c.fl.map(k=>F[k]).map(f=>`<div class="fl"><i style="background:${f[2]}"></i><h3>${f[0]}</h3><p>${f[1]}</p></div>`).join('');
  const mn=c.mn.map(k=>M[k]).map(m=>`<li><span><b>${m[0]}</b><small>${m[1]}</small></span><em>${m[2]}</em></li>`).join('');
  const ft=c.feats.map(x=>`<li>${x}</li>`).join('');
  const tl=c.tiles.map((g,i)=>`<div class="tile t${i}" style="background:${g}"><span>${c.tileN[i]}</span></div>`).join('');
  const st=c.strip.map(x=>`<span>${x}</span>`).join('');
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{{SITE_ADI}} | Nargile</title><style>
:root{--bg:${c.bg};--ink:${c.ink};--card:${c.card};--a:${c.a};--a2:${c.a2};--mut:${c.mut};--line:${c.line};--r:${c.r}}
*{box-sizing:border-box;margin:0}
body{font-family:${c.font};background:var(--bg);color:var(--ink);line-height:1.65}
a{color:inherit}
h1,h2,h3{font-family:${c.head};font-weight:${c.hw||700}}
header{background:${c.hd};color:${c.hdInk};display:flex;align-items:center;gap:14px;padding:12px 6%;position:sticky;top:0;z-index:9;border-bottom:1px solid ${c.hdLine}}
header img{height:36px;width:auto}header b{font-family:${c.head};letter-spacing:.08em;font-size:1rem}
nav{margin-inline-start:auto;display:flex;gap:22px;font-size:.9rem}nav a{text-decoration:none;opacity:.8}nav a:hover{opacity:1}
.hbtn{padding:.5rem 1rem;border:1.5px solid currentColor;border-radius:var(--r);text-decoration:none;font-size:.85rem;color:${c.hdInk}}
.hero{position:relative;overflow:hidden;padding:clamp(52px,8vw,112px) 6%;background:${c.hero};color:${c.heroInk}}
.hero::before{content:"";position:absolute;inset:-20% -10%;background:radial-gradient(40% 30% at 20% 30%,${c.smoke},transparent 70%),radial-gradient(35% 30% at 80% 60%,${c.smoke},transparent 70%);filter:blur(24px);animation:drift 14s ease-in-out infinite alternate}
.in{position:relative;z-index:2}
.eyebrow{letter-spacing:.28em;text-transform:uppercase;font-size:.75rem;color:var(--a2);margin-bottom:16px}
.hero h1{font-size:clamp(2.1rem,5.2vw,3.9rem);line-height:1.08;max-width:15ch}
.hero p{margin:18px 0 28px;max-width:48ch;opacity:.9}
.btn{display:inline-block;padding:.9rem 1.6rem;border-radius:var(--r);background:var(--a);color:${c.onA};font-weight:700;text-decoration:none;letter-spacing:.02em}
.btn.o{background:transparent;border:1.5px solid currentColor;color:inherit;margin-inline-start:10px}
.hk{width:100%;max-width:200px;height:auto;filter:drop-shadow(0 20px 28px rgba(0,0,0,.3))}
.sm{animation:rise 5s ease-in-out infinite}
@keyframes rise{0%,100%{transform:translateY(0);opacity:.35}50%{transform:translateY(-8px);opacity:.7}}
@keyframes drift{to{transform:translate(4%,6%) scale(1.08)}}
@media(prefers-reduced-motion:reduce){.sm,.hero::before{animation:none}}
.l-center .hero{text-align:center}.l-center .hero h1,.l-center .hero p{margin-inline:auto}.l-center .vis{margin-top:36px;display:grid;place-items:center}.l-center .hero{padding-top:clamp(36px,5vw,64px)}.l-center .vis{margin-top:24px}.l-center .hk{max-width:150px}
.l-split .in{display:grid;grid-template-columns:1.25fr .75fr;gap:40px;align-items:center}.l-split .vis{display:grid;place-items:center}.l-split .hk{max-width:230px}
.l-arch .in{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}.l-arch .vis{border-radius:999px 999px 16px 16px;border:2px solid var(--a2);padding:54px 24px 30px;display:grid;place-items:center;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 8px rgba(255,255,255,.03)}.l-arch .hk{max-width:180px}
.l-poster .hero{padding-bottom:clamp(90px,12vw,150px);min-height:620px}.l-poster .hero h1{font-size:clamp(2.8rem,10vw,7rem);text-transform:uppercase;letter-spacing:-.02em;max-width:9ch;line-height:.95}.l-poster .vis{position:absolute;right:7%;bottom:-24px;z-index:1}.l-poster .hk{max-width:215px}
.l-minimal .hero{padding-block:clamp(60px,9vw,120px)}.l-minimal .in{display:grid;grid-template-columns:1fr auto;gap:40px;align-items:end;border-bottom:1px solid var(--ink);padding-bottom:40px}.l-minimal .hk{max-width:140px;filter:none}.l-minimal .hero::before{display:none}
.strip{display:flex;flex-wrap:wrap;gap:10px 44px;justify-content:center;padding:18px 6%;background:var(--card);border-bottom:1px solid var(--line);font-size:.88rem;letter-spacing:.06em;color:var(--mut)}
.strip span::before{content:"✦ ";color:var(--a)}
section{padding:clamp(44px,7vw,88px) 6%}
h2{font-size:clamp(1.6rem,3.2vw,2.3rem);margin-bottom:8px}
.sub{color:var(--mut);margin-bottom:30px;max-width:58ch}
.flgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.fl{background:var(--card);border:1px solid var(--line);border-radius:${c.r2};padding:22px}
.fl i{display:block;width:46px;height:46px;border-radius:50%;margin-bottom:14px;box-shadow:inset -7px -7px 14px rgba(0,0,0,.28),0 6px 14px rgba(0,0,0,.2)}
.fl h3{font-size:1.05rem;margin-bottom:4px}.fl p{font-size:.9rem;color:var(--mut)}
.alt{background:var(--card);border-block:1px solid var(--line)}
.menu{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:0 56px}
.menu li{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:16px 0;border-bottom:1px dashed var(--line)}
.menu b{display:block;font-family:${c.head}}.menu small{color:var(--mut)}.menu em{font-style:normal;font-weight:700;color:var(--a);white-space:nowrap}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.tile{aspect-ratio:3/4;border-radius:${c.r2};display:flex;align-items:flex-end;padding:14px;color:#fff;font-size:.85rem;letter-spacing:.06em;box-shadow:inset 0 -80px 60px -30px rgba(0,0,0,.55)}
.about{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.feats{list-style:none;padding:0;display:grid;gap:12px}.feats li{padding:14px 18px;background:var(--card);border:1px solid var(--line);border-radius:${c.r2}}.feats li::before{content:"✓";color:var(--a);font-weight:800;margin-inline-end:10px}
.res{background:var(--a);color:${c.onA};text-align:center}.res h2{margin-bottom:10px}.res p{max-width:50ch;margin:0 auto 24px;opacity:.92}.res .btn{background:${c.resBtn};color:${c.resBtnInk}}
.contact p{margin-bottom:6px}
footer{background:${c.hd};color:${c.hdInk};padding:28px 6%;display:flex;flex-wrap:wrap;gap:12px 32px;justify-content:space-between;font-size:.9rem}
@media(max-width:900px){.flgrid{grid-template-columns:repeat(2,1fr)}}@media(max-width:760px){nav{display:none}.l-split .in,.l-arch .in,.about,.l-minimal .in{grid-template-columns:1fr}.l-poster .vis{position:static;margin-top:28px}.tiles{grid-template-columns:repeat(2,1fr)}.flgrid{grid-template-columns:1fr}.l-split .vis,.l-arch .vis{max-width:300px}}
${c.css||''}
</style></head><body class="l-${c.layout}">
<header><img src="{{LOGO}}" alt="{{SITE_ADI}}"><b>{{SITE_ADI}}</b><nav><a href="#aroma">Aromalar</a><a href="#menu">Menü</a><a href="#mekan">Mekân</a><a href="#iletisim">İletişim</a></nav><a class="hbtn" href="#rezervasyon">Rezervasyon</a></header>
<div class="hero"><div class="in"><div class="tx"><div class="eyebrow">${c.eyebrow}</div><h1>${c.h1}</h1><p>${c.p}</p><a class="btn" href="#rezervasyon">${c.cta}</a><a class="btn o" href="#menu">Menüyü gör</a></div><div class="vis">${hk(c.hk[0],c.hk[1])}</div></div></div>
<div class="strip">${st}</div>
<section id="aroma"><h2>${c.flT}</h2><p class="sub">${c.flS}</p><div class="flgrid">${fl}</div></section>
<section id="menu" class="alt"><h2>${c.mnT}</h2><p class="sub">${c.mnS}</p><ul class="menu">${mn}</ul></section>
<section id="mekan"><h2>${c.abT}</h2><p class="sub">${c.ab}</p><div class="tiles">${tl}</div></section>
<section class="alt"><div class="about"><div><h2>${c.whyT}</h2><p class="sub" style="margin-bottom:0">${c.why}</p></div><ul class="feats">${ft}</ul></div></section>
<section id="rezervasyon" class="res"><h2>${c.rsT}</h2><p>${c.rs}</p><a class="btn" href="{{WHATSAPP}}" target="_blank" rel="noopener">WhatsApp ile rezervasyon</a></section>
<section id="iletisim" class="contact"><h2>İletişim</h2><p>Telefon: {{TELEFON}}</p><p>{{ADRES}}</p><p>{{SAAT}}</p></section>
<footer><span>© {{SITE_ADI}}</span><a href="tel:{{TELEFON_LINK}}">{{TELEFON}}</a></footer>
</body></html>`;
}

const T=[
/* 1 */{id:'nrg-altin',tr:'Altın Duman Lounge',en:'Golden Smoke Lounge',de:'Goldener Rauch Lounge',ar:'صالة الدخان الذهبي',desc:'Siyah ve altın, lüks lounge havası. Ortalı vitrin.',
 layout:'center',font:"Georgia,'Times New Roman',serif",head:"Georgia,'Times New Roman',serif",bg:'#0c0a08',ink:'#f3ead8',card:'#16120d',mut:'#b8a98c',line:'#2c2418',a:'#d4a24c',a2:'#f0cf8a',onA:'#1a1306',r:'3px',r2:'4px',
 hd:'#070605',hdInk:'#f3ead8',hdLine:'#2c2418',hero:'radial-gradient(80% 90% at 50% 0%,#2a2114,#0c0a08)',heroInk:'#f3ead8',smoke:'rgba(212,162,76,.18)',resBtn:'#0c0a08',resBtnInk:'#f0cf8a',hk:['#d4a24c','#f0cf8a'],
 eyebrow:'Premium Nargile Lounge',h1:'Dumanın en zarif hali',p:'Özenle seçilmiş aromalar, derin koltuklar ve loş ışıkta uzun sohbetler. Akşamınızı ayrıcalıklı yapın.',cta:'Masa ayırt',
 strip:['Özel kabinler','Her gün 16:00 – 02:00','Canlı fasıl geceleri'],flT:'İmza aromalarımız',flS:'Her biri tek tek hazırlanır, kömürü ustalarımız yönetir.',fl:['elma','uzum','gul','kahve','bogurtlen','sakiz'],
 mnT:'Menü',mnS:'Nargile ve ikramlar. Fiyatlar örnektir.',mn:['premium','klasik','cift','kahve','salep','kuru'],
 abT:'Mekân',ab:'Sıcak ışık, bakır detaylar ve deri koltuklar.',tiles:['linear-gradient(160deg,#4a3516,#14100a)','linear-gradient(160deg,#6b4a1e,#1b1409)','linear-gradient(160deg,#2c2418,#0b0907)','linear-gradient(160deg,#8a6420,#20170a)'],tileN:['Salon','Kabin','Bar','Teras'],
 whyT:'Neden biz?',why:'Misafirimizi evinde gibi hissettirmek için her ayrıntıyı düşündük.',feats:['Her masaya özel nargile ustası','Kömür değişimi ücretsiz','Kapalı kabin ve açık salon','Vale hizmeti'],rsT:'Akşamınızı ayırtın',rs:'Kabinler hafta sonu hızla doluyor. Mesaj atın, yerinizi hemen hazırlayalım.',
 css:'.hero h1{text-shadow:0 2px 30px rgba(212,162,76,.25)}.fl{background:linear-gradient(180deg,#1a150e,#120e09)}header b{color:#f0cf8a}'},
/* 2 */{id:'nrg-mavi',tr:'Mavi Dalga Nargile Cafe',en:'Blue Wave Hookah Cafe',de:'Blaue Welle Shisha-Café',ar:'مقهى الموجة الزرقاء للأرجيلة',desc:'Ferah mavi tonlar, metin solda nargile sağda.',
 layout:'split',font:"'Segoe UI',system-ui,sans-serif",head:"'Trebuchet MS','Segoe UI',sans-serif",bg:'#eef4f7',ink:'#0d2433',card:'#ffffff',mut:'#527082',line:'#d5e3ea',a:'#0a95a8',a2:'#7fe3ee',onA:'#fff',r:'12px',r2:'16px',
 hd:'#07202f',hdInk:'#e8f6fa',hdLine:'rgba(255,255,255,.08)',hero:'linear-gradient(125deg,#07202f,#0b5a73 70%,#0a95a8)',heroInk:'#fff',smoke:'rgba(127,227,238,.2)',resBtn:'#07202f',resBtnInk:'#fff',hk:['#0a95a8','#bdf3f8'],
 eyebrow:'Nargile · Çay · Sohbet',h1:'Serin aromalar, ferah bir mola',p:'Buzlu nane, limon ve meyve karışımlarıyla şehrin gürültüsünden uzaklaşın. Arkadaşlarınızla uzun bir oturuş sizi bekliyor.',cta:'Yer ayırt',
 strip:['Klimalı salon','Ücretsiz Wi-Fi','Öğrenci indirimi'],flT:'Serin aromalar',flS:'Yaz kış en çok tercih edilen ferah tatlar.',fl:['buzlu','limnane','karpuz','kavun','mango','cilek'],
 mnT:'Menü',mnS:'Sade ve net fiyatlar. Örnek menüdür.',mn:['klasik','cift','limon','cay','soguk','meyve'],
 abT:'Mekân',ab:'Mavi-beyaz iç mekân, geniş masalar ve hafif müzik.',tiles:['linear-gradient(160deg,#0a95a8,#07202f)','linear-gradient(160deg,#4cc3d3,#0b5a73)','linear-gradient(160deg,#0b5a73,#041620)','linear-gradient(160deg,#7fe3ee,#0a95a8)'],tileN:['Salon','Pencere kenarı','Bar','Bahçe'],
 whyT:'Bizi sevdiren detaylar',why:'Rahat oturma düzeni, ferah hava ve hızlı servis.',feats:['Havalandırmalı, dumansız hissi veren salon','Grup masaları (10 kişiye kadar)','Şarj noktaları','Doğum günü ikramı'],rsT:'Grubunuzla gelin',rs:'6 kişi ve üzeri masalar için önceden haber verin, hazır bekleyelim.',css:''},
/* 3 */{id:'nrg-osmanli',tr:'Osmanlı Nargile Salonu',en:'Ottoman Hookah Salon',de:'Osmanischer Shisha-Salon',ar:'صالون الأرجيلة العثماني',desc:'Bordo ve altın, kemerli çerçeve. Geleneksel hava.',
 layout:'arch',font:"Georgia,'Times New Roman',serif",head:"Georgia,'Times New Roman',serif",bg:'#f6eddc',ink:'#3a1520',card:'#fffaf0',mut:'#7d5a5f',line:'#e3d3b6',a:'#8c1d2e',a2:'#e2b455',onA:'#fff',r:'6px',r2:'10px',
 hd:'#3d0c17',hdInk:'#f6e4c3',hdLine:'#e2b455',hero:'linear-gradient(140deg,#3d0c17,#7a1a2b)',heroInk:'#fbeccf',smoke:'rgba(226,180,85,.18)',resBtn:'#3d0c17',resBtnInk:'#f6e4c3',hk:['#e2b455','#fbeccf'],
 eyebrow:'Gelenekten gelen keyif',h1:'Yüzyıllık bir keyfin modern salonu',p:'Bakır tepsiler, iznik çiniler ve ağır ağır tüten nargileler. Eski İstanbul sohbetini yeniden yaşayın.',cta:'Yer ayırt',
 strip:['Hasır ve minder oturma','Türk kahvesi ikramı','Akşam saz geceleri'],flT:'Geleneksel tatlar',flS:'Atalarımızın sevdiği aromalar, bugünün ustalığıyla.',fl:['elma','sakiz','gul','uzum','visne','nane'],
 mnT:'Menü',mnS:'Nargile ve geleneksel ikramlar. Örnek fiyatlardır.',mn:['klasik','kahve','salep','cay','kuru','cift'],
 abT:'Salonumuz',ab:'Çini desenler, kilim kaplı minderler ve bakır avizeler.',tiles:['linear-gradient(160deg,#7a1a2b,#2a0810)','linear-gradient(160deg,#a8782a,#3d0c17)','linear-gradient(160deg,#c89a3c,#4a1520)','linear-gradient(160deg,#5a1423,#1d050a)'],tileN:['Ana salon','Minder köşesi','Divan','Avlu'],
 whyT:'Neden Osmanlı?',why:'Hız yok, acele yok. Sohbet ve keyif var.',feats:['Çaylar semaverde demlenir','Tavla ve kâğıt takımları','Gruplara özel salon','Her masaya lokum'],rsT:'Köşenizi ayırtın',rs:'Minder köşeleri hafta sonları dolar. Önceden yazın.',
 css:'header{border-bottom-width:2px}.l-arch .vis{border-width:3px}.fl{border-top:3px solid #e2b455}.hero{background-image:linear-gradient(140deg,#3d0c17,#7a1a2b),repeating-linear-gradient(45deg,transparent 0 22px,rgba(226,180,85,.05) 22px 23px)}'},
/* 4 */{id:'nrg-neon',tr:'Neon Shisha Club',en:'Neon Shisha Club',de:'Neon Shisha Club',ar:'نادي شيشة النيون',desc:'Mor-neon gece kulübü. Dev başlık, parlayan renkler.',
 layout:'poster',font:"'Trebuchet MS',system-ui,sans-serif",head:"Impact,'Arial Black',sans-serif",hw:400,bg:'#090513',ink:'#f1eaff',card:'#130b24',mut:'#a89bcc',line:'#2a1d49',a:'#ff2e9a',a2:'#29e4ff',onA:'#fff',r:'2px',r2:'6px',
 hd:'#05030c',hdInk:'#f1eaff',hdLine:'#ff2e9a',hero:'linear-gradient(160deg,#150a2e,#2b0d4a 60%,#4a0a52)',heroInk:'#fff',smoke:'rgba(255,46,154,.25)',resBtn:'#090513',resBtnInk:'#29e4ff',hk:['#ff2e9a','#29e4ff'],
 eyebrow:'Gece 20:00 · DJ · Shisha',h1:'Gece başlasın',p:'DJ sahnesi, neon ışıklar ve en yoğun aromalar. Cumartesi geceleri ücretsiz giriş.',cta:'Masa ayırt',
 strip:['Cuma-Cumartesi DJ','Gece 04:00’e kadar','Özel doğum günü paketleri'],flT:'Yoğun karışımlar',flS:'Kulüp aromaları, buzlu servis, dolu duman.',fl:['buzlu','orman','mango','bogurtlen','cilek','ananas'],
 mnT:'Fiyatlar',mnS:'Gece fiyatları örnektir.',mn:['premium','cift','soguk','limon','meyve','klasik'],
 abT:'Sahne ve salon',ab:'Neon tüpler, LED zemin ve geniş dans alanı.',tiles:['linear-gradient(160deg,#ff2e9a,#1c0a38)','linear-gradient(160deg,#29e4ff,#1c0a38)','linear-gradient(160deg,#7a2eff,#12082a)','linear-gradient(160deg,#ff7a2e,#2a0a28)'],tileN:['Sahne','Bar','VIP','Teras'],
 whyT:'Gecenin farkı',why:'Hem sohbet hem eğlence için tasarlandı.',feats:['Cumartesi canlı DJ','VIP bölümler','Kokteyl ve nargile paketi','Hafta içi 2 al 1 öde'],rsT:'VIP masa ayırt',rs:'Cumartesi akşamları yer kalmıyor. Şimdi yazın.',
 css:'.hero h1{text-shadow:0 0 18px rgba(255,46,154,.6),0 0 42px rgba(41,228,255,.35)}.btn{box-shadow:0 0 22px rgba(255,46,154,.55)}.fl{box-shadow:0 0 0 1px #2a1d49,0 0 24px rgba(255,46,154,.08)}.strip span::before{color:#29e4ff}h2{color:#29e4ff;text-shadow:0 0 14px rgba(41,228,255,.45)}.res{background:linear-gradient(90deg,#ff2e9a,#7a2eff)}'},
/* 5 */{id:'nrg-teras',tr:'Teras Nargile & Çay Bahçesi',en:'Terrace Hookah & Tea Garden',de:'Terrassen-Shisha & Teegarten',ar:'حديقة الشاي والأرجيلة على الشرفة',desc:'Gün batımı renkleri, teras ve çay bahçesi.',
 layout:'center',font:"'Segoe UI',system-ui,sans-serif",head:"Georgia,'Times New Roman',serif",bg:'#fbf1e4',ink:'#3b2417',card:'#fffaf3',mut:'#8a6a58',line:'#ecd8c3',a:'#d9622b',a2:'#ffd08a',onA:'#fff',r:'999px',r2:'18px',
 hd:'#3b2417',hdInk:'#fbe9d2',hdLine:'rgba(255,255,255,.08)',hero:'linear-gradient(180deg,#f6b25c 0%,#e0763a 45%,#7a2d3a 100%)',heroInk:'#fff',smoke:'rgba(255,255,255,.22)',resBtn:'#3b2417',resBtnInk:'#ffd08a',hk:['#3b2417','#ffd08a'],
 eyebrow:'Gün batımı · Çay · Nargile',h1:'Günün en güzel saati teraste',p:'Çaylar demleniyor, kömürler hazır. Akşam serinliğinde sohbetin tadını çıkarın.',cta:'Teras ayırt',
 strip:['Açık hava terası','Sıcak battaniye servisi','Evcil hayvan dostu'],flT:'Teras aromaları',flS:'Çayın yanına en çok yakışan tatlar.',fl:['seftali','limnane','kavun','elma','mango','kiraz'],
 mnT:'Çay ve nargile',mnS:'Bahçe fiyat listesi. Örnektir.',mn:['cay','klasik','cift','limon','meyve','kuru'],
 abT:'Teras',ab:'Ağaç gölgesi, hasır sandalyeler ve ışık dizileri.',tiles:['linear-gradient(160deg,#f6b25c,#b8481f)','linear-gradient(160deg,#e0763a,#5a1f2e)','linear-gradient(160deg,#ffd08a,#d9622b)','linear-gradient(160deg,#7a2d3a,#2a0f19)'],tileN:['Teras','Köşe masa','Bahçe','Akşam'],
 whyT:'Neden teras?',why:'Gün batımına karşı uzun, sakin akşamlar.',feats:['Rüzgâr korumalı alan','Sıcak sobalar (kış)','Çocuk dostu gündüz saatleri','Açık mikrofon geceleri'],rsT:'Gün batımına yer ayırt',rs:'Terasa en güzel masalar 18:00’den önce dolar.',
 css:'.hero::after{content:"";position:absolute;left:50%;bottom:-120px;width:340px;height:340px;margin-left:-170px;border-radius:50%;background:radial-gradient(circle,#ffe2a8,#f6b25c 55%,transparent 70%);opacity:.65;z-index:1}'},
/* 6 */{id:'nrg-minimal',tr:'Minimal Shisha Bar',en:'Minimal Shisha Bar',de:'Minimal Shisha Bar',ar:'بار شيشة مينيمال',desc:'Beyaz zemin, ince çizgiler, sade ve modern.',
 layout:'minimal',font:"'Helvetica Neue',Arial,sans-serif",head:"'Helvetica Neue',Arial,sans-serif",hw:300,bg:'#fafaf8',ink:'#111',card:'#f1f1ee',mut:'#777',line:'#dcdcd6',a:'#111',a2:'#888',onA:'#fff',r:'0',r2:'0',
 hd:'#fafaf8',hdInk:'#111',hdLine:'#111',hero:'#fafaf8',heroInk:'#111',smoke:'transparent',resBtn:'#fff',resBtnInk:'#111',hk:['#111','#b9b9b3'],
 eyebrow:'Shisha bar',h1:'Az, ama iyi.',p:'Sekiz aroma, tek bir kural: kaliteli malzeme. Sade bir mekânda sakin bir akşam.',cta:'Masa ayırt',
 strip:['8 aroma','Sakin müzik','Rezervasyonlu'],flT:'Aromalar',flS:'Kısa liste, uzun keyif.',fl:['nane','limnane','karpuz','seftali','uzum','elma'],
 mnT:'Menü',mnS:'Fiyatlar örnek.',mn:['klasik','premium','cift','cay','kahve','limon'],
 abT:'Mekân',ab:'Beton, ahşap ve tek renk. Dikkat dağıtan hiçbir şey yok.',tiles:['linear-gradient(160deg,#d9d9d3,#a8a8a0)','linear-gradient(160deg,#bdbdb5,#6f6f68)','linear-gradient(160deg,#e8e8e2,#c4c4bc)','linear-gradient(160deg,#9b9b94,#3f3f3a)'],tileN:['Bar','Masa','Köşe','Giriş'],
 whyT:'Yaklaşım',why:'Daha az seçenek, daha iyi hazırlık.',feats:['Her nargile tek kişiye özel hazırlanır','Cam şişe, taze hortum','Sessiz salon','Yalnız gelene de masa'],rsT:'Yerinizi ayırtın',rs:'Küçük bir mekânız. Önceden yazmanız yeterli.',
 css:'.hero h1{font-size:clamp(3rem,9vw,6.5rem);letter-spacing:-.04em;max-width:10ch}.btn,.hbtn{border-radius:0}.fl i{border-radius:0;width:28px;height:28px;box-shadow:none}.fl{background:transparent;border-width:0 0 1px 0;padding-inline:0}.tile{box-shadow:none;color:#111}.eyebrow{color:#777}.res{background:#111}.menu li{border-bottom-style:solid}'},
/* 7 */{id:'nrg-cinar',tr:'Çınar Altı Nargile Bahçesi',en:'Under the Plane Tree Hookah Garden',de:'Shisha-Garten unter der Platane',ar:'حديقة الأرجيلة تحت الدلب',desc:'Yeşil tonlar, bahçe ve gölge. Doğa teması.',
 layout:'split',font:"'Trebuchet MS',system-ui,sans-serif",head:"Georgia,'Times New Roman',serif",bg:'#f1f5ec',ink:'#1f3320',card:'#fbfdf8',mut:'#5f7761',line:'#d6e2cb',a:'#3f7d3a',a2:'#c9e29a',onA:'#fff',r:'10px',r2:'14px',
 hd:'#1b3320',hdInk:'#eef6e0',hdLine:'rgba(255,255,255,.08)',hero:'linear-gradient(135deg,#1b3320,#3f7d3a)',heroInk:'#fff',smoke:'rgba(201,226,154,.22)',resBtn:'#1b3320',resBtnInk:'#c9e29a',hk:['#c9e29a','#ffffff'],
 eyebrow:'Gölge · Çay · Nargile',h1:'Çınarın gölgesinde bir mola',p:'Ağaçların altında, serin bir bahçede nane çayı ve nargile. Şehrin ortasında küçük bir sığınak.',cta:'Masa ayırt',
 strip:['Geniş bahçe','Ev yapımı limonata','Kedi dostu'],flT:'Bahçenin aromaları',flS:'Taze, hafif, yeşil.',fl:['nane','limnane','kavun','karpuz','elma','buzlu'],
 mnT:'Bahçe menüsü',mnS:'Örnek fiyatlar.',mn:['klasik','cay','limon','meyve','salep','tavla'],
 abT:'Bahçe',ab:'Ahşap masalar, asma yaprakları ve gölgeli köşeler.',tiles:['linear-gradient(160deg,#3f7d3a,#14261a)','linear-gradient(160deg,#7fb069,#2a4d2c)','linear-gradient(160deg,#c9e29a,#4d8a45)','linear-gradient(160deg,#1b3320,#0a150d)'],tileN:['Çınar altı','Asma','Köşe','Akşam'],
 whyT:'Neden bahçe?',why:'Sakin, serin ve kalabalıktan uzak.',feats:['Yaz boyu gölgeli alan','Ahşap masalar','Sakin müzik','Aile günleri'],rsT:'Gölgede yer ayırt',rs:'Öğleden sonra en iyi masalar için erken yazın.',css:''},
/* 8 */{id:'nrg-sky',tr:'Sky Rooftop Lounge',en:'Sky Rooftop Lounge',de:'Sky Dachterrassen-Lounge',ar:'صالة السطح سكاي',desc:'Çatı katı, şehir silueti ve gün batımı.',
 layout:'poster',font:"'Segoe UI',system-ui,sans-serif",head:"'Arial Black',Impact,sans-serif",hw:400,bg:'#0b1220',ink:'#eaf0ff',card:'#121c31',mut:'#93a3c4',line:'#223052',a:'#ff8a3d',a2:'#ffc27a',onA:'#1a0d02',r:'8px',r2:'12px',
 hd:'#070c16',hdInk:'#eaf0ff',hdLine:'rgba(255,255,255,.08)',hero:'linear-gradient(180deg,#0b1220 0%,#1c2b52 55%,#c9602a 130%)',heroInk:'#fff',smoke:'rgba(255,194,122,.2)',resBtn:'#0b1220',resBtnInk:'#ffc27a',hk:['#ff8a3d','#ffe0bd'],
 eyebrow:'12. kat · Panorama',h1:'Şehir ayağınızın altında',p:'Gün batımında başlayan, şehir ışıklarıyla süren bir akşam. Panoramik terasta nargile.',cta:'Masa ayırt',
 strip:['Panoramik manzara','Gün batımı saati','Şömineli kapalı alan'],flT:'Sky seçkisi',flS:'Gün batımına yakışan aromalar.',fl:['mango','orman','visne','ananas','buzlu','seftali'],
 mnT:'Menü',mnS:'Örnek fiyat listesi.',mn:['premium','cift','klasik','limon','meyve','soguk'],
 abT:'Teras',ab:'Cam korkuluklar, ısıtıcılar ve 360 derece manzara.',tiles:['linear-gradient(160deg,#1c2b52,#070c16)','linear-gradient(160deg,#ff8a3d,#3a1a2e)','linear-gradient(160deg,#35508c,#0b1220)','linear-gradient(160deg,#ffc27a,#c9602a)'],tileN:['Panorama','Gün batımı','Salon','Bar'],
 whyT:'Yükseklik farkı',why:'Manzaranın en iyi göründüğü saatte buradayız.',feats:['Isıtıcılı açık teras','Cam kenar masalar','DJ ve akustik geceler','Özel kutlama paketleri'],rsT:'Gün batımı masası',rs:'En iyi masalar gün batımından 1 saat önce doluyor.',
 css:'.hero::after{content:"";position:absolute;left:0;right:0;bottom:0;height:90px;z-index:1;background:linear-gradient(#070b14,#070b14) 2% 100%/5% 46px no-repeat,linear-gradient(#070b14,#070b14) 9% 100%/4% 70px no-repeat,linear-gradient(#070b14,#070b14) 16% 100%/6% 38px no-repeat,linear-gradient(#070b14,#070b14) 25% 100%/4% 82px no-repeat,linear-gradient(#070b14,#070b14) 33% 100%/7% 52px no-repeat,linear-gradient(#070b14,#070b14) 44% 100%/4% 64px no-repeat,linear-gradient(#070b14,#070b14) 52% 100%/6% 40px no-repeat,linear-gradient(#070b14,#070b14) 62% 100%/5% 76px no-repeat,linear-gradient(#070b14,#070b14) 72% 100%/6% 48px no-repeat,linear-gradient(#070b14,#070b14) 82% 100%/4% 66px no-repeat,linear-gradient(#070b14,#070b14) 90% 100%/6% 42px no-repeat}.l-poster .vis{z-index:3}'},
/* 9 */{id:'nrg-sark',tr:'Şark Gecesi Nargile',en:'Oriental Nights Hookah',de:'Orientalische Nächte Shisha',ar:'ليالي الشرق للأرجيلة',desc:'Zümrüt ve bakır, doğu desenleri, kemerli çerçeve.',
 layout:'arch',font:"Georgia,'Times New Roman',serif",head:"Georgia,'Times New Roman',serif",bg:'#0e2a2d',ink:'#f1e6d3',card:'#133538',mut:'#a9c0bb',line:'#25494c',a:'#c8773a',a2:'#f0b37a',onA:'#fff',r:'999px',r2:'18px',
 hd:'#081c1e',hdInk:'#f1e6d3',hdLine:'#c8773a',hero:'linear-gradient(140deg,#0a2326,#14464a)',heroInk:'#f6ead6',smoke:'rgba(240,179,122,.16)',resBtn:'#081c1e',resBtnInk:'#f0b37a',hk:['#c8773a','#f6ead6'],
 eyebrow:'Bin bir gece tadında',h1:'Doğunun kokusu, masanızda',p:'Baharat, gül ve tatlı aromalar. Fenerlerin ışığında uzun bir gece geçirin.',cta:'Masa ayırt',
 strip:['Fener ışığı','Oryantal müzik','Arapça kahve ikramı'],flT:'Doğu aromaları',flS:'Gül, sakız ve baharatlı karışımlar.',fl:['gul','sakiz','kahve','uzum','seftali','elma'],
 mnT:'Menü',mnS:'Örnek fiyatlar.',mn:['premium','klasik','cift','kahve','salep','kuru'],
 abT:'Mekân',ab:'Fenerler, halılar, oymalı paravanlar ve alçak masalar.',tiles:['linear-gradient(160deg,#c8773a,#1a2a2b)','linear-gradient(160deg,#14464a,#071416)','linear-gradient(160deg,#f0b37a,#8a4a1e)','linear-gradient(160deg,#0a2326,#000)'],tileN:['Fener salonu','Halı köşesi','Paravan','Bar'],
 whyT:'Neden Şark Gecesi?',why:'Sıradan bir mekân değil, bir atmosfer.',feats:['Halı serili alçak masalar','Arapça ve Türkçe müzik','Baharatlı çay ikramı','Özel kutlama masaları'],rsT:'Geceyi ayırtın',rs:'Cuma ve cumartesi geceleri yer sınırlıdır.',
 css:'.hero{background-image:linear-gradient(140deg,#0a2326,#14464a),radial-gradient(circle at 20px 20px,rgba(240,179,122,.08) 2px,transparent 3px);background-size:auto,40px 40px;background-blend-mode:normal}.hero{background:radial-gradient(circle at 20px 20px,rgba(240,179,122,.10) 2px,transparent 3px) 0 0/40px 40px,linear-gradient(140deg,#0a2326,#14464a)}.btn,.hbtn{border-radius:999px}.fl{border-radius:18px 18px 40px 40px}'},
/* 10 */{id:'nrg-kahvehane',tr:'Eski Kahvehane Nargile',en:'Old Coffeehouse Hookah',de:'Altes Kaffeehaus Shisha',ar:'مقهى الأرجيلة القديم',desc:'Krem ve kırmızı, nostaljik kahvehane havası.',
 layout:'center',font:"Georgia,'Times New Roman',serif",head:"Georgia,'Times New Roman',serif",bg:'#f4ead5',ink:'#2a1b12',card:'#fbf4e3',mut:'#7b6753',line:'#d8c7a3',a:'#b32d2a',a2:'#1f5b52',onA:'#fff',r:'3px',r2:'3px',
 hd:'#2a1b12',hdInk:'#f4ead5',hdLine:'#b32d2a',hero:'#e8d7b3',heroInk:'#2a1b12',smoke:'rgba(179,45,42,.08)',resBtn:'#f4ead5',resBtnInk:'#b32d2a',hk:['#b32d2a','#2a1b12'],
 eyebrow:'Kuruluş 1987 · Mahalle kahvesi',h1:'Eski kahvehane, yeni nargile',p:'Tavla sesi, çay bardağı şıkırtısı ve mis gibi nargile. Mahallenin buluşma noktası.',cta:'Masa ayırt',
 strip:['Tavla ve okey','Semaverde demli çay','Gazete ve dergi köşesi'],flT:'Nargile çeşitleri',flS:'Kahvehanenin değişmeyen lezzetleri.',fl:['elma','nane','uzum','kavun','sakiz','visne'],
 mnT:'Kahvehane fiyatları',mnS:'Mahalle fiyatı, örnek liste.',mn:['cay','kahve','klasik','tavla','salep','kuru'],
 abT:'Kahvehane',ab:'Hasır sandalyeler, mermer masalar ve duvarda eski fotoğraflar.',tiles:['linear-gradient(160deg,#b32d2a,#4a1210)','linear-gradient(160deg,#c7a96a,#6b4a1e)','linear-gradient(160deg,#1f5b52,#0b2a26)','linear-gradient(160deg,#7b6753,#2a1b12)'],tileN:['Tavla köşesi','Semaver','Ön cephe','Gazete köşesi'],
 whyT:'Mahalleden biri',why:'Tanışmak için bahaneye gerek yok. Bir çay yeter.',feats:['Tavla ve okey turnuvaları','Maç günlerinde büyük ekran','Çay ocağından sıcak servis','Esnafa özel indirim'],rsT:'Köşenizi tutun',rs:'Maç ve turnuva günleri için masa ayırtın.',
 css:'.hero{border-bottom:6px double #b32d2a}header{border-bottom:3px double #b32d2a}.fl{border:2px solid #2a1b12;box-shadow:4px 4px 0 #2a1b12}.fl i{box-shadow:none}.res{border-block:6px double #f4ead5}h2{text-transform:uppercase;letter-spacing:.08em}'}
];

const cat={id:'c-nargile',name:'Nargile',en:{name:'Hookah'},de:{name:'Shisha'},ar:{name:'أرجيلة'}};
const templates=T.map(t=>({id:t.id,sample:true,title:t.tr,categoryId:cat.id,desc:t.desc,html:page(t),image:'',sourceUrl:'',visible:true,
  en:{title:t.en},de:{title:t.de},ar:{title:t.ar}}));
window.NARGILE_DEMOS={category:cat,templates:templates};
})();
