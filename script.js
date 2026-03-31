let current = 0;

const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const container = document.querySelector('.slider-wrapper');


const sizeDivider = 2.5;

function applySize() {
    const containerWidth = container.offsetWidth;
    const slideW = containerWidth / sizeDivider;
    const slideH = slideW * 0.6; // height is 60% of width

    slides.forEach(function(slide) {
        slide.style.minWidth = slideW + 'px';
        slide.style.height = slideH + 'px';
    });
}

function update() {
    const slideWidth = slides[0].offsetWidth + 20; // width + margin
    const containerWidth = container.offsetWidth;
    const centerOffset = containerWidth / 2 - slideWidth / 2;

    slider.style.transform = 'translateX(' + (-current * slideWidth + centerOffset) + 'px)';



    slides.forEach(function(slide, index) {
        slide.classList.remove('active');
        if (index === current) {
            slide.classList.add('active');
        }
    });



}

function next() {
    if (current < slides.length - 1) {
        current = current + 1;
    } else {
        current = 0;
    }
    update();
}

function prev() {
    if (current > 0) {
        current = current - 1;
    } else {
        current = slides.length - 1;
    }
    update();
}

applySize();
update();