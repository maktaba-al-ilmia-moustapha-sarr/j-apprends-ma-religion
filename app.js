/* AK Dreams Book — logique du site. Pas de dépendance. Données : data.js (113 cartes). */
const MEM={};
const store={
 get(k,d){try{const v=localStorage.getItem(k);return v===null?d:v;}catch(e){return(k in MEM)?MEM[k]:d;}},
 set(k,v){try{localStorage.setItem(k,v);}catch(e){MEM[k]=v;}}
};
const LS_KEY="akdreams_cards_v1", LS_LANG="akdreams_lang_v1";
let LANG=store.get(LS_LANG,"fr")||"fr";
let extra=[];try{extra=JSON.parse(store.get(LS_KEY,"[]")||"[]");}catch(e){extra=[];}
const I18N={
nav_home:{fr:"Accueil",wo:"Kër gi",ar:"الرئيسية"},nav_cards:{fr:"Toutes les cartes",wo:"Karti yëp",ar:"كل البطاقات"},
nav_cats:{fr:"Catégories",wo:"Xalaat yi",ar:"الفئات"},nav_learn:{fr:"Apprentissage",wo:"Jàng",ar:"التعلّم"},
nav_quiz:{fr:"Quiz",wo:"Ndamm",ar:"اختبار"},nav_about:{fr:"À propos",wo:"Ci mbir mi",ar:"عن المشروع"},
foot:{fr:"113 cartes en français, wolof et arabe.",wo:"113 karti.",ar:"113 بطاقة بالفرنسية والولفية والعربية."},
search:{fr:"Rechercher… (ex : foi, prière, Coran)",wo:"Seet… (ndax : geum, julli)",ar:"ابحث… (مثال: إيمان، صلاة)"},
allcats:{fr:"Toutes catégories",wo:"Xalaat yëp",ar:"كل الفئات"},show:{fr:"Afficher la réponse",wo:"Wone tontu bi",ar:"أظهر الجواب"},
hide:{fr:"Cacher",wo:"Nëbbu",ar:"إخفاء"},prev:{fr:"← Précédent",wo:"← Bi jiitu",ar:"→ السابق"},next:{fr:"Suivant →",wo:"Bi toop →",ar:"← التالي"},
needar:{fr:"Traduction arabe manquante.",wo:"Arabe bi amagul.",ar:"الترجمة العربية غير متوفرة."},
verify:{fr:"À vérifier",wo:"Xoolal",ar:"يحتاج مراجعة"},
score:{fr:"Score",wo:"Ndam",ar:"النتيجة"},retry:{fr:"Recommencer",wo:"Tambaliwaat",ar:"إعادة"},
cta_start:{fr:"Commencer à apprendre",wo:"Tambali jàng",ar:"ابدأ التعلّم"},
cta_explore:{fr:"Explorer les cartes",wo:"Xool karti yi",ar:"استكشف البطاقات"},
qword:{fr:"Question",wo:"Lathie",ar:"سؤال"},cardsn:{fr:"cartes",wo:"karti",ar:"بطاقة"},
hlead:{fr:"Une identité unique pour les enfants, les jeunes et les adultes : avancez à votre rythme ou testez vos connaissances.",wo:"Benn jëfandikoo ngir xale yi, ndank yi ak mag yi : demal sa taat wala saytu sa xam-xam.",ar:"هوية واحدة للأطفال والشباب والكبار: تقدّم على وتيرتك أو اختبر معلوماتك."},
ptitle:{fr:"Deux parcours, une même collection",wo:"Ñaari yoon, benn collection",ar:"مساران، مجموعة واحدة"},
p1t:{fr:"Premiers pas",wo:"Tambali",ar:"الخطوات الأولى"},
p1d:{fr:"Enfants et débutants — une carte à la fois, question puis réponse.",wo:"Xale yi ak ñi doom — benn karti, lathie, tontu.",ar:"للأطفال والمبتدئين — بطاقة واحدة في كل مرة، سؤال ثم جواب."},
p2t:{fr:"Réviser et se tester",wo:"Saytu sa bopp",ar:"راجع واختبر نفسك"},
p2d:{fr:"Jeunes et adultes — des quiz corrigés pour ancrer les savoirs.",wo:"Ndank yi ak mag yi — ndamm yu am correction ngir dëggal xam-xam.",ar:"للشباب والكبار — اختبارات مصححة لتثبيت المعارف."},
p3d:{fr:"Recherche et filtres par catégorie, en français, wolof et arabe.",wo:"Seetal te filtrer ci xalaat, ci falaŋse, wolof ak arabe.",ar:"ابحث وصفِّ حسب الفئة، بالفرنسية والولفية والعربية."},
gtitle:{fr:"Les catégories du programme",wo:"Xalaati program bi",ar:"فئات البرنامج"},
glead:{fr:"thèmes issus du guide des couleurs, page 1 du PDF.",wo:"xalaat ñoo ngi joge ci guide couleurs, page 1 PDF.",ar:"موضوعًا من دليل الألوان، الصفحة 1 من الملف."},
clead:{fr:"Chaque thème correspond à une couleur du guide, page 1 du PDF.",wo:"Xalaat wu nekk amna benn melo ci guide bi, page 1 PDF.",ar:"كل موضوع يقابل لونًا من الدليل، الصفحة 1 من الملف."},
ab1:{fr:"Collection « J'apprends ma religion » (Ahlam, 77 137 10 10). Des cartes éducatives islamiques pour les enfants, les jeunes et les adultes, en français, wolof et arabe.",wo:"Collection « J'apprends ma religion » (Ahlam, 77 137 10 10). Karti jàngukaay lislaam ngir xale yi, ndank yi ak mag yi, ci falaŋse, wolof ak arabe.",ar:"مجموعة «أتعلم ديني» (أحلام، 77 137 10 10). بطاقات تعليمية إسلامية للأطفال والشباب والكبار، بالفرنسية والولفية والعربية."},
ab2:{fr:"Ce site transforme chaque carte du PDF original en fiche numérique interactive : texte sélectionnable, recherche, apprentissage guidé et quiz corrigés.",wo:"Site bi soppi karti PDF bi yëp ci fiches numériques : texte bu meun kopie, seet, jàng gu dëggu ak ndamm yu am correction.",ar:"يحوّل هذا الموقع كل بطاقة من الملف الأصلي إلى بطاقة رقمية تفاعلية: نص قابل للتحديد، وبحث، وتعلّم موجّه، واختبارات مصححة."},
ab3:{fr:"Source unique : le PDF original. Les contenus FR et WO sont conservés fidèlement ; les traductions arabes ont été ajoutées puis validées avec le porteur du projet.",wo:"Source bi : PDF original bi rekk. FR ak WO dañoo des intact ; traduction arabe yi ñoo ko yokk te borom projet bi valider ko.",ar:"المصدر الوحيد: الملف الأصلي. المحتوى الفرنسي والولفي محفوظ بأمانة؛ والترجمات العربية أُضيفت ثم اعتُمدت مع صاحب المشروع."},
ft_nav:{fr:"Naviguer",wo:"Dem",ar:"تصفح"},
ft_act:{fr:"Partager et gérer",wo:"Séddoo ak topp",ar:"مشاركة وإدارة"},
ft_share:{fr:"Copier le lien du site",wo:"Copier lien bi",ar:"نسخ رابط الموقع"},
howt:{fr:"Comment ça marche",wo:"Naka la mu mesmas",ar:"كيف تستعمل الموقع"},
copied:{fr:"Lien copié !",wo:"Lien bi copp na !",ar:"تم نسخ الرابط!"},
theme_night:{fr:"Mode nuit",wo:"Guddi",ar:"الوضع الليلي"},
theme_day:{fr:"Mode jour",wo:"Bëccëg",ar:"الوضع النهاري"},
hdesc:{fr:"Une collection de cartes éducatives islamiques pour les enfants, les jeunes et les adultes : 113 fiches fidèles au guide original, à explorer, apprendre puis tester.",wo:"Benn kolleksiyon karti lislaam ngir xale yi, ndank yi ak mag yi : 113 karti yu dëggu PDF bu mat, ngir jàng, dégg, te saytu sa xam-xam.",ar:"مجموعة بطاقات تعليمية إسلامية للأطفال والشباب والكبار: 113 بطاقة وفية للدليل الأصلي، تكتشفها وتتعلّمها ثم تختبر بها معلوماتك."},
cgtitle:{fr:"Guide des couleurs (PDF, p. 1)",wo:"Guide couleurs (PDF, page 1)",ar:"دليل الألوان (الملف، ص 1)"},
contact:{fr:"Contact",wo:"Jokkoo",ar:"للتواصل"},
abcap:{fr:"La couverture originale de la collection.",wo:"Cover bi bu njëkk.",ar:"غلاف المجموعة الأصلي."},
st_cards:{fr:"Cartes éducatives",wo:"Karti",ar:"بطاقات تعليمية"},
st_cats:{fr:"Catégories",wo:"Xalaat",ar:"فئات"},
st_langs:{fr:"Langues",wo:"Làng yi",ar:"لغات"},
st_pages:{fr:"Pages du guide",wo:"Pages guide bi",ar:"صفحات الدليل"},
s_l_t:{fr:"Un parcours pas à pas",wo:"Ñeenti yoon, ci naax",ar:"مسار تعلّم خطوة بخطوة"},
s_l_d:{fr:"Quatre étapes : des fondations jusqu'au dernier thème du programme.",wo:"Ñeenti yoon : ci ponk yi ba ci xalaat bi mujj.",ar:"أربع مراحل، من الأسس إلى آخر فئات البرنامج."},
nav_espace:{fr:"Espace apprenant",wo:"Espace jàng bi",ar:"مساحة المتعلم"},
es_intro:{fr:"Votre suivi personnel : ce que vous avez appris, ce que vous marquez à revoir, vos quiz et votre avancée dans chaque catégorie.",wo:"Sa suivi bopp : karti yu jàng naa, xoolal, ndamm yi ak sa yoon ci xalaat yi.",ar:"متابعتك الشخصية: ما تعلمته، ما علّمته للمراجعة، نتائج اختباراتك، وتقدمك في كل فئة."},
es_saved:{fr:"✓ Apprise",wo:"✓ Jàng naa",ar:"✓ تم تعلّمها"},
es_markreview:{fr:"Revoir plus tard",wo:"Xoolal naata",ar:"أراجعها لاحقًا"},
es_unreview:{fr:"Retirer de la révision",wo:"Nëbbu xoolal",ar:"إخراج من المراجعة"},
es_t1:{fr:"Ce que j'ai appris",wo:"Karti yu jàng naa",ar:"ما تعلمته"},
es_t2:{fr:"À revoir",wo:"Xoolal",ar:"للمراجعة"},
es_t3:{fr:"Ma progression par catégorie",wo:"Sa yoon ci xalaat yi",ar:"تقدمي في كل فئة"},
es_t4:{fr:"Mes quiz",wo:"Ndamam yi",ar:"اختباراتي"},
es_avg:{fr:"Score moyen",wo:"Moyennu ndam",ar:"متوسط النتيجة"},
es_tot:{fr:"Parcours complété",wo:"Yoon bu mat",ar:"مسار مكتمل"},
es_last:{fr:"Reprendre la dernière carte apprise",wo:"Jokkaloo bi jàng naa",ar:"أكمل من حيث توقفت"},
es_res:{fr:"Reprendre",wo:"Jokkaloo",ar:"متابعة"},
install_btn:{fr:"Installer l\u2019application",wo:"Installer l\u2019application",ar:"تثبيت التطبيق"},
offline_msg:{fr:"Vous \u00eates hors ligne \u2014 le contenu enregistr&eacute; reste accessible.",wo:"Vous \u00eates hors ligne \u2014 le contenu enregistr&eacute; reste accessible.",ar:"أنت تعمل دون اتصال — المحتوى المحفوظ يبقى متاحًا."},
ios_installer_t:{fr:"Installer sur iPhone (Safari)",wo:"Installer sur iPhone (Safari)",ar:"التثبيت على آيفون (سفاري)"},
ios_installer:{fr:"<b>1.</b> Ouvrez ce site avec <b>Safari</b>. <b>2.</b> Touchez l\u2019ic\u00f4ne <b>Partager</b> (le carr\u00e9 avec la fl\u00e8che) en bas de l\u2019\u00e9cran. <b>3.</b> Choisissez <b>\u00ab Sur l\u2019\u00e9cran d\u2019accueil \u00bb</b> puis <b>\u00ab Ajouter \u00bb</b> : l\u2019ic\u00f4ne AK Dreams appara\u00eet sur votre \u00e9cran.",wo:"<b>1.</b> Ouvre ce site avec <b>Safari</b>. <b>2.</b> B\u00e8ss i\u00f4ne <b>Partager</b> ci nd\u00ebkku. <b>3.</b> T\u00e0dd <b>\u00ab Sur l\u2019\u00e9cran d\u2019accueil \u00bb</b> te <b>\u00ab Ajouter \u00bb</b>.",ar:"<b>1.</b> افتح الموقع عبر <b>سفاري</b>. <b>2.</b> اضغط أيقونة <b>المشاركة</b> (المربع والسهام) أسفل الشاشة. <b>3.</b> اختر <b>«إضافة إلى الشاشة الرئيسية»</b> ثم <b>«إضافة»</b> — تظهر أيقونة AK Dreams على شاشتك."},
offline_note:{fr:"La synchronisation du contenu entre appareils (module Admin) n&eacute;cessite une connexion.",wo:"Synchronisation bi naata ak Internet.",ar:"مزامنة المحتوى بين الأجهزة (لوحة الإدارة) تتطلب اتصالًا بالإنترنت."},
es_empty:{fr:"Aucune carte ici pour le moment : commence ta première carte !",wo:"Amul karti ; tambali jàng.",ar:"لا شيء هنا بعد — ابدأ ببطاقتك الأولى!"},
es_emptyq:{fr:"Aucun quiz réussi ou déjà fait : lance ton premier quiz.",wo:"Amul ndamm mu jëffandum.",ar:"لا اختبار ظاهر — ابدأ أول اختبار."},
es_clear:{fr:"Effacer ma progression",wo:"Fàbb sa yoon",ar:"مسح تقدمي"},
es_clear_q:{fr:"Effacer tout votre suivi (cartes apprises, à revoir, quiz) ?",wo:"Fàbb lépp sa suivi ?",ar:"مسح كل التتبع (المتعلم، المراجعة، الاختبارات)؟"}};
const t=k=>((I18N[k]&&I18N[k][LANG])||(I18N[k]&&I18N[k].fr)||k);
function allCards(){const m=new Map((typeof CARDS!=="undefined"?CARDS:[]).map(c=>[c.id,{...c}]));extra.forEach(c=>{if(c._del)m.delete(c.id);else m.set(c.id,{...c})});return[...m.values()].sort((a,b)=>a.id-b.id);}
function catOf(id){return (typeof CATEGORIES!=="undefined"?CATEGORIES:[]).find(x=>x.id===id)||{fr:id,wo:id,color:"#0d5c40"};}
function catName(c){const k=catOf(c);return k[LANG]||k.fr;}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function field(c,base){return c[base+LANG]||c[base+"fr"]||c[base+"wo"]||c[base+"ar"]||"";}
function arMissing(c){return LANG==="ar"&&!(c.qar&&c.aar);}
function cardHTML(c,showA){
 const th=catOf(c.cat);
 const need=c.r===1?`<span class="badge">⚠ ${t("verify")} — p.${c.p} PDF</span>`:"";
 const ar=arMissing(c)?`<p class="ar-missing">⚠ ${t("needar")}</p>`:"";
 return`<article class="card" data-id="${c.id}">
 <div class="cat"><span class="dot" style="background:${th.color}"></span>#${c.id} · ${esc(catName(c.cat))}</div>
 <p class="q"${LANG==="ar"?' lang="ar" dir="rtl"':""}>${esc(field(c,"q"))||"—"}</p>
 ${showA?`<div class="a"${LANG==="ar"?' lang="ar" dir="rtl"':""}>${esc(field(c,"a"))||"—"}</div>`:""}
 ${need}${ar}</article>`;}
