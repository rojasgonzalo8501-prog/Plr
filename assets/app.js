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
const store={get:(key)=>JSON.parse(localStorage.getItem(key)||'[]'),set:(key,v)=>localStorage.setItem(key,JSON.stringify(v))};
function favorites(){return store.get('exhale-favorites')}function toggleFavorite(id){const f=favorites();store.set('exhale-favorites',f.includes(id)?f.filter(x=>x!==id):[...f,id]);renderProducts()}
function card(p){const fav=favorites().includes(p.id);return `<article class="card product" data-product="${p.id}"><button class="heart ${fav?'is-favorite':''}" aria-label="Save ${p.title}" onclick="toggleFavorite('${p.id}')">${fav?'♥':'♡'}</button><img src="${asset(p.image)}" alt="${p.title}"><div class="product-content"><div class="badge">${p.license}</div><h3>${p.title}</h3><small>${p.type}</small></div></article>`}
function asset(file){return window.location.pathname.includes('/app/')?'../../assets/products/'+file:'assets/products/'+file}
function renderProducts(){const target=document.querySelector('[data-product-grid]');if(!target)return;const q=(document.querySelector('[data-product-search]')?.value||'').toLowerCase();const cat=document.querySelector('.chip.active')?.dataset.category||'All';target.innerHTML=products.filter(p=>(cat==='All'||p.category===cat)&&`${p.title} ${p.category} ${p.type}`.toLowerCase().includes(q)).map(card).join('')||'<p class="empty">No products match that search yet.</p>'}
function setupCatalog(){const input=document.querySelector('[data-product-search]');input?.addEventListener('input',renderProducts);document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');renderProducts()}));renderProducts()}
function renderCollection(){const target=document.querySelector('[data-collection]');if(!target)return;const f=favorites();target.innerHTML=f.length?products.filter(p=>f.includes(p.id)).map(card).join(''):'<p class="empty">Your saved products will appear here. Use the heart on any product in the Vault to add one.</p>'}
function setupCookie(){const b=document.querySelector('[data-cookie]');if(!b||localStorage.getItem('exhale-cookie'))return;b.hidden=false;b.querySelectorAll('button').forEach(x=>x.onclick=()=>{localStorage.setItem('exhale-cookie',x.dataset.choice);b.hidden=true})}
document.addEventListener('DOMContentLoaded',()=>{setupCatalog();renderCollection();setupCookie()});
