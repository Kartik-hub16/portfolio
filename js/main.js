/* ==========================================
   PORTFOLIO DASHBOARD — CLEAN DATA ANALYST MAIN JS
   Dynamic renderers, section scroll observer, modal triggers & command palette
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Core Renderers
  renderMetrics();
  renderTechStack();
  renderProjects('all');
  renderTimeline();
  renderLearningNow();
  renderCertificates();

  // Interactive Features
  setupNavScroll();
  setupCommandPalette();
  setupContactForm();
  initTheme();

  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 100);
});

/* --- 1. Overview Metrics Grid --- */
function renderMetrics() {
  const container = document.getElementById('metricsGrid');
  if (!container || !PORTFOLIO_DATA.metrics) return;

  container.innerHTML = PORTFOLIO_DATA.metrics.map(m => `
    <div class="metric-card">
      <div class="metric-header">
        <span class="metric-label">${m.label}</span>
        <i data-lucide="${m.icon}" class="metric-icon"></i>
      </div>
      <div class="metric-value-row">
        <span class="metric-value">${m.value}</span>
        <span class="metric-trend">${m.trend}</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

/* --- 2. Tech Stack (Collapsible Accordion Category Chips) --- */
function renderTechStack() {
  const container = document.getElementById('techStackAccordion');
  if (!container || !PORTFOLIO_DATA.techStack) return;

  container.innerHTML = PORTFOLIO_DATA.techStack.map((cat, idx) => `
    <details class="accordion-item" ${idx === 0 || idx === 2 || idx === 3 ? 'open' : ''}>
      <summary>
        <div class="summary-left">
          <i data-lucide="chevron-right" class="summary-chevron"></i>
          <span>${cat.category}</span>
        </div>
        <span class="summary-badge">${cat.count}</span>
      </summary>
      <div class="accordion-content">
        ${cat.items.map(item => `
          <div class="tech-chip">
            <span class="chip-dot"></span>
            <img src="${item.icon}" alt="${item.name}" class="brand-icon" onerror="this.style.display='none'" />
            <span>${item.name}</span>
          </div>
        `).join('')}
      </div>
    </details>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

/* --- 3. Projects Telemetry Table & Filtering --- */
function renderProjects(filterCategory = 'all') {
  const tableBody = document.getElementById('projectsTableBody');
  if (!tableBody || !PORTFOLIO_DATA.projects) return;

  const filtered = filterCategory === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === filterCategory);

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-secondary); padding: 32px;">
          No projects matching category filter.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(p => `
    <tr onclick="openProjectModal('${p.id}')">
      <td>
        <div class="project-name-cell">
          <span>${p.name}</span>
          <span class="project-desc-sub">${p.problem}</span>
        </div>
      </td>
      <td>
        <div class="stack-tags">
          ${p.stack.slice(0, 4).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
          ${p.stack.length > 4 ? `<span class="tag-pill">+${p.stack.length - 4}</span>` : ''}
        </div>
      </td>
      <td>
        <span class="badge-status ${p.statusClass}">● ${p.status}</span>
      </td>
      <td>
        <span class="link-arrow">View Details →</span>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

window.filterProjects = function(cat, btnElement) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderProjects(cat);
};

/* --- 4. Project Detail Modal --- */
window.openProjectModal = function(id) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('projectModalBody');

  const featuresList = project.features 
    ? project.features.map(f => `<li style="margin-bottom: 6px; position: relative; padding-left: 18px;"><span style="position: absolute; left: 0; color: var(--accent-teal); font-weight: bold;">•</span>${f}</li>`).join('') 
    : '';

  body.innerHTML = `
    <div class="modal-header">
      <div class="modal-title-group">
        <h3 class="modal-title">${project.name}</h3>
        <span class="modal-subtitle">TELEMETRY ID: ${project.id.toUpperCase()} · STATUS: ${project.status.toUpperCase()}</span>
      </div>
      <button class="close-btn" onclick="closeProjectModal()">
        <i data-lucide="x" style="width: 18px; height: 18px;"></i>
      </button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <span style="font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">PROBLEM SOLVED</span>
        <p style="font-size: 14px; color: var(--text-body); line-height: 1.6; margin-top: 4px; background-color: var(--surface-subtle); padding: 14px; border-radius: var(--radius-md); font-weight: 500;">
          ${project.problem}
        </p>
      </div>

      ${featuresList ? `
      <div>
        <span style="font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">KEY FEATURES & MODULES</span>
        <ul style="font-size: 13px; color: var(--text-body); line-height: 1.6; margin-top: 6px; list-style: none;">
          ${featuresList}
        </ul>
      </div>` : ''}

      ${project.learned ? `
      <div style="background-color: var(--accent-teal-tint); padding: 14px; border-radius: var(--radius-md);">
        <span style="font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--accent-teal); text-transform: uppercase;">WHAT I LEARNED / ENGINEERING INSIGHT</span>
        <p style="font-size: 13px; color: var(--text-heading); line-height: 1.5; margin-top: 4px; font-weight: 500;">${project.learned}</p>
      </div>` : ''}

      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 8px; flex-wrap: wrap; padding-top: 14px; border-top: 1px solid var(--surface-subtle);">
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary);">${project.metrics || 'Production Telemetry'}</span>
        <div style="display: flex; gap: 10px;">
          ${project.demo ? `
          <a href="${project.demo}" target="_blank" class="btn btn-primary btn-mono btn-sm">
            <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
            Live Demo ↗
          </a>` : ''}
          <a href="${project.github}" target="_blank" class="btn btn-secondary btn-mono btn-sm">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" style="width: 14px; height: 14px;">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            Repository ↗
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  if (window.lucide) window.lucide.createIcons();
};