function setLang(l){LANG=l;store.set(LS_LANG,l);
 document.querySelectorAll(".langbar button").forEach(b=>b.classList.toggle("on",b.dataset.lang===l));
 try{document.body.dir=l==="ar"?"rtl":"ltr";}catch(e){}
 try{document.documentElement.lang=l;}catch(e){}
 document.querySelectorAll("[data-i]").forEach(el=>{el.textContent=t(el.dataset.i);});
 themeApply(themeGet());
 route();}
function route(){
 const h=(location.hash||"#/").replace(/^#/,"");
 document.querySelectorAll(".nav a[href^='#/']").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+h));
 const v=document.getElementById("view");if(!v)return;
 if(h==="/"||h==="")v.innerHTML=home();
 else if(h==="/cartes"){v.innerHTML=pageCards();bindCards();}
 else if(h==="/categories")v.innerHTML=pageCats();
 else if(h==="/apprendre")learn(LI);
 else if(h==="/quiz")quizStart();
 else if(h==="/espace")v.innerHTML=pageEspace();
 else if(h==="/apropos")v.innerHTML=about();
 try{window.scrollTo(0,0);}catch(e){}}

function home(){const n=allCards().length,nc=CATEGORIES.length;
 const bento=CATEGORIES.map((c,ix)=>{const k=allCards().filter(x=>x.cat===c.id).length;
  return`<a class="tile ${ix===0?"big":""}" href="#/cartes" data-cat="${c.id}"><span class="dot" style="background:${c.color}"></span><span><span class="cn">${esc(catName(c.id))}</span><small>${k} ${t("cardsn")}</small></span></a>`;}).join("");
 return`<section class="hero"><div class="geo g1"></div><div class="geo g2"></div>
 <div class="hero-in">
 <p class="overline"><i></i>AK DREAMS BOOK</p>
 <h1>J’apprends ma religion</h1>
 <p class="t-wo" lang="wo">Maa ngi jàng sama diiné</p>
 <p class="t-ar" lang="ar">أتعلم ديني</p>
 <p class="d">${t("hdesc")}</p>
 <div class="row"><a class="btn roy" href="#/apprendre">${t("cta_start")}</a><a class="btn wl" href="#/cartes">${t("cta_explore")}</a></div>
 </div>
 <div class="stats"><div><b>${n}</b><small>${t("st_cards")}</small></div><div><b>${nc}</b><small>${t("st_cats")}</small></div><div><b>3</b><small>${t("st_langs")}</small></div><div><b>13</b><small>${t("st_pages")}</small></div></div>
 </section>
 <section class="blk"><p class="kicker">${t("nav_cats")}</p><h2 class="t">${t("gtitle")}</h2><p class="d">${t("clead")}</p>
 <div class="bento">${bento}</div></section>
 <section class="blk"><p class="kicker">${t("nav_learn")}</p><h2 class="t">${t("s_l_t")}</h2><p class="d">${t("s_l_d")}</p>
 <div class="paths">${STAGES.map((s,ix)=>{const k=stageCount(s);return`<a class="path stage" href="#/cartes" data-stage="${s.id}"><span class="nb">${ix+1}</span><b>${esc(s.t[LANG]||s.t.fr)}</b><small>${esc(s.d[LANG]||s.d.fr)}</small><span class="n">${k} ${t("cardsn")} →</span></a>`;}).join("")}</div></section>
 <section class="blk"><p class="kicker">${t("nav_quiz")}</p><h2 class="t">${t("p2t")}</h2><p class="d">${t("p2d")}</p>
 <div class="quizbl">
 <div class="qcard"><h3>Quiz · 10</h3><p>${t("hlead")}</p><div class="row"><a class="btn sky" href="#/quiz">${t("nav_quiz")} →</a></div></div>
 <div class="exc">${HOW.map(h=>`<a href="#/apprendre"><span class="ic">✦</span><span><b>${esc(h.t[LANG]||h.t.fr)}</b><small>${esc(h.d[LANG]||h.d.fr)}</small></span></a>`).join("")}</div>
 </div></section>
 <section class="blk"><div class="aboutb"><div>
 <p class="kicker">AK DREAMS BOOK</p><h2>${t("nav_about")}</h2>
 <p><b>${t("ab1")}</b></p><p>${t("ab2")}</p>
 <div class="row" style="margin-top:8px"><a class="btn ghost" href="#/apropos">${t("nav_about")} →</a><button class="btn ghost" type="button" data-share>${t("ft_share")}</button></div>
 </div>
 <div class="statnum"><b>113</b><small>${t("foot")}</small></div>
 </div></section>`;}

