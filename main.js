//SOUND
const popup = document.getElementById('popup');
const btnSoundOn = document.getElementById('btn-sound-on');
const btnSoundOff = document.getElementById('btn-sound-off');

btnSoundOn.addEventListener('click', function() {
    popup.style.display ='none';
});

btnSoundOff.addEventListener('click', function(){
    popup.style.display= 'none';
});


//MODALS
function openModal(biome) {
    const modal = document.getElementById('modal-' + biome);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(biome){
    const modal = document.getElementById('modal-'  + biome);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.querySelectorAll('.modal-overlay'). forEach(overlay => {
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
    }
});


//NAVIGATION
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function navigationTo(page) {
    window.location.href = '/' + page;
}


//SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visable');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .biome-content, #synthesis . section-content').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});