window.closeProjectModal = function() {
  document.getElementById('projectModal').classList.remove('active');
};

/* --- 5. Experience Timeline --- */
function renderTimeline() {
  const container = document.getElementById('timelineList');
  if (!container || !PORTFOLIO_DATA.timeline) return;

  container.innerHTML = PORTFOLIO_DATA.timeline.map(t => `
    <div class="timeline-item">
      <div class="timeline-date">${t.period}</div>
      <div class="timeline-node"></div>
      <div class="timeline-content">
        <div class="timeline-role">${t.role}</div>
        <div class="timeline-company">${t.institution}</div>
        <div class="timeline-details">${t.details}</div>
      </div>
    </div>
  `).join('');
}

/* --- 6. Learning Now Grid --- */
function renderLearningNow() {
  const container = document.getElementById('learningGrid');
  if (!container || !PORTFOLIO_DATA.learningNow) return;

  container.innerHTML = PORTFOLIO_DATA.learningNow.map(item => `
    <div class="learning-cell">
      <div class="learning-top-row">
        <div class="learning-icon-chip">
          <i data-lucide="${item.iconName || 'sparkles'}" class="learning-chip-icon"></i>
        </div>
        <span class="learning-label-upper">${item.upper}</span>
      </div>
      <div class="learning-label-main">${item.label}</div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

/* --- 7. Certificates Grid --- */
function renderCertificates() {
  const container = document.getElementById('certificatesGrid');
  if (!container || !PORTFOLIO_DATA.certificates) return;

  container.innerHTML = PORTFOLIO_DATA.certificates.map(cert => {
    const isPdf = cert.verifyUrl && cert.verifyUrl.endsWith('.pdf');
    const linkLabel = isPdf ? 'View PDF →' : 'Verify →';

    return `
      <div class="cert-cell" onclick="window.open('${cert.verifyUrl}', '_blank')" style="cursor: pointer;">
        <div>
          <div class="cert-top-row" style="margin-bottom: 8px;">
            <div class="cert-icon-chip">
              <i data-lucide="${isPdf ? 'file-text' : 'award'}" class="cert-chip-icon"></i>
            </div>
            <span class="cert-issuer">${cert.issuer}</span>
          </div>
          <div class="cert-title">${cert.title}</div>
        </div>
        <div class="cert-meta-row">
          <span class="cert-date">${cert.date}</span>
          <span class="cert-verify-link">${linkLabel}</span>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

/* --- 8. Navigation Scroll & Active Section Highlighting --- */
function setupNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const breadcrumbActive = document.getElementById('breadcrumbActive');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
            if (breadcrumbActive) {
              const labelText = item.querySelector('span')?.textContent || 'Overview';
              breadcrumbActive.textContent = labelText;
            }
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(sec => observer.observe(sec));
}

/* --- 9. Command Palette (⌘K) --- */
function setupCommandPalette() {
  const modal = document.getElementById('cmdPaletteModal');
  const input = document.getElementById('cmdInput');
  const resultsContainer = document.getElementById('cmdResultsList');

  const actions = [
    { label: "Go to Overview Metrics", section: "#overview", icon: "activity" },
    { label: "Go to Profile / Hero", section: "#hero", icon: "user" },
    { label: "Go to System Bio", section: "#about", icon: "file-text" },
    { label: "Go to Tech Stack", section: "#skills", icon: "layers" },
    { label: "Go to Projects Telemetry", section: "#projects", icon: "box" },
    { label: "Go to Experience & Education", section: "#experience", icon: "clock" },
    { label: "Go to Learning Focus", section: "#learning", icon: "book-open" },
    { label: "Go to Certificates", section: "#certificates", icon: "award" },
    { label: "Go to Direct Communication", section: "#contact", icon: "mail" },
    { label: "Copy Email Address", action: "copyEmail", icon: "copy" },
    { label: "Download Resume PDF", action: "downloadResume", icon: "download" },
    { label: "Open GitHub Profile", url: PORTFOLIO_DATA.profile.github, icon: "external-link" },
    { label: "Open LinkedIn Profile", url: PORTFOLIO_DATA.profile.linkedin, icon: "external-link" }
  ];

  function renderResults(query = '') {
    const q = query.toLowerCase();
    const filtered = actions.filter(a => a.label.toLowerCase().includes(q));

    resultsContainer.innerHTML = filtered.map(a => `
      <div class="cmd-item" onclick="executeCmdAction('${a.section || ''}', '${a.action || ''}', '${a.url || ''}')">
        <div class="cmd-item-left">
          <i data-lucide="${a.icon}" style="width: 15px; height: 15px; color: var(--accent-teal);"></i>
          <span>${a.label}</span>
        </div>
        <span class="kbd-badge">↵ Select</span>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleCmdPalette();
    }
    if (e.key === 'Escape') {
      closeCmdPalette();
      closeProjectModal();
    }
  });

  if (input) {
    input.addEventListener('input', (e) => renderResults(e.target.value));
  }

  window.toggleCmdPalette = function() {
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
      renderResults();
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 50);
      }
    }
  };

  window.closeCmdPalette = function() {
    modal.classList.remove('active');
  };

  window.executeCmdAction = function(section, action, url) {
    closeCmdPalette();
    if (section) {
      const el = document.querySelector(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'copyEmail') {
      copyEmail();
    } else if (action === 'downloadResume') {
      downloadResume();
    } else if (url) {
      window.open(url, '_blank');
    }
  };
}

/* --- 10. Contact Form & Utilities --- */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('contactSubmitBtn');
    const originalText = btn.innerHTML;

    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Transmitting...`;
    btn.disabled = true;

    setTimeout(() => {
      showToast('Message sent successfully! I will reach back out soon.');
      form.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
      if (window.lucide) window.lucide.createIcons();
    }, 800);
  });
}

window.copyEmail = function() {
  navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
  showToast('Email copied to clipboard: ' + PORTFOLIO_DATA.profile.email);
};

window.downloadResume = function() {
  showToast('Downloading Resume PDF...');
  const a = document.createElement('a');
  a.href = 'assets/resume.pdf';
  a.download = 'Kartik_Kohad_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

window.toggleMobileSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('mobile-open');
};

/* Theme Toggle (Light / Dark) */
window.toggleTheme = function() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
};

function updateThemeIcon(theme) {
  const sun = document.getElementById('themeIconSun');
  const moon = document.getElementById('themeIconMoon');
  if (!sun || !moon) return;
  if (theme === 'light') {
    sun.style.display = 'block';
    moon.style.display = 'none';
  } else {
    sun.style.display = 'none';
    moon.style.display = 'block';
  }
}

function initTheme() {
  const saved = localStorage.getItem('portfolio-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  setTimeout(() => updateThemeIcon(saved), 120);
}

/* Toast Notification Helper */
window.showToast = function(msg) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--accent-teal);"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 150ms ease-out';
    setTimeout(() => toast.remove(), 150);
  }, 3500);
};
