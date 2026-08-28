const products=[
 {id:'social',title:'Social Media Post Templates',category:'Templates',type:'CANVA · 240 POSTS',license:'PLR',image:'01-social-media.jpg'},
 {id:'marketing',title:'Digital Marketing Strategy Guide',category:'E-books',type:'PDF · 86 PAGES',license:'PLR',image:'02-marketing.jpg'},
 {id:'reels',title:'1,000+ Reels Content Bundle',category:'Social Media',type:'MP4 · ZIP',license:'MRR',image:'03-reels.jpg'},
 {id:'business',title:'Business Plan Workbook',category:'E-books',type:'PDF · 74 PAGES',license:'PLR',image:'04-business.jpg'},
 {id:'email',title:'Email Marketing Templates',category:'Templates',type:'DOCX · 60 EMAILS',license:'PLR',image:'05-email.jpg'},
 {id:'mindset',title:'Mindset & Habits Mastery',category:'E-books',type:'PDF · 114 PAGES',license:'MRR',image:'06-mindset.jpg'},
 {id:'website',title:'Website Templates Bundle',category:'Templates',type:'HTML · ZIP',license:'COMMERCIAL',image:'07-website.jpg'},
 {id:'youtube',title:'YouTube Thumbnail Templates',category:'Design',type:'PSD · 120 FILES',license:'PLR',image:'08-youtube.jpg'}
];
// Reading localStorage THROWS outright when site data is blocked (Safari
// private mode, "block cookies", some embedded webviews), and JSON.parse
// throws on a corrupted value. Unguarded, either killed the script and the
// product grid rendered nothing at all. Favourites are a convenience, so
// degrade to "no favourites" instead of taking the page down.
const store={
  get:(key)=>{try{const v=localStorage.getItem(key);const p=v?JSON.parse(v):[];return Array.isArray(p)?p:[]}catch{return[]}},
  set:(key,v)=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{/* storage unavailable or full; not worth surfacing */}}
};
// Escape anything interpolated into markup. The catalogue is hardcoded
// today, but phase 3 feeds these cards from Supabase; escaping now means
// that port cannot introduce an injection. Also fixes the raw & in titles
// like "Mindset & Habits Mastery" landing in alt="" and aria-label="".
// Plain-string counterpart to `store`, for the cookie choice. Same reason:
// touching localStorage at all can throw when site data is blocked, and an
// unguarded banner took the landing page's script down with it.
const raw={
  get:(key)=>{try{return localStorage.getItem(key)}catch{return null}},
  set:(key,v)=>{try{localStorage.setItem(key,v)}catch{/* nothing to do */}}
};
const esc=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function favorites(){return store.get('exhale-favorites')}function toggleFavorite(id){const f=favorites();store.set('exhale-favorites',f.includes(id)?f.filter(x=>x!==id):[...f,id]);renderProducts()}
function card(p){const fav=favorites().includes(p.id);const id=esc(p.id),title=esc(p.title);return `<article class="card product" data-product="${id}"><button class="heart ${fav?'is-favorite':''}" aria-label="Save ${title}" onclick="toggleFavorite('${id}')">${fav?'♥':'♡'}</button><img src="${esc(asset(p.image))}" alt="${title}"><div class="product-content"><div class="badge">${esc(p.license)}</div><h3>${title}</h3><small>${esc(p.type)}</small></div></article>`}
function asset(file){return window.location.pathname.includes('/app/')?'../../assets/products/'+file:'assets/products/'+file}
function renderProducts(){const target=document.querySelector('[data-product-grid]');if(!target)return;const q=(document.querySelector('[data-product-search]')?.value||'').toLowerCase();const cat=document.querySelector('.chip.active')?.dataset.category||'All';target.innerHTML=products.filter(p=>(cat==='All'||p.category===cat)&&`${p.title} ${p.category} ${p.type}`.toLowerCase().includes(q)).map(card).join('')||'<p class="empty">No products match that search yet.</p>'}
function setupCatalog(){const input=document.querySelector('[data-product-search]');input?.addEventListener('input',renderProducts);document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');renderProducts()}));renderProducts()}
function renderCollection(){const target=document.querySelector('[data-collection]');if(!target)return;const f=favorites();target.innerHTML=f.length?products.filter(p=>f.includes(p.id)).map(card).join(''):'<p class="empty">Your saved products will appear here. Use the heart on any product in the Vault to add one.</p>'}
function setupCookie(){const b=document.querySelector('[data-cookie]');if(!b||raw.get('exhale-cookie'))return;b.hidden=false;b.querySelectorAll('button').forEach(x=>x.onclick=()=>{raw.set('exhale-cookie',x.dataset.choice);b.hidden=true})}
document.addEventListener('DOMContentLoaded',()=>{setupCatalog();renderCollection();setupCookie()});