/* Parcours guidé : regroupe les 13 catégories du PDF en 4 étapes (organisation propre au site). */
const STAGES=[
 {id:"s1",cats:["fondements"],t:{fr:"Les fondations",wo:"Ponki yi",ar:"الأسس"},d:{fr:"La foi, ses piliers et ce qui structure la religion.",wo:"Geum, ponk yi ak li tabbit diiné.",ar:"الإيمان وأركانه وما تُبنى عليه العقيدة."}},
 {id:"s2",cats:["uluhiyya","tawhid"],t:{fr:"Connaître Allah",wo:"Xam Yàlla",ar:"معرفة الله"},d:{fr:"Qui est Allah, Son unicité et Ses noms.",wo:"Kan mooy Yàlla, bennam ak turam.",ar:"من هو الله، وتوحيده وأسماؤه."}},
 {id:"s3",cats:["anges","livres","messagers","prophete","hadith","sunna"],t:{fr:"La révélation et ses porteurs",wo:"Xeet yi ak ñi ko indi",ar:"الوحي وحملته"},d:{fr:"Anges, Livres, messagers, Prophète ﷺ, hadith et Sunna.",wo:"Malaa'ika, téere yi, yonent yi, Yonent bi ﷺ, hadith ak Sunna.",ar:"الملائكة والكتب والرسل والنبي ﷺ والحديث والسنة."}},
 {id:"s4",cats:["jugement","qadar","samiyyat","famille"],t:{fr:"Croire jusqu'au Jour dernier",wo:"Geum ba Bés bu Muji",ar:"الإيمان إلى اليوم الآخر"},d:{fr:"Jugement, destin, monde invisible, famille et compagnons.",wo:"Atté, ndoggal, luñu mën gisul, njaboot ak Sahaba.",ar:"الحساب والقدر والغيبيات والآل والصحابة."}}
];
const HOW=[
 {t:{fr:"Choisis ta langue",wo:"Tànnal sa làmmiñ",ar:"اختر لغتك"},d:{fr:"Français, wolof ou arabe, en un clic, sur toutes les pages.",wo:"Falaŋse, wolof walla arabe, ci benn bëss, ci page yëp.",ar:"الفرنسية أو الولفية أو العربية، بنقرة واحدة في كل الصفحات."}},
 {t:{fr:"Apprends à ton rythme",wo:"Jàngal sa taat",ar:"تعلّم على وتيرتك"},d:{fr:"Une carte à la fois : question, réponse, catégorie et progression.",wo:"Benn karti : lathie, tontu, xalaat ak progression.",ar:"بطاقة واحدة في كل مرة: سؤال وجواب وفئة وتقدّم."}},
 {t:{fr:"Teste tes connaissances",wo:"Saytu sa xam-xam",ar:"اختبر معلوماتك"},d:{fr:"Des quiz corrigés de dix questions pour ancrer les savoirs.",wo:"Ndamm fukki lathie yu am correction ngir dëggal xam-xam.",ar:"اختبارات مصححة من عشرة أسئلة لتثبيت المعارف."}}
];
let F={q:"",cat:"",stage:null};function stageOf(id){return STAGES.find(s=>s.id===id)||null;}
function stageCount(s){return allCards().filter(c=>s.cats.indexOf(c.cat)>=0).length;}
function stageChip(){const s=stageOf(F.stage);if(!s)return"";return`<button class="stchip" id="stx" type="button">✕ ${esc(s.t[LANG]||s.t.fr)}</button>`;}
function pageCards(){return`<section class="panel"><div class="toolbar"><input id="q" placeholder="${esc(t("search"))}" value="${esc(F.q)}"><select id="fc"><option value="">${esc(t("allcats"))}</option>${CATEGORIES.map(c=>`<option value="${c.id}"${F.cat===c.id?" selected":""}>${esc(catName(c.id))}</option>`).join("")}</select>${F.stage?stageChip():""}</div>
 <div id="cnt"></div><div class="grid" id="grid"></div></section>`;}
