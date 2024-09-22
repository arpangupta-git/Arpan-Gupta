// Swipe functionality for touch devices
const sliders = document.querySelectorAll('.content-slider');

sliders.forEach(slider => {
    let startX;

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;

        if (Math.abs(diffX) > 30) {
            if (diffX > 0) {
                slideLeft(slider);
            } else {
                slideRight(slider);
            }
            startX = null;
        }
    };

    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
});

// Hamburger menu toggle
document.getElementById('hamburger-toggle').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
});

// Close the menu when clicking outside of it
document.addEventListener('click', function (event) {
    const menu = document.getElementById('mobile-menu');
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    
    if (!menu.contains(event.target) && !hamburgerToggle.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Dark/Light mode toggle
document.getElementById('mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
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

// Enable image lazy loading
document.querySelectorAll('.content-slider img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// Function to slide left (for sliders)
function slideLeft(slider) {
    slider.scrollBy({ left: -slider.offsetWidth, behavior: 'smooth' });
}

// Function to slide right (for sliders)
function slideRight(slider) {
    slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
}
// Close the hamburger menu when clicking outside of it
document.addEventListener('click', function (event) {
    const menu = document.getElementById('mobile-menu');
    const hamburgerToggle = document.getElementById('hamburger-toggle');

    // Check if the click was outside the menu and the hamburger toggle
    if (!menu.contains(event.target) && !hamburgerToggle.contains(event.target)) {
        menu.classList.remove('active');
        menu.style.display = 'none'; // Ensure it is hidden
    }
});
