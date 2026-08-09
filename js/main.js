/* ==========================================
   PORTFOLIO DASHBOARD — MAIN INTERACTIVE MODULE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  renderMetrics();
  renderTechStack();
  renderProjects('all');
  renderTimeline();
  renderLearningNow();
  renderCertificates();
  setupNavScroll();
  setupCommandPalette();
  setupContactForm();

  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 100);
});

/* --- Section 1: Metrics Rendering --- */
function renderMetrics() {
  const container = document.getElementById('metricsGrid');
  if (!container) return;

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
}

/* --- Section 2: Tech Stack (Collapsible Accordion Chips) --- */
function renderTechStack() {
  const container = document.getElementById('techStackAccordion');
  if (!container) return;

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
            <img src="${item.icon}" alt="${item.name}" class="brand-icon" onerror="this.style.display='none'" />
            <span>${item.name}</span>
          </div>
        `).join('')}
      </div>
    </details>
  `).join('');
}

/* --- Section 3: Projects Table & Filtering --- */
function renderProjects(filterCategory = 'all') {
  const tbody = document.getElementById('projectsTableBody');
  if (!tbody) return;

  const filtered = filterCategory === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === filterCategory);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-tertiary); padding: 32px;">No projects found in this category.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => `
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
          ${p.stack.length > 4 ? `<span class="tag-pill">+${p.stack.length - 4} more</span>` : ''}
        </div>
      </td>
      <td>
        <span class="badge-status ${p.statusClass}">
          ● ${p.status}
        </span>
      </td>
      <td>
        <span class="link-arrow">View Details →</span>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function filterProjects(cat, btnElement) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderProjects(cat);
}

/* --- Project Detail Modal --- */
function openProjectModal(id) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('projectModalBody');

  const featuresList = project.features ? project.features.map(f => `<li style="margin-bottom: 6px; position: relative; padding-left: 14px;"><span style="position: absolute; left: 0; color: var(--accent-primary);">▸</span>${f}</li>`).join('') : '';

  body.innerHTML = `
    <div class="modal-header">
      <div class="modal-title-group">
        <span class="modal-title">${project.name}</span>
        <span class="modal-subtitle">STATUS: ${project.status.toUpperCase()}</span>
      </div>
      <button class="close-btn" onclick="closeProjectModal()">
        <i data-lucide="x"></i>
      </button>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 18px; margin-top: 16px;">
      
      <!-- Problem Solved Panel -->
      <div>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">PROBLEM SOLVED</span>
        <p style="font-size: 14px; color: var(--text-primary); line-height: 1.6; margin-top: 4px; background: var(--bg-surface-elevated); padding: 12px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">${project.problem}</p>
      </div>

      <!-- Key Features -->
      ${featuresList ? `
      <div>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">KEY FEATURES</span>
        <ul style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-top: 6px; list-style: none;">
          ${featuresList}
        </ul>
      </div>` : ''}

      <!-- What I Learned -->
      ${project.learned ? `
      <div style="background: rgba(94, 106, 210, 0.08); border: 1px solid rgba(94, 106, 210, 0.2); padding: 14px; border-radius: var(--radius-md);">
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-primary); text-transform: uppercase; font-weight: 600;">WHAT I LEARNED</span>
        <p style="font-size: 13px; color: var(--text-primary); line-height: 1.6; margin-top: 4px;">${project.learned}</p>
      </div>` : ''}

      <!-- Performance Telemetry -->
      <div style="display: flex; gap: 24px; background: var(--bg-surface-elevated); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
        <div>
          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-tertiary); text-transform: uppercase;">TELEMETRY & METRICS</span>
          <p style="font-family: var(--font-mono); font-size: 13px; color: var(--status-green); font-weight: 600; margin-top: 2px;">${project.metrics}</p>
        </div>
      </div>

      <!-- Stack Tags -->
      <div>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em;">TECHNOLOGY STACK</span>
        <div class="stack-tags" style="margin-top: 6px;">
          ${project.stack.map(t => `<span class="tag-pill" style="font-size: 11px; padding: 4px 8px;">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 12px; margin-top: 8px; flex-wrap: wrap;">
        <a href="${project.github}" target="_blank" class="btn btn-secondary btn-mono">
          <i data-lucide="github" style="width: 14px; height: 14px;"></i> View Repository
        </a>
        <a href="${project.demo}" target="_blank" class="btn btn-primary btn-mono">
          <i data-lucide="external-link" style="width: 14px; height: 14px;"></i> Open Project / Live Demo
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  if (window.lucide) window.lucide.createIcons();
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
}

