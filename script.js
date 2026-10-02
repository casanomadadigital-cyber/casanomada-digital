/* Casanomada Digital, interactions */

/* Interactive content calendar, clicking a month swaps the planning */
(function () {
  var grid = document.getElementById('calGrid');
  var months = document.getElementById('calMonths');
  if (!grid || !months) return;
  var maandEl = document.getElementById('calMaand');
  var themaEl = document.getElementById('calThema');
  // demo data per month: day -> [label, status]  (status: live | plan | concept)
  var DATA = {
    APR: { maand: 'April 2025', thema: 'Lancering', days: { 1:['Post','live'], 4:['Reel','live'], 8:['Story','plan'], 11:['Carrousel','live'], 15:['Post','plan'], 19:['Reel','live'], 22:['Story','plan'], 26:['Post','live'], 29:['Reel','concept'] } },
    MEI: { maand: 'Mei 2025', thema: 'Community', days: { 2:['Story','live'], 6:['Reel','live'], 9:['Post','plan'], 13:['Carrousel','live'], 17:['Reel','plan'], 20:['Post','live'], 23:['Story','plan'], 27:['Reel','live'], 30:['Carrousel','concept'] } },
    JUNI: { maand: 'Juni 2025', thema: 'Brand story', days: { 3:['Post','live'], 5:['Story','live'], 9:['Reel','live'], 12:['Carrousel','plan'], 16:['Post','live'], 18:['Story','plan'], 20:['Reel','live'], 24:['Carrousel','plan'], 27:['Reel','concept'], 30:['Post','plan'] } },
    JUL: { maand: 'Juli 2025', thema: 'Zomercampagne', days: { 1:['Reel','live'], 5:['Post','live'], 8:['Story','plan'], 12:['Reel','live'], 15:['Carrousel','plan'], 19:['Post','live'], 22:['Reel','plan'], 26:['Story','live'], 29:['Post','concept'] } },
    AUG: { maand: 'Augustus 2025', thema: 'Groei', days: { 3:['Post','live'], 7:['Reel','live'], 10:['Story','plan'], 14:['Post','live'], 18:['Carrousel','plan'], 21:['Reel','live'], 25:['Story','plan'], 28:['Post','live'] } },
    SEP: { maand: 'September 2025', thema: 'Najaar', days: { 2:['Reel','live'], 5:['Post','live'], 9:['Story','plan'], 12:['Reel','live'], 16:['Carrousel','plan'], 19:['Post','live'], 23:['Reel','plan'], 26:['Story','live'], 30:['Post','concept'] } }
  };
  var cells = grid.querySelectorAll('.cal-day[data-day]');
  function render(key) {
    var d = DATA[key]; if (!d) return;
    if (maandEl) maandEl.textContent = d.maand;
    if (themaEl) themaEl.textContent = d.thema;
    cells.forEach(function (c) {
      var day = c.getAttribute('data-day');
      c.classList.remove('live', 'concept');
      var lbl = c.querySelector('.lbl'); if (lbl) lbl.remove();
      var entry = d.days[day];
      if (entry) {
        if (entry[1] === 'live') c.classList.add('live');
        else if (entry[1] === 'concept') c.classList.add('concept');
        var s = document.createElement('span'); s.className = 'lbl'; s.textContent = entry[0];
        c.appendChild(s);
      }
    });
    months.querySelectorAll('span').forEach(function (m) {
      m.classList.toggle('on', m.getAttribute('data-m') === key);
    });
  }
  months.querySelectorAll('span').forEach(function (m) {
    m.addEventListener('click', function () { render(m.getAttribute('data-m')); });
  });
  render('JUNI');
})();

