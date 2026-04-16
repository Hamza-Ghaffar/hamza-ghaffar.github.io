const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.project-card, .skill-pill, .country-tag, .timeline-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === '#' + id ? '#0a8276' : '#555';
            });
        }
    });
}, { threshold: 0.3 });
sections.forEach(section => navObserver.observe(section));

/* ── Contact Popup ── */
const popupData = {
    email: {
        icon: '✉️', bg: 'ci-email', title: 'Email Me',
        detail: 'hamza.ghaffar@hotmail.com',
        actions: [
            { label: '✉️ Send Email', href: 'mailto:hamza.ghaffar@hotmail.com', cls: 'popup-btn-primary' },
            { label: '📋 Copy Address', copy: 'hamza.ghaffar@hotmail.com', cls: 'popup-btn-copy' }
        ]
    },
    whatsapp: {
        icon: '💬', bg: 'ci-whatsapp', title: 'WhatsApp',
        detail: '+43 660 119 2777',
        actions: [
            { label: '💬 Open WhatsApp', href: 'https://wa.me/436601192777', cls: 'popup-btn-primary', external: true },
            { label: '📋 Copy Number', copy: '+436601192777', cls: 'popup-btn-copy' }
        ]
    },
    linkedin: {
        icon: '🔗', bg: 'ci-linkedin', title: 'LinkedIn',
        detail: 'linkedin.com/in/hamzaghaffar',
        actions: [
            { label: '🔗 Open LinkedIn', href: 'https://www.linkedin.com/in/hamzaghaffar/', cls: 'popup-btn-primary', external: true },
            { label: '📋 Copy Link', copy: 'https://www.linkedin.com/in/hamzaghaffar/', cls: 'popup-btn-copy' }
        ]
    }
};

function openPopup(type) {
    const d = popupData[type];
    if (!d) return;
    document.getElementById('popupIcon').className = 'popup-icon ' + d.bg;
    document.getElementById('popupIcon').textContent = d.icon;
    document.getElementById('popupTitle').textContent = d.title;
    document.getElementById('popupDetail').textContent = d.detail;
    const actionsEl = document.getElementById('popupActions');
    actionsEl.innerHTML = '';
    d.actions.forEach(function(a) {
        if (a.href) {
            const link = document.createElement('a');
            link.href = a.href;
            link.className = 'popup-btn ' + a.cls;
            link.textContent = a.label;
            if (a.external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
            actionsEl.appendChild(link);
        } else if (a.copy) {
            const btn = document.createElement('button');
            btn.className = 'popup-btn ' + a.cls;
            btn.textContent = a.label;
            btn.onclick = function() {
                navigator.clipboard.writeText(a.copy).then(function() {
                    btn.textContent = '✅ Copied!';
                    setTimeout(function() { btn.textContent = a.label; }, 2000);
                });
            };
            actionsEl.appendChild(btn);
        }
    });
    document.getElementById('popupOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup(e, force) {
    if (force || e.target === document.getElementById('popupOverlay')) {
        document.getElementById('popupOverlay').classList.remove('active');
        document.body.style.overflow = '';
    }
}