function bindCards(){
 const grid=document.getElementById("grid");if(!grid)return;
 const draw=()=>{
  const list=allCards().filter(c=>(!F.cat||c.cat===F.cat)&&(!F.stage||(stageOf(F.stage)&&stageOf(F.stage).cats.indexOf(c.cat)>=0))&&(!F.q||((c.qfr||"")+" "+(c.afr||"")+" "+(c.qwo||"")+" "+(c.awo||"")+" "+(c.qar||"")+" "+(c.aar||"")).toLowerCase().includes(F.q.toLowerCase())));
  grid.innerHTML=list.map(c=>cardHTML(c,false)).join("")||"<p>—</p>";
  document.getElementById("cnt").innerHTML=`<b>${list.length} / ${allCards().length}</b>`;
  grid.querySelectorAll(".card").forEach(el=>{el.addEventListener("click",()=>{const c=allCards().find(x=>String(x.id)===String(el.dataset.id));if(!c)return;const open=!!el.querySelector(".a");el.outerHTML=cardHTML(c,!open);rebind();});});
 };
 const rebind=()=>{grid.querySelectorAll(".card").forEach(el=>{el.addEventListener("click",()=>{const c=allCards().find(x=>String(x.id)===String(el.dataset.id));if(!c)return;const open=!!el.querySelector(".a");el.outerHTML=cardHTML(c,!open);rebind();});});};
 document.getElementById("q").addEventListener("input",e=>{F.q=e.target.value;draw();});
 document.getElementById("fc").addEventListener("change",e=>{F.cat=e.target.value;draw();});
 const sx=document.getElementById("stx");if(sx)sx.addEventListener("click",()=>{F.stage=null;route();});
 draw();}
