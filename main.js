// SOUND
const popup = document.getElementById('popup');
const btnSoundOn = document.getElementById('btn-sound-on');
const btnSoundOff = document.getElementById('btn-sound-off');

btnSoundOn.addEventListener('click', function() {
    popup.style.display = 'none';
});

btnSoundOff.addEventListener('click', function() {
    popup.style.display = 'none';
});

// MODALS
function openModal(biome) {
    const modal = document.getElementById('modal-' + biome);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(biome) {
    const modal = document.getElementById('modal-' + biome);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        closeContent();
    }
});

// NAVIGATION
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function navigateTo(page) {
    window.location.href = '/' + page;
}

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .biome-content, #synthesis .section-content').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// DYNAMIC CONTENT LOADER
function loadContent(page) {
    fetch(page + '-content.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('dynamic-content').innerHTML = html;
            document.body.style.overflow = 'hidden';

            if (page === 'faq') {
                initAccordion();
            }

            if (page === 'contact') {
                initContactForm();
            }
        })
        .catch(error => {
            console.error('Error loading content: ', error);
        });
}

function closeContent() {
    const container = document.getElementById('dynamic-content');
    if (container) {
        container.innerHTML = '';
        document.body.style.overflow = 'auto';
    }
}

// ACCORDION FOR FAQ
function initAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = '0';
                i.querySelector('.faq-icon').textContent = '+';
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '✕';
            }
        });
    });
}

// CONTACT FORM VALIDATION
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const feedback = document.getElementById('form-feedback');

        if (!name || !email || !subject || !message) {
            feedback.textContent = '⚠️ Please fill in all fields.';
            feedback.className = 'feedback-error';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            feedback.textContent = '⚠️ Please enter a valid email address.';
            feedback.className = 'feedback-error';
            return;
        }

        feedback.textContent = '✅ Message sent! We will contact you within 14 Earth days.';
        feedback.className = 'feedback-success';
        form.reset();
    });
}