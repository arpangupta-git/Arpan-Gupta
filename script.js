// Swipe functionality for touch devices
const sliders = document.querySelectorAll('.content-slider');

sliders.forEach(slider => {
    let startX;

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
        e.preventDefault(); // Prevent default behavior
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
const menu = document.getElementById('mobile-menu');
const hamburgerToggle = document.getElementById('hamburger-toggle');

// Function to toggle the menu
function toggleMenu() {
    menu.classList.toggle('active');
}

// Event listener for hamburger toggle
hamburgerToggle.addEventListener('click', toggleMenu);

// Close the menu when clicking outside of it
document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !hamburgerToggle.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Ensure the hamburger menu works after page loads
window.addEventListener('load', () => {
    menu.classList.remove('active'); // Reset menu state on load
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