function pageCats(){const all=allCards();return`<section class="panel"><h2 class="sec">${t("nav_cats")}</h2>
 <p class="lead">${t("clead")}</p>
 <div class="cats">${CATEGORIES.map(c=>{const k=all.filter(x=>x.cat===c.id).length;return`<a class="catcard" href="#/cartes" data-cat="${c.id}"><span class="dot" style="background:${c.color}"></span><span><span class="cn">${esc(catName(c.id))}</span><small>${k} ${t("cardsn")}</small></span></a>`;}).join("")}</div></section>
 <section class="panel"><h2 class="sec">${t("cgtitle")}</h2>
 <ul class="guide">${CATEGORIES.map(c=>`<li><span class="dot" style="background:${c.color}"></span>${esc(c.fr)}<br><small style="color:var(--muted)">${esc(c.wo)} ${c.ar?" · "+esc(c.ar):""}</small></li>`).join("")}</ul></section>`;}
let LI=0,LOpen=false;
function learn(i){const all=allCards();if(!all.length)return;LI=((i%all.length)+all.length)%all.length;const c=all[LI];const v=document.getElementById("view");if(!v)return;
 const pct=Math.round(((LI+1)/all.length)*100);
 v.innerHTML=`<section class="panel learn">
 <div class="learn-top"><span class="crumb"><span class="dot" style="background:${catOf(c.cat).color};display:inline-block"></span> ${esc(catName(c.cat))} · p.${c.p} PDF</span><span class="count">${LI+1} / ${all.length}</span></div>
 <div class="progress"><i style="width:${pct}%"></i></div>
 <article class="learn-card">
 <p class="lq"${LANG==="ar"?' lang="ar" dir="rtl"':""}>${esc(field(c,"q"))}</p>
 <div class="ldiv"><span></span><i>✦</i><span></span></div>
 ${LOpen?`<div class="la"${LANG==="ar"?' lang="ar" dir="rtl"':""}>${esc(field(c,"a"))}</div>`:`<p class="lead" style="text-align:center">${t("show")}</p>`}
 </article>
 ${LOpen&&isLearned(String(c.id))?`<p class="chipok">✓ ${t("es_saved")}</p>`:""}${arMissing(c)?`<p class="ar-missing">⚠ ${t("needar")}</p>`:""}${c.r===1?`<p><span class="badge">⚠ ${t("verify")}</span></p>`:""}
 <div class="row"><button class="btn ghost" id="lp" type="button">${t("prev")}</button><button class="btn gold" id="lo" type="button">${LOpen?t("hide"):t("show")}</button><button class="btn alt" id="ln" type="button">${t("next")}</button>${LOpen?`<button class="btn light" id="lr" type="button">${isReview(String(c.id))?t("es_unreview"):t("es_markreview")}</button>`:""}</div></section>`;
 document.getElementById("lp").addEventListener("click",()=>{LOpen=false;learn(LI-1);});
 document.getElementById("ln").addEventListener("click",()=>{LOpen=false;learn(LI+1);});
 document.getElementById("lo").addEventListener("click",()=>{const was=LOpen;LOpen=!was;if(!was)markLearned(String(c.id));learn(LI);});
 const lr=document.getElementById("lr");if(lr)lr.addEventListener("click",()=>{if(isReview(String(c.id))){delete PROG.review[String(c.id)];progSave();}else markReview(String(c.id));learn(LI);});
}
let QI=0,QScore=0,Qs=[];
function quizStart(){const pool=[...allCards()];Qs=pool.sort(()=>Math.random()-.5).slice(0,10).map(c=>{const others=pool.filter(x=>x.id!==c.id&&x.cat===c.cat);const distract=((others.length?others:pool.filter(x=>x.id!==c.id))).sort(()=>Math.random()-.5).slice(0,3).map(x=>field(x,"a"));
 const opts=[field(c,"a"),...distract].sort(()=>Math.random()-.5);return{c,opts};});QI=0;QScore=0;quizDraw();}
