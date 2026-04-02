const slider = document.getElementById('slider');
const container = document.querySelector('.slider-wrapper');
const sizeDivider = 2.5;

const originalSlides = Array.from(document.querySelectorAll('.slide'));
const total = originalSlides.length;

originalSlides.slice().reverse().forEach(s => slider.prepend(s.cloneNode(true)));
originalSlides.forEach(s => slider.append(s.cloneNode(true)));

let slides = Array.from(document.querySelectorAll('.slide'));
let current = total;
let isAnimating = false;

function applySize() {
    const containerWidth = container.offsetWidth;
    const slideW = containerWidth / sizeDivider;
    const slideH = slideW * 0.6;
    slides.forEach(function(slide) {
        slide.style.minWidth = slideW + 'px';
        slide.style.height = slideH + 'px';
    });
}

function getTranslateX(index) {
    const slideWidth = slides[0].offsetWidth + 20;
    const containerWidth = container.offsetWidth;
    const centerOffset = containerWidth / 2 - slideWidth / 2;
    return -index * slideWidth + centerOffset;
}

// Freeze all slide transitions (scale/opacity won't animate during jump)
function freezeSlides() {
    slides.forEach(function(slide) {
        slide.style.transition = 'none';
    });
}

// Restore slide transitions after a frame
function thawSlides() {
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            slides.forEach(function(slide) {
                slide.style.transition = '';
            });
        });
    });
}

function updateActive(index) {
    slides.forEach(function(slide, i) {
        slide.classList.toggle('active', i === index);
    });
}

function jumpTo(newIndex) {
    // Freeze slide transitions so scale/opacity don't animate
    freezeSlides();

    // Swap active class instantly (no animation)
    updateActive(newIndex);

    // Snap slider position instantly
    slider.style.transition = 'none';
    slider.style.transform = 'translateX(' + getTranslateX(newIndex) + 'px)';

    // Flush everything in one paint
    slider.offsetHeight;

    current = newIndex;

    // Re-enable slide transitions after two frames (safe margin)
    thawSlides();
}

slider.addEventListener('transitionend', function(e) {
    if (e.target !== slider) return;

    if (current >= total * 2) {
        jumpTo(current - total);
    } else if (current < total) {
        jumpTo(current + total);
    }

    isAnimating = false;
});

function next() {
    if (isAnimating) return;
    isAnimating = true;
    current++;
    updateActive(current);
    slider.style.transition = 'transform 0.4s ease';
    slider.style.transform = 'translateX(' + getTranslateX(current) + 'px)';
}

function prev() {
    if (isAnimating) return;
    isAnimating = true;
    current--;
    updateActive(current);
    slider.style.transition = 'transform 0.4s ease';
    slider.style.transform = 'translateX(' + getTranslateX(current) + 'px)';
}

applySize();
freezeSlides();
updateActive(current);
slider.style.transition = 'none';
slider.style.transform = 'translateX(' + getTranslateX(current) + 'px)';
slider.offsetHeight;
thawSlides();
