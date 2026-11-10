const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionButton = document.querySelector('#motion');
const loop = document.querySelector('#community-loop');
function setMotion() {
 document.documentElement.classList.toggle('paused', paused);
 motionButton.textContent = paused ? 'Enable motion' : 'Pause motion';
 motionButton.setAttribute('aria-pressed', String(paused));
 loop.src = paused ? 'assets/main.jpg' : 'assets/community.gif';
 if (paused) { document.querySelector('video').pause(); document.querySelectorAll('.hero-photo,.statement>img').forEach(img => img.style.transform = 'none'); }
}
setMotion();
motionButton.addEventListener('click', () => { paused = !paused; setMotion(); });
if (!paused) document.documentElement.classList.add('js-motion');
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: .08});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
let framePending = false;
window.addEventListener('scroll', () => { if (paused || framePending) return; framePending = true; requestAnimationFrame(() => { document.querySelectorAll('.hero-photo,.statement>img').forEach(img => { const rect = img.parentElement.getBoundingClientRect(); if(rect.bottom > 0 && rect.top < innerHeight) img.style.transform = `translateY(${Math.max(-70,Math.min(70,-rect.top * .16))}px)`; }); framePending = false; }); }, {passive:true});
const dialog = document.querySelector('#lightbox');
document.querySelectorAll('.gallery button').forEach(button => button.addEventListener('click', () => { dialog.querySelector('img').src = 'assets/' + button.dataset.image; dialog.querySelector('img').alt = button.dataset.caption; dialog.querySelector('p').textContent = button.dataset.caption; dialog.showModal(); }));
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) {const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();} });
document.querySelector('#contact-form').addEventListener('submit', event => { event.preventDefault(); const data = new FormData(event.target); const body = `Hello Beyond Barriers Foundation,\n\n${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`; location.href = `mailto:marabeyondbarriers@gmail.com?subject=${encodeURIComponent(data.get('topic'))}&body=${encodeURIComponent(body)}`; });
document.querySelector('#year').textContent = new Date().getFullYear();
