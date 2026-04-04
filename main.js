const popup = document.getElementById('popup');
const btnSoundOn = document.getElementById('btn-sound-on');
const btnSoundOff = document.getElementById('btn-sound-off');

btnSoundOn.addEventListener('click', function() {
    popup.style.display ='none';
});

btnSoundOff.addEventListener('click', function(){
    popup.style.display= 'none';
});

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