/* --- Section 4: Experience Timeline --- */
function renderTimeline() {
  const container = document.getElementById('timelineList');
  if (!container) return;

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

/* --- Section 5: Learning Now Grid --- */
function renderLearningNow() {
  const container = document.getElementById('learningGrid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.learningNow.map(item => `
    <div class="learning-cell">
      <div class="learning-top-row">
        <div class="learning-icon-chip">
          ${item.icon 
            ? `<img src="${item.icon}" alt="${item.label}" class="brand-icon" style="width: 14px; height: 14px;" />` 
            : `<i data-lucide="${item.iconName || 'sparkles'}" class="learning-chip-icon"></i>`}
        </div>
        <span class="learning-label-upper">${item.upper}</span>
      </div>
      <span class="learning-label-main">${item.label}</span>
    </div>
  `).join('');
}

/* --- Section 6: Certificates Grid --- */
function renderCertificates() {
  const container = document.getElementById('certificatesGrid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.certificates.map(cert => {
    const isPdf = cert.verifyUrl && cert.verifyUrl.endsWith('.pdf');
    const linkLabel = isPdf ? 'View PDF →' : 'Verify →';
    const clickAttr = cert.verifyUrl ? `onclick="window.open('${cert.verifyUrl}', '_blank')"` : '';
    const cursorStyle = cert.verifyUrl ? 'style="cursor: pointer;"' : '';

    return `
      <div class="cert-cell" ${cursorStyle} ${clickAttr}>
        <div class="cert-top-row">
          <div class="cert-icon-chip">
            <i data-lucide="${isPdf ? 'file-text' : 'award'}" class="cert-chip-icon"></i>
          </div>
          <span class="cert-issuer">${cert.issuer}</span>
        </div>
        <div class="cert-title">${cert.title}</div>
        <div class="cert-meta-row">
          <span class="cert-date">${cert.date}</span>
          ${cert.verifyUrl ? `<a href="${cert.verifyUrl}" target="_blank" class="cert-verify-link" onclick="event.stopPropagation();">${linkLabel}</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* --- Active Scroll Navigation Sync --- */
function setupNavScroll() {
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');
  const breadcrumbActive = document.getElementById('breadcrumbActive');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
            if (breadcrumbActive) {
              const label = item.textContent.trim();
              breadcrumbActive.textContent = label;
            }
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // Close mobile sidebar on nav item click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 868) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
      }
    });
  });
}

/* --- Command Palette (Cmd + K) --- */
function setupCommandPalette() {
  const modal = document.getElementById('cmdPaletteModal');
  const input = document.getElementById('cmdInput');
  const resultsContainer = document.getElementById('cmdResultsList');

  const actions = [
    { label: "Go to Overview", section: "#overview", icon: "grid" },
    { label: "Go to Profile / Hero", section: "#hero", icon: "user" },
    { label: "Go to System Bio", section: "#about", icon: "file-text" },
    { label: "Go to Tech Stack", section: "#skills", icon: "layers" },
    { label: "Go to Projects Telemetry", section: "#projects", icon: "box" },
    { label: "Go to Experience Timeline", section: "#experience", icon: "clock" },
    { label: "Go to Learning Now", section: "#learning", icon: "book-open" },
    { label: "Go to Certificates", section: "#certificates", icon: "award" },
    { label: "Go to Contact", section: "#contact", icon: "mail" },
    { label: "Copy Email Address", action: "copyEmail", icon: "copy" },
    { label: "Download Resume PDF", action: "downloadResume", icon: "download" },
    { label: "Open GitHub Profile", url: PORTFOLIO_DATA.profile.github, icon: "github" },
    { label: "Open LinkedIn Profile", url: PORTFOLIO_DATA.profile.linkedin, icon: "linkedin" }
  ];

  function renderResults(query = '') {
    const q = query.toLowerCase();
    const filtered = actions.filter(a => a.label.toLowerCase().includes(q));

    resultsContainer.innerHTML = filtered.map(a => `
      <div class="cmd-item" onclick="executeCmdAction('${a.section || ''}', '${a.action || ''}', '${a.url || ''}')">
        <div class="cmd-item-left">
          <i data-lucide="${a.icon}" style="width: 14px; height: 14px; opacity: 0.7;"></i>
          <span>${a.label}</span>
        </div>
        <span class="kbd-badge">↵ Jump</span>
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

/* --- Contact Form & Utilities --- */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Sending...`;
    btn.disabled = true;

    setTimeout(() => {
      showToast('Message transmitted successfully! I will get back to you soon.');
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
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.toggle('mobile-open');
  if (overlay) overlay.classList.toggle('active');
};

/* Theme Toggle (Dark / Light) */
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
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  // Icons aren't rendered yet, updateThemeIcon is called after lucide init
  setTimeout(() => updateThemeIcon(saved), 120);
}

initTheme();

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
  toast.innerHTML = `<i data-lucide="check-circle-2" style="width: 16px; height: 16px; color: var(--status-green);"></i> <span>${msg}</span>`;
  container.appendChild(toast);
  
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 200ms ease-out';
    setTimeout(() => toast.remove(), 200);
  }, 3500);
};