function quizDraw(){const v=document.getElementById("view");if(!v)return;
 if(QI>=Qs.length){v.innerHTML=`<section class="panel learn"><div class="score-big"><b>${t("score")} : ${QScore} / ${Qs.length}</b></div>
  <div class="progress"><i style="width:${Qs.length?Math.round((QScore/Qs.length)*100):0}%"></i></div>
  <div class="row"><button class="btn gold" id="rq" type="button">${t("retry")}</button><a class="btn light" href="#/cartes">${t("nav_cards")}</a></div></section>`;
  quizSave(QScore,Qs.length);document.getElementById("rq").addEventListener("click",quizStart);return;}
 const item=Qs[QI],c=item.c,opts=item.opts;
 const pct=Math.round((QI/Qs.length)*100);
 v.innerHTML=`<section class="panel learn">
 <div class="learn-top"><span class="crumb">${t("qword")} ${QI+1} / ${Qs.length}</span><span class="count">${t("score")} : ${QScore}</span></div>
 <div class="progress"><i style="width:${pct}%"></i></div>
 <h3${LANG==="ar"?' lang="ar" dir="rtl"':""}>${esc(field(c,"q"))}</h3>
 ${opts.map(o=>`<button class="quizopt" type="button">${esc(o)}</button>`).join("")}</section>`;
 v.querySelectorAll(".quizopt").forEach(b=>b.addEventListener("click",()=>{const good=b.textContent.trim()===String(field(c,"a")).trim();
  v.querySelectorAll(".quizopt").forEach(x=>{if(x.textContent.trim()===String(field(c,"a")).trim())x.classList.add("ok");});
  if(!good)b.classList.add("ko");else QScore++;setTimeout(()=>{QI++;quizDraw();},900);}));}
