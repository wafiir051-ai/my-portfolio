/* ============ SUPABASE PROJECTS FETCH ============ */
(function () {
  var SUPABASE_URL = 'https://erfuemuloqptttrbccmw.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZnVlbXVsb3FwdHR0cmJjY213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDk4OTgsImV4cCI6MjEwMTM4NTg5OH0.NRk5Ve1I6s71Zw1RAd10IFrXlI7ivySC3LDeQRb68ko';

  var grid = document.querySelector('.projects-grid');
  if (!grid) return;

  var externalLinkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>';

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderProject(p) {
    var tagsHtml = (p.tags || []).map(function (t) {
      return '<span>' + escapeHtml(t) + '</span>';
    }).join('');

    var footerHtml = '';
    if (p.link_url) {
      footerHtml = '<a href="' + escapeHtml(p.link_url) + '" target="_blank" rel="noopener" class="project-link">' +
        escapeHtml(p.link_label || 'Lihat Live') + ' ' + externalLinkSvg + '</a>';
    } else if (p.status_text) {
      footerHtml = '<div class="project-status">' + escapeHtml(p.status_text) + '</div>';
    }

    return (
      '<div class="card project-card reveal">' +
        '<div class="cat">' + escapeHtml(p.category || '') + '</div>' +
        '<h3>' + escapeHtml(p.title) + '</h3>' +
        '<p>' + escapeHtml(p.description) + '</p>' +
        '<div class="project-tags">' + tagsHtml + '</div>' +
        footerHtml +
      '</div>'
    );
  }

  fetch(SUPABASE_URL + '/rest/v1/projects?select=*&order=sort_order.asc', {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + SUPABASE_ANON_KEY
    }
  })
    .then(function (res) {
      if (!res.ok) throw new Error('Gagal memuat project (status ' + res.status + ')');
      return res.json();
    })
    .then(function (projects) {
      if (!projects || !projects.length) return;

      grid.innerHTML = projects.map(renderProject).join('');

      var revealEls = grid.querySelectorAll('.reveal');
      if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
          });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
      } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      }

      var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (supportsHover && !reduceMotion) {
        grid.querySelectorAll('.project-card').forEach(function (card) {
          var rafId = null;
          card.style.transformStyle = 'preserve-3d';
          card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var cx = rect.width / 2, cy = rect.height / 2;
            var px = x / rect.width, py = y / rect.height;
            var rotateY = ((x - cx) / cx) * 12;
            var rotateX = -((y - cy) / cy) * 12;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(function () {
              card.style.transform = 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) translateZ(24px) scale(1.02)';
              card.style.setProperty('--glow-x', (px * 100).toFixed(1) + '%');
              card.style.setProperty('--glow-y', (py * 100).toFixed(1) + '%');
              card.style.setProperty('--glow-opacity', '1');
            });
          });
          card.addEventListener('mouseleave', function () {
            if (rafId) cancelAnimationFrame(rafId);
            card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0) translateZ(0) scale(1)';
            card.style.setProperty('--glow-opacity', '0');
          });
        });
      }
    })
    .catch(function (err) {
      console.error('Supabase projects fetch error:', err);
    });
})();
