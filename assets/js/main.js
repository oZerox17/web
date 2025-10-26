// =====================================
// THEME
// =====================================
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const theme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);

function toggleTheme(){
  const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', now);
  localStorage.setItem('theme', now);
}
window.toggleTheme = toggleTheme;

// =====================================
// ACTIVE NAV HIGHLIGHT
// =====================================
const path = location.pathname.split('/').pop() || "index.html";
document.querySelectorAll('.menu a').forEach(a=>{
  const href = a.getAttribute('href');
  if(href === path){ a.classList.add('active') }
});

// =====================================
// NAV INDICATOR (ZERO FLICKER)
// =====================================
let indicator = document.querySelector('.nav-indicator');

function moveIndicator(){
  const active = document.querySelector(".menu a.active");
  if(!active || !indicator) return;

  const rect = active.getBoundingClientRect();
  indicator.style.width = rect.width + "px";
  indicator.style.left = active.offsetLeft + "px";
}

// Debounce resize/orientation
function scheduleIndicator(){
  cancelAnimationFrame(scheduleIndicator.rid);
  scheduleIndicator.rid = requestAnimationFrame(moveIndicator);
}
window.addEventListener("resize", scheduleIndicator);
window.addEventListener("orientationchange", scheduleIndicator);

// =====================================
// AUTO-HIDE NAV + SHRINK
// =====================================
(function(){
  const nav = document.querySelector('.nav');
  let lastY = window.scrollY;

  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(y > lastY && y > 80){
      nav.classList.add('hide'); // scroll down
    } else {
      nav.classList.remove('hide'); // scroll up
    }
    lastY = y;

    // Shrink
    if(y > 20){
      nav.classList.add('shrink');
    } else {
      nav.classList.remove('shrink');
    }
  }, { passive:true });
})();

// =====================================
// MOBILE NAV
// =====================================
(function(){
  const btn = document.getElementById('hamburgerBtn');
  const panel = document.getElementById('mobileNav');
  if(!btn || !panel) return;

  btn.addEventListener('click', ()=>{
    const open = panel.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    open ? panel.removeAttribute("hidden") : panel.setAttribute("hidden","");
  });

  panel.addEventListener('click', e=>{
    if(e.target === panel){
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      panel.setAttribute("hidden","");
    }
  });
})();

