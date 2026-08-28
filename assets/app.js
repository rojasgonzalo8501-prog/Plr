const products=[
 {id:'hd-stock-video',title:'HD Stock Video Footage',category:'Video',type:'MP4 · 61.2 GB',license:'PLR',image:'hd-stock-video.svg'},
 {id:'music-producer-bundles',title:'Music Producer Bundles',category:'Audio',type:'WAV/MIDI · 23.4 GB',license:'MRR',image:'music-producer-bundles.svg'},
 {id:'after-effects-assets',title:'After Effects Assets',category:'Video',type:'AEP · 23.1 GB',license:'PLR',image:'after-effects-assets.svg'},
 {id:'audio-track-bundles',title:'Audio Track Bundles',category:'Audio',type:'MP3/WAV · 8.9 GB',license:'PLR',image:'audio-track-bundles.svg'},
 {id:'infographic-bundles',title:'Infographic Bundles',category:'Design',type:'AI/PSD · 7.6 GB',license:'PLR',image:'infographic-bundles.svg'},
 {id:'brochure-flyer-templates',title:'Brochure & Flyer Kit',category:'Templates',type:'INDD/PSD · 6.9 GB',license:'PLR',image:'brochure-flyer-templates.svg'},
 {id:'article-bundles',title:'Article Bundles',category:'Content',type:'DOCX/TXT · 6.9 GB',license:'PLR',image:'article-bundles.svg'},
 {id:'tv-frame-artwork',title:'TV Frame Artwork',category:'Design',type:'JPG/PNG · 5.0 GB',license:'COMMERCIAL',image:'tv-frame-artwork.svg'},
 {id:'coreldraw-templates',title:'CorelDraw Templates',category:'Templates',type:'CDR · 3.4 GB',license:'PLR',image:'coreldraw-templates.svg'},
 {id:'photoshop-brush-bundles',title:'Photoshop Brushes',category:'Design',type:'ABR · 2.6 GB',license:'PLR',image:'photoshop-brush-bundles.svg'},
 {id:'overlay-bundles',title:'Overlay Bundles',category:'Video',type:'MOV/PNG · 794 MB',license:'PLR',image:'overlay-bundles.svg'},
 {id:'photoshop-action-bundles',title:'Photoshop Actions',category:'Design',type:'ATN · 362 MB',license:'PLR',image:'photoshop-action-bundles.svg'},
 {id:'legal-business-templates',title:'Legal & Business Docs',category:'Templates',type:'DOCX · 10.1 MB',license:'COMMERCIAL',image:'legal-business-templates.svg'},
 {id:'ai-tools-database',title:'AI Tools Database',category:'Content',type:'XLSX · 1.4 MB',license:'PLR',image:'ai-tools-database.svg'},
 {id:'social-media-templates',title:'Social Media Templates',category:'Templates',type:'PSD/CANVA · 344 KB',license:'PLR',image:'social-media-templates.svg'}
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