/* WhatsApp floating button, appears on every page */
(function () {
  if (document.querySelector('.wa-fab')) return;
  var a = document.createElement('a');
  a.className = 'wa-fab';
  a.href = 'https://wa.me/31644818674?text=' + encodeURIComponent('Hallo Casanomada Digital, ik heb een vraag.');
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'Chat via WhatsApp');
  a.innerHTML = '<span class="wa-tip">Chat via WhatsApp</span>' +
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.301.244-.602.244-.93 0-.43-1.36-.86-1.732-1.003zm-3.105 7.371h-.014c-1.706 0-3.38-.46-4.84-1.318l-.345-.207-3.595.944.96-3.494-.225-.36a9.585 9.585 0 0 1-1.475-5.115c.002-5.306 4.32-9.62 9.628-9.62 2.573 0 4.99 1.003 6.808 2.82a9.566 9.566 0 0 1 2.82 6.808c-.002 5.306-4.32 9.62-9.622 9.62zm8.19-17.81A11.54 11.54 0 0 0 16.003 3.3C9.64 3.3 4.46 8.48 4.46 14.842c0 2.033.532 4.017 1.54 5.766L4.363 26.7l6.232-1.634a11.526 11.526 0 0 0 5.408 1.377h.005c6.362 0 11.542-5.18 11.545-11.542a11.473 11.473 0 0 0-3.384-8.135z"/></svg>';
  document.body.appendChild(a);
})();

