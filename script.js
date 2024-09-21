// DOM Elements for Sliders
const sliders = document.querySelectorAll('.content-slider');

// Function to adjust the slider container height based on content
function adjustSliderHeight(slider) {
    const sliderContent = slider.querySelector('.slider');
    const items = Array.from(sliderContent.children);
    const heights = items.map(item => item.scrollHeight);
    const maxHeight = Math.max(...heights);
    sliderContent.style.height = `${maxHeight}px`;
}

// Ensure the height adjustment happens after images load
function initSlider() {
    sliders.forEach(adjustSliderHeight);
}

// Adjust heights on page load and resize
window.addEventListener('load', initSlider);
window.addEventListener('resize', initSlider);

// Functionality for sliding left and right
const slideLeft = (slider) => {
    const sliderContent = slider.querySelector('.slider');
    sliderContent.appendChild(sliderContent.firstElementChild);
    adjustSliderHeight(slider);
};

const slideRight = (slider) => {
    const sliderContent = slider.querySelector('.slider');
    sliderContent.insertBefore(sliderContent.lastElementChild, sliderContent.firstElementChild);
    adjustSliderHeight(slider);
};

// Add event listeners for slider arrow buttons (you can add buttons in HTML)
document.querySelectorAll('.left-arrow').forEach(button => {
    button.addEventListener('click', () => {
        const slider = button.closest('.content-slider');
        slideRight(slider);
    });
});

document.querySelectorAll('.right-arrow').forEach(button => {
    button.addEventListener('click', () => {
        const slider = button.closest('.content-slider');
        slideLeft(slider);
    });
});

// Swipe functionality for touch devices
sliders.forEach(slider => {
    let startX;

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;

        if (Math.abs(diffX) > 30) { // Threshold for swipe
            if (diffX > 0) {
                slideLeft(slider); // Swipe left
            } else {
                slideRight(slider); // Swipe right
            }
            startX = null; // Reset startX after handling swipe
        }
    };

    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const activeSlider = document.activeElement.closest('.content-slider');
    if (activeSlider) {
        if (e.key === 'ArrowLeft') {
            slideRight(activeSlider); 
        } else if (e.key === 'ArrowRight') {
            slideLeft(activeSlider); 
        }
    }
});

// Mouse dragging functionality
sliders.forEach(slider => {
    const sliderContent = slider.querySelector('.slider');
    let isDragging = false;
    let startX;
    let scrollLeft;

    sliderContent.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - sliderContent.offsetLeft;
        scrollLeft = sliderContent.scrollLeft;
    });

    sliderContent.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    sliderContent.addEventListener('mouseup', () => {
        isDragging = false;
    });

    sliderContent.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderContent.offsetLeft;
        const walk = (x - startX) * 2; 
        sliderContent.scrollLeft = scrollLeft - walk;
    });
});

// Lightbox for images
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

document.querySelectorAll('.uploaded-photos-view img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src));
});

// Dynamic loading for images
document.querySelectorAll('.uploaded-photos-view img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});
