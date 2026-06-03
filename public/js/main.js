// SOUND
const popup = document.getElementById('popup');
const btnSoundOn = document.getElementById('btn-sound-on');
const btnSoundOff = document.getElementById('btn-sound-off');

// Audio objects
const portalSound = new Audio('/sounds/Orbiting_the_Pale_Star.mp3');
const infernoSound = new Audio('/sounds/Beneath_the_Obsidian_Peak.mp3');
const abyssSound = new Audio('/sounds/Weight_of_the_Trench.mp3');

// Loop all sounds
portalSound.loop = true;
infernoSound.loop = true;
abyssSound.loop = true;

// Volume
portalSound.volume = 0.4;
infernoSound.volume = 0.4;
abyssSound.volume = 0.4;

// Sound enabled flag
let soundEnabled = false;

btnSoundOn.addEventListener('click', function() {
    popup.style.display = 'none';
    soundEnabled = true;
    portalSound.play();
});

btnSoundOff.addEventListener('click', function() {
    popup.style.display = 'none';
    soundEnabled = false;
});

// Switch sound when modal opens
function playSound(biome) {
    if (!soundEnabled) return;
    portalSound.pause();
    infernoSound.pause();
    abyssSound.pause();

    if (biome === 'inferno') {
        infernoSound.currentTime = 0;
        infernoSound.play();
    } else if (biome === 'abyss') {
        abyssSound.currentTime = 0;
        abyssSound.play();
    }
}

// Return to portal sound when modal closes
function stopBiomeSound() {
    if (!soundEnabled) return;
    infernoSound.pause();
    abyssSound.pause();
    portalSound.currentTime = 0;
    portalSound.play();
}

// MODALS
function openModal(biome) {
    const modal = document.getElementById('modal-' + biome);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playSound(biome);
}

function closeModal(biome) {
    const modal = document.getElementById('modal-' + biome);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    stopBiomeSound();
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

            if (page === 'explore') {
                loadFlora();
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

        // Send to database via API
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                feedback.textContent = '✅ Message sent! We will contact you within 14 Earth days.';
                feedback.className = 'feedback-success';
                form.reset();
            } else {
                feedback.textContent = '⚠️ Something went wrong. Please try again.';
                feedback.className = 'feedback-error';
            }
        })
        .catch(error => {
            feedback.textContent = '⚠️ Connection error. Please try again.';
            feedback.className = 'feedback-error';
        });
    });
}


//EXPLORE TABS
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t=> {
        t.style.display = 'none';
    });

    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('tab-active');
        b.classList.remove('tab-abyss-active');
    });

    document.getElementById('tab-' + tab).style.display = 'block';

    const buttons = document.querySelectorAll('.tab-btn');
    if (tab === 'inferno') {
        buttons[0].classList.add('tab-active');
    } else {
        buttons[1].classList.add('tab-abyss-active');
    }
}


// LOAD FLORA FROM DATABASE
function loadFlora() {
    // Load Inferno flora
    fetch('/api/flora?habitat_id=1')
        .then(response => response.json())
        .then(flora => {
            const grid = document.getElementById('flora-grid-inferno');
            if (!grid) return;
            grid.innerHTML = flora.map(plant => `
                <div class="flora-card flora-card-inferno">
                    <h3>${plant.name}</h3>
                    <p class="flora-desc">${plant.description}</p>
                    <p class="flora-role">${plant.ecosystem_role}</p>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error loading Inferno flora:', error));

    // Load Abyss flora
    fetch('/api/flora?habitat_id=2')
        .then(response => response.json())
        .then(flora => {
            const grid = document.getElementById('flora-grid-abyss');
            if (!grid) return;
            grid.innerHTML = flora.map(plant => `
                <div class="flora-card flora-card-abyss">
                    <h3>${plant.name}</h3>
                    <p class="flora-desc">${plant.description}</p>
                    <p class="flora-role">${plant.ecosystem_role}</p>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error loading Abyss flora:', error));
}