function pageEspace(){const all=allCards();const n=all.length;if(!n)return"";const woc=String.fromCharCode(160);
 const learned=all.filter(c=>isLearned(String(c.id))).sort((a,b)=>(PROG.learned[String(b.id)]||0)-(PROG.learned[String(a.id)]||0));
 const review=all.filter(c=>isReview(String(c.id))).sort((a,b)=>(PROG.review[String(b.id)]||0)-(PROG.review[String(a.id)]||0));
 const totPct=n?Math.round(learned.length/n*100):0;
 const avg=quizHist.length?Math.round(quizHist.reduce((s,q)=>s+(q.t?(q.s/q.t):0),0)/quizHist.length*100):0;
 const last=learned.length?learned[0]:null;const lastIdx=last?all.findIndex(x=>x.id===last.id):-1;
 const list=(arr,tag,cls)=>arr.map(c=>{const i=all.findIndex(x=>x.id===c.id);return`<a class="es-item" href="#/apprendre" data-learn="${i}"><span class="dot" style="background:${catOf(c.cat).color}"></span><span class="q">${esc(field(c,"q"))}</span><span class="es-tag ${cls}">${tag}</span></a>`;}).join("");
 return`<section class="blk"><div class="eswrap">
 <p class="kicker">AK DREAMS BOOK · ${t("nav_espace")}</p>
 <h2 class="t">${LANG==="ar"?"مساحة المتعلم":LANG==="wo"?"Espace jàng bi":"Espace apprenant"}</h2>
 <p class="d">${t("es_intro")}</p>
 <div class="ovtiles">
 <div class="ovt"><b>${learned.length}</b><small>${t("es_t1")}</small></div>
 <div class="ovt"><b>${review.length}</b><small>${t("es_t2")}</small></div>
 <div class="ovt"><b>${avg}%</b><small>${t("es_avg")}</small></div>
 <div class="ovt"><b>${totPct}%</b><small>${t("es_tot")}</small></div>
 </div>
 ${last?`<div class="resume"><div><b>${t("es_last")}</b><span class="q">${esc(field(last,"q"))}</span></div><a class="btn roy" href="#/apprendre" data-learn="${lastIdx}">${t("es_res")}</a></div>`:""}
 <section class="blk"><h2 class="t">${t("es_t3")}</h2>
 <div class="panel pcpanel">${CATEGORIES.map(c=>{const g=catProg()[c.id]||{n:0,k:0};const p=g.n?Math.round(g.k/g.n*100):0;return`<div class="pcrow"><span class="cn">${esc(catName(c.id))}</span><span class="pbar"><i style="width:${p}%"></i></span><span class="pc">${p}% · ${g.k}/${g.n}</span></div>`;}).join("")}</div></section>
 <section class="blk"><div class="es-grid">
 <div><h2 class="t sm">${t("es_t1")}</h2>${learned.length?`<div class="es-list">${list(learned,t("es_saved").replace("✓ ",""),"ok")}</div>`:`<p class="empty">${t("es_empty")}</p>`}</div>
 <div><h2 class="t sm">${t("es_t2")}</h2>${review.length?`<div class="es-list">${list(review,t("es_t2"),"rev")}</div>`:`<p class="empty">${t("es_empty")}</p>`}</div>
 </div></section>
 <section class="blk"><h2 class="t sm">${t("es_t4")}</h2>
 ${quizHist.length?`<div class="panel pcpanel"><div class="es-list">${quizHist.map(q=>`<div class="es-item"><span class="ic">✦</span><span><b>${new Date(q.d).toLocaleDateString(LANG==="ar"?"ar-EG":(LANG==="wo"?"ff-SN":"fr-FR"))}</b><small>${q.s} / ${q.t} ✱ ${Math.round((q.s/(q.t||1))*100)}%</small></span></div>`).join("")}</div></div>`:`<p class="empty">${t("es_emptyq")}</p>`}
 </section>
 <section class="blk"><button class="btn ghost cleardanger" type="button" data-clear>${t("es_clear")}</button></section>
 </div></section>`;}
/* --- Suivi de progression (Espace apprenant) — localStorage uniquement --- */
const LS_PROG="akdreams_prog_v1",LS_QHIST="akdreams_quiz_v1";
let PROG={learned:{},review:{}};
try{const _pr=JSON.parse(store.get(LS_PROG,'{"learned":{},"review":{}}')||"{}");if(_pr&&_pr.learned&&_pr.review)PROG=_pr;}catch(e){PROG={learned:{},review:{}};}
if(!PROG.learned)PROG.learned={};if(!PROG.review)PROG.review={};
function progSave(){store.set(LS_PROG,JSON.stringify(PROG));}
function isLearned(id){return !!PROG.learned[id];}
function isReview(id){return !!PROG.review[id];}
function markLearned(id){if(isReview(id))delete PROG.review[id];PROG.learned[id]=Date.now();progSave();}
function markReview(id){if(isLearned(id))delete PROG.learned[id];PROG.review[id]=Date.now();progSave();}
function clearProg(){PROG={learned:{},review:{}};progSave();store.set(LS_QHIST,"[]");quizHist=[];}
let quizHist=[];
try{const _qh=JSON.parse(store.get(LS_QHIST,"[]")||"[]");if(Array.isArray(_qh))quizHist=_qh;}catch(e){quizHist=[];}
function quizSave(score,total){quizHist.unshift({d:new Date().toISOString(),s:score,t:total});if(quizHist.length>20)quizHist.length=20;store.set(LS_QHIST,JSON.stringify(quizHist));}
function catProg(){const all=allCards();const out={};
 CATEGORIES.forEach(c=>{const cs=all.filter(x=>x.cat===c.id);const k=cs.filter(x=>isLearned(String(x.id))).length;out[c.id]={n:cs.length,k:k};});return out;}