(function () {
  // Sticky nav background on scroll
  var nav = document.getElementById('nav');
  // Pages without a dark hero need the solid (dark-text) nav from the top.
  var hasDarkHero = !!document.querySelector('.hero:not(.light)');
  function onScroll() {
    if (!hasDarkHero || window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Hide side-nav once scrolled past the dark hero (light bg below)
  var sideNav = document.getElementById('sideNav');
  var hero = document.querySelector('.hero');
  if (sideNav && hero) {
    window.addEventListener('scroll', function () {
      var past = window.scrollY > (hero.offsetHeight - 140);
      sideNav.classList.toggle('hidden', past);
    });
  }

  // 3D phone, drag to rotate, gentle auto-spin when idle
  var phone = document.getElementById('phone3d');
  if (phone) {
    var rotX = 8, rotY = -22;
    var dragging = false, lastX = 0, lastY = 0, vel = 0;
    var hint = document.getElementById('dragHint');
    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    function down(e) {
      dragging = true; vel = 0;
      phone.classList.add('grabbing');
      var p = e.touches ? e.touches[0] : e;
      lastX = p.clientX; lastY = p.clientY;
      if (hint) hint.classList.add('gone');
      e.preventDefault();
    }
    function move(e) {
      if (!dragging) return;
      var p = e.touches ? e.touches[0] : e;
      var dx = p.clientX - lastX, dy = p.clientY - lastY;
      rotY += dx * 0.4;
      rotX = clamp(rotX - dy * 0.3, -28, 42);
      vel = dx * 0.4;
      lastX = p.clientX; lastY = p.clientY;
      e.preventDefault();
    }
    function up() { dragging = false; phone.classList.remove('grabbing'); }

    phone.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    phone.addEventListener('touchstart', down, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);

    var section = document.getElementById('resultaat');
    function scrollTargetY() {
      // 0 when the section first enters from the bottom, 1 when it has left the top
      var r = section.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = (vh - r.top) / (vh + r.height);
      progress = Math.max(0, Math.min(1, progress));
      // sweep through the front (-20) as the section passes the middle of the screen
      return -20 + (0.5 - progress) * 130;
    }
    (function loop() {
      if (dragging) {
        // user is controlling it directly
      } else if (Math.abs(vel) > 0.4) {
        rotY += vel; vel *= 0.95;             // momentum after a flick
      } else {
        rotY += (scrollTargetY() - rotY) * 0.08;  // rotate as you scroll
        rotX += (8 - rotX) * 0.06;
      }
      phone.style.transform = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
      requestAnimationFrame(loop);
    })();
  }

  // Subtle 3D parallax on the hero headline
  var heroH1 = document.querySelector('.hero h1');
  if (heroH1 && window.matchMedia('(min-width:720px)').matches) {
    document.querySelector('.hero').addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5);
      var y = (e.clientY / window.innerHeight - 0.5);
      heroH1.style.transform = 'perspective(900px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 4) + 'deg)';
    });
    document.querySelector('.hero').addEventListener('mouseleave', function () {
      heroH1.style.transform = '';
    });
  }

  // Side-nav active section (homepage)
  var sideLinks = document.querySelectorAll('.side-nav a');
  if (sideLinks.length) {
    var secObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          sideLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('data-sec') === id);
          });
        }
      });
    }, { threshold: 0.4 });
    ['hero', 'probleem', 'aanpak', 'resultaat'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) secObserver.observe(el);
    });
  }

  // Contact form (no backend, shows a confirmation note)
  var form = document.getElementById('contactForm');
  if (form) {
    // Lead-tagging: ?product=... vanuit bijv. de StudioFlow-pagina
    var qs = new URLSearchParams(window.location.search);
    var leadProduct = qs.get('product') || '';
    var leadDuur = qs.get('duur') || '';
    if (leadProduct) {
      var berichtVeld = document.getElementById('bericht');
      var tierNamen = { 'studioflow-starter': 'Starter', 'studioflow-pro': 'Pro', 'studioflow-studio': 'Studio' };
      var prijzen = {
        'studioflow-starter': { '1': '€19,95 per maand', '3': '€56,95 voor 3 maanden', '12': '€199 per jaar' },
        'studioflow-pro': { '1': '€39,95 per maand', '3': '€113,95 voor 3 maanden', '12': '€399 per jaar' },
        'studioflow-studio': { '1': '€79,95 per maand', '3': '€227,95 voor 3 maanden', '12': '€799 per jaar' }
      };
      var leadTekst;
      if (tierNamen[leadProduct]) {
        leadTekst = 'Ik heb interesse in StudioFlow, pakket ' + tierNamen[leadProduct] +
          (prijzen[leadProduct][leadDuur] ? ', looptijd ' + ({ '1': '1 maand', '3': '3 maanden', '12': '1 jaar' })[leadDuur] + ' (' + prijzen[leadProduct][leadDuur] + ')' : '') + '.';
      } else if (leadProduct === 'studioflow') {
        leadTekst = 'Ik heb interesse in StudioFlow.';
      } else if (leadProduct === 'software-op-maat') {
        leadTekst = 'Ik wil graag een eigen tool/portaal laten bouwen (zoals StudioFlow).';
      } else {
        leadTekst = 'Interesse in: ' + leadProduct;
      }
      if (berichtVeld && !berichtVeld.value) berichtVeld.value = leadTekst;
    }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var note = document.getElementById('formNote');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var data = new FormData(form);
      if (btn) { btn.disabled = true; btn.textContent = 'Versturen...'; }
      // 1. Opslaan in Netlify (backup-archief)
      var p1 = fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      // 2. Directe e-mail naar de inbox via FormSubmit
      var p2 = fetch('https://formsubmit.co/ajax/casanomada.digital@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          Naam: data.get('naam') || '',
          Email: data.get('email') || '',
          Telefoon: data.get('tel') || '',
          Bedrijf: data.get('bedrijf') || '',
          Bericht: data.get('bericht') || '',
          Product: (leadProduct || '-') + (leadDuur ? ' · ' + leadDuur + ' mnd' : ''),
          _subject: leadProduct.indexOf('studioflow') === 0 ? 'StudioFlow-aanvraag via casanomadadigital.com' : 'Nieuwe aanvraag via casanomadadigital.com',
          _template: 'table',
          _captcha: 'false'
        })
      });
      Promise.allSettled([p1, p2]).then(function (results) {
        var ok = results.some(function (r) { return r.status === 'fulfilled' && r.value && r.value.ok; });
        if (ok) {
          form.reset();
          note.textContent = 'Bedankt! Je bericht is verzonden. We nemen binnen 24 uur contact met je op.';
          // Google Analytics: registreer een succesvolle aanvraag als lead-conversie
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', {
              form_name: 'contact',
              product: (leadProduct || '-')
            });
          }
        } else {
          note.textContent = 'Versturen lukte niet. Mail ons direct via casanomada.digital@gmail.com of bel 06 44818674.';
        }
        note.classList.add('show');
        note.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (btn) { btn.disabled = false; btn.innerHTML = 'Contact opnemen <span class="arr">\u2192</span>'; }
      });
    });
  }
})();
