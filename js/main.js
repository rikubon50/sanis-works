// SANIS WORKS — サイト共通スクリプト

// ヘッダー：スクロールで影をつける
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ハンバーガーメニュー
const burger = document.getElementById('burger');
const nav = document.getElementById('global-nav');
const closeMenu = () => {
  nav.classList.remove('is-open');
  burger.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'メニューを開く');
};
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});
// メニュー内リンクを押したら閉じる
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
// メニューの外側をタップ・クリックしたら閉じる
document.addEventListener('click', (e) => {
  if (!nav.classList.contains('is-open')) return;
  if (nav.contains(e.target) || burger.contains(e.target)) return;
  closeMenu();
});
// Escキーでも閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
});

// スクロールで要素をふわっと表示
const targets = document.querySelectorAll(
  '.section__title, .about__grid, .value-card, .service-card, .plan-card, .reason-item, .contact__form, .cta-band__inner'
);
targets.forEach((el) => el.classList.add('fade-up'));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
targets.forEach((el) => io.observe(el));

// フッターの年号
document.getElementById('year').textContent = new Date().getFullYear();