// =====================================
// LANGUAGE i18n (ZERO LAYOUT SHIFT)
// =====================================
const i18n = {
  de: {
    /* titles */
    title_home: "Infinity Diamond - Home",
    title_discord: "Infinity Diamond - Discord",
    title_spenden: "Infinity Diamond - Spenden",
    title_unban: "Infinity Diamond - Entbannung",
    title_links: "Infinity Diamond - Links",
    title_status: "Infinity Diamond - Status",

    /* nav */
    nav_home: "Home",
    nav_discord: "Discord",
    nav_spenden: "Spenden",
    nav_entbannung: "Entbannung",
    nav_links: "Links",
    nav_status: "Status",

    /* hero / home */
    badge: "Community",
    home_h1: "Willkommen bei Infinity Diamond",
    home_sub: "Deine Gaming, Anime & Social Community.",
    join_discord: "Discord beitreten",
    explore: "Mehr erfahren",

    cards_1_t: "Community-Hub",
    cards_1_d: "Treffe neue Leute und tausche dich über Gaming, Medien & Technik aus.",
    cards_2_t: "Services & Tools",
    cards_2_d: "LinkStack-Profile, Media-Server und weitere Online-Services — kostenlos.",
    cards_3_t: "Wachstum & Support",
    cards_3_d: "Wir unterstützen dich beim Aufbau deiner Online-Präsenz.",

    /* discord */
    discord_h1: "💎 Discord Community",
    discord_sub: "Regeln, Angebote & Ziele",
    disc_what: "Was wir bieten",
    disc_li1: "✅ Events & Giveaways",
    disc_li2: "✅ Support & Moderation",
    disc_li3: "✅ Rollen, Leveling & Badges",
    disc_li4: "✅ Voice & Chill",
    disc_rules: "Regeln",
    disc_r1: "🚫 Kein Spam oder Trolling",
    disc_r2: "🤝 Respektvoller Umgang",
    disc_r3: "🔞 Keine NSFW-Inhalte",
    disc_r4: "📜 Befolge Discord ToS",
    disc_join_title: "Beitreten",
    disc_join_sub: "Nutze unseren Invite-Link:",
    disc_join_btn: "Discord beitreten",

    /* spenden */
    spenden_h1: "💙 Unterstütze uns",
    spenden_small: "Deine Spende hilft bei Serverkosten, Tools & Weiterentwicklung.",

    /* unban */
    unban_h1: "Entbannung beantragen",
    unban_small: "Kurzes Formular – wir prüfen fair & schnell.",
    unban_hint: "Bitte schreibe uns auf Discord mit deinem Tag und einer kurzen Begründung.",

    /* links */
    links_h1: "Unsere Links",
    links_small: "Schnellzugriff auf LinkStack, Socials & Dienste.",
    links_btn_linkstack: "LinkStack öffnen",
    links_btn_media: "Media-Server",
    links_btn_more: "Weitere Dienste",

    /* status */
    status_h1: "Status",
    status_small: "Server- & Service-Statusübersicht.",
    status_info: "Status-Seite folgt – für jetzt siehe Discord-Announcements."
  },
  en: {
    /* titles */
    title_home: "Infinity Diamond - Home",
    title_discord: "Infinity Diamond - Discord",
    title_spenden: "Infinity Diamond - Donate",
    title_unban: "Infinity Diamond - Unban",
    title_links: "Infinity Diamond - Links",
    title_status: "Infinity Diamond - Status",

    /* nav */
    nav_home: "Home",
    nav_discord: "Discord",
    nav_spenden: "Donate",
    nav_entbannung: "Unban",
    nav_links: "Links",
    nav_status: "Status",

    /* hero / home */
    badge: "Community",
    home_h1: "Welcome to Infinity Diamond",
    home_sub: "Your gaming, anime & social community.",
    join_discord: "Join Discord",
    explore: "Learn more",

    cards_1_t: "Community Hub",
    cards_1_d: "Meet new people and discuss gaming, media & tech.",
    cards_2_t: "Services & Tools",
    cards_2_d: "LinkStack profiles, media servers & more — free.",
    cards_3_t: "Support & Growth",
    cards_3_d: "We help you build your online presence.",

    /* discord */
    discord_h1: "💎 Discord Community",
    discord_sub: "Rules, offers & goals",
    disc_what: "What we offer",
    disc_li1: "✅ Events & giveaways",
    disc_li2: "✅ Support & moderation",
    disc_li3: "✅ Roles, leveling & badges",
    disc_li4: "✅ Voice & chill",
    disc_rules: "Rules",
    disc_r1: "🚫 No spam or trolling",
    disc_r2: "🤝 Respectful behavior",
    disc_r3: "🔞 No NSFW content",
    disc_r4: "📜 Follow Discord ToS",
    disc_join_title: "Join",
    disc_join_sub: "Use our invite link:",
    disc_join_btn: "Join Discord",

    /* spenden */
    spenden_h1: "💙 Support us",
    spenden_small: "Your donation helps with server costs, tools & development.",

    /* unban */
    unban_h1: "Request unban",
    unban_small: "Short form – we review fair & fast.",
    unban_hint: "Please DM us on Discord with your tag and a short explanation.",

    /* links */
    links_h1: "Our links",
    links_small: "Quick access to LinkStack, socials & services.",
    links_btn_linkstack: "Open LinkStack",
    links_btn_media: "Media server",
    links_btn_more: "More services",

    /* status */
    status_h1: "Status",
    status_small: "Server & service status overview.",
    status_info: "Status page coming soon – for now see Discord announcements."
  }
};

function setLang(lang){
  localStorage.setItem('lang', lang);
  // Apply translations
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(i18n[lang][key] !== undefined){
      el.textContent = i18n[lang][key];
      // Also reflect <title> element
      if(el.tagName === 'TITLE'){
        document.title = i18n[lang][key];
      }
    }
  });
  applyLangUI();
  // After potential text change, keep indicator stable
  requestAnimationFrame(moveIndicator);
}
window.setLang = setLang;

// FLAG SLIDER UI
function applyLangUI(){
  const lang = localStorage.getItem('lang') || 'de';
  document.getElementById('langSwitch')?.setAttribute('data-lang', lang);
  document.getElementById('langSwitchMobile')?.setAttribute('data-lang', lang);
  const chk = document.getElementById('langChk'); if(chk) chk.checked = (lang === 'en');
  const chkm = document.getElementById('langChkMobile'); if(chkm) chkm.checked = (lang === 'en');
}

document.getElementById('langSwitch')?.addEventListener('click', (e)=>{
  e.preventDefault();
  setLang(localStorage.getItem('lang') === 'de' ? 'en' : 'de');
});
document.getElementById('langSwitchMobile')?.addEventListener('click', (e)=>{
  e.preventDefault();
  setLang(localStorage.getItem('lang') === 'de' ? 'en' : 'de');
});

// Init on load
setLang(localStorage.getItem('lang') || (navigator.language||'de').toLowerCase().startsWith('de') ? 'de' : 'en');

// FIRST INDICATOR RUN
window.addEventListener("load", ()=>{
  requestAnimationFrame(moveIndicator);
});