function about(){return`<section class="blk"><div class="aboutb" style="align-items:start">
 <div><p class="kicker">AK DREAMS BOOK</p><h2>${t("nav_about")}</h2>
 <p><b>${t("ab1")}</b></p><p>${t("ab2")}</p><p>${t("ab3")}</p>
 <p style="margin-top:14px"><b>${t("contact")} :</b> AK Dreams Book — Ahlam · 77 137 10 10.</p>
 <div class="row" style="margin-top:10px"><button class="btn roy" type="button" data-share>${t("ft_share")}</button><a class="btn ghost" href="#/cartes">${t("cta_explore")}</a></div></div>
 <div class="statnum"><b>113</b><small>${t("foot")}</small><small style="margin-top:10px">FR · WO · AR — PDF 13 pages</small></div>
 </div></section>`;}
document.querySelectorAll(".langbar button").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
window.addEventListener("hashchange",route);
document.querySelectorAll(".nav a[href^='#/']").forEach(a=>a.addEventListener("click",e=>{const href=a.getAttribute("href");if(href&&href.startsWith("#/")){e.preventDefault();location.hash=href.slice(1);if(document.getElementById("mainNav"))document.getElementById("mainNav").classList.remove("open");route();}}));
document.addEventListener("click",e=>{if(!e.target||!e.target.closest)return;
 const a=e.target.closest('a.catcard[href="#/cartes"],a.tile[href="#/cartes"]');if(a&&a.dataset&&a.dataset.cat){F.cat=a.dataset.cat;}
 const st=e.target.closest('a.stage[href="#/cartes"]');if(st&&st.dataset&&st.dataset.stage){F.stage=st.dataset.stage;F.cat="";}
 const sh=e.target.closest('[data-share]');if(sh){shareLink(sh);}
 const le=e.target.closest('[data-learn]');if(le){LI=Number(le.dataset.learn);LOpen=false;}
 const cl=e.target.closest('[data-clear]');if(cl){const msg=t("es_clear_q");if(window.confirm(msg)){clearProg();route();}}});
const TH_KEY="akdreams_theme";
function themeGet(){return store.get(TH_KEY,"light")||"light";}
function themeApply(m){try{document.body.classList.toggle("dark",m==="dark");}catch(e){}
 const b=document.getElementById("themeBtn");if(b){const dark=m==="dark";b.textContent=dark?"\u2600":"\u263E";b.title=dark?t("theme_day"):t("theme_night");b.setAttribute("aria-label",b.title);}}
function themeToggle(){const next=themeGet()==="dark"?"light":"dark";store.set(TH_KEY,next);themeApply(next);}
function shareLink(btn){const url=String(location.href).split("#")[0];
 const done=()=>{const old=btn.textContent;btn.textContent=t("copied");setTimeout(()=>{btn.textContent=old;},1600);};
 try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(done,done);}else{fallbackCopy(url);done();}}catch(e){try{fallbackCopy(url);}catch(_){}done();}}
function fallbackCopy(txt){const ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");}catch(e){}document.body.removeChild(ta);}
(function(){const b=document.getElementById("themeBtn");if(b)b.addEventListener("click",themeToggle);})();
(function(){const m=document.getElementById("menuBtn");if(m)m.addEventListener("click",()=>{const nv=document.getElementById("mainNav");if(nv)nv.classList.toggle("open");});})();
themeApply(themeGet());
setLang(LANG||"fr");

/* ================= PWA : installation + hors ligne ================= */
const _ffa=document.createElement("div");_ffa.hidden=true;
let _installEv=null;
(function(){
 const w=document.getElementById("installWrap"),b=document.getElementById("installBtn");
 function openIosPanel(){
  let ol=document.getElementById("osPanel");
  if(!ol){ol=document.createElement("div");ol.id="osPanel";ol.innerHTML='<div class="osb"><button class="osx" type="button" aria-label="Fermer">×</button><h3></h3><p'+" lang>&#160;</p></div>";document.body.appendChild(ol);
   ol.querySelector(".osx").addEventListener("click",()=>ol.classList.remove("on"));}
  ol.querySelector("h3").textContent=t("ios_installer_t");
  ol.querySelector("p").innerHTML=t("ios_installer");
  ol.classList.add("on");
 }
 if(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches){return;}
 window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();_installEv=e;w.style.display="inline";});
 setTimeout(()=>{const isIos=/iphone|ipad|ipod/i.test(navigator.userAgent)||(/Macintosh/i.test(navigator.platform)&&navigator.maxTouchPoints>1);
  if(isIos&&navigator.standalone!==true)w.style.display="inline";},900);
 if(b)b.addEventListener("click",()=>{
  if(_installEv){_installEv.prompt();_installEv.userChoice.then(()=>{_installEv=null;w.style.display="none";});}
  else openIosPanel();
 });
})();
/* indicateur hors ligne */
(function(){
 function apply(){
  let tag=document.getElementById("offlineTag");
  const off=!navigator.onLine;
  if(off){
   if(!tag){tag=document.createElement("div");tag.id="offlineTag";document.body.appendChild(tag);}
   tag.innerHTML='<span></span>'+t("offline_msg");
   tag.setAttribute("role","status");
  }else{if(tag)tag.remove();}
 }
 function langRef(){const tag=document.getElementById("offlineTag");if(tag)tag.innerHTML='<span></span>'+t("offline_msg");}
 window.addEventListener("online",apply);window.addEventListener("offline",apply);
 window.addEventListener("appinstalled",()=>{try{document.getElementById("installWrap").style.display="none";}catch(e){}});
 document.querySelectorAll(".langbar button").forEach(function(b){b.addEventListener("click",langRef);});
 apply();
})();
