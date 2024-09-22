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
/*
// Dark/Light mode toggle
document.getElementById('mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
*/
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


const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let planets = [];
let fallingStars = [];
let interactiveFallingStars = [];
let particles = []; // New array for particle effects

const planetColors = ['#f39c12', '#e74c3c', '#3498db', '#9b59b6', '#27ae60', '#2ecc71'];

// Function to create random stars
function createStars(count) {
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.2,
            alpha: Math.random(),
            dx: (Math.random() - 0.5) * 0.1, // Reduced speed
            dy: (Math.random() - 0.5) * 0.1  // Reduced speed
        });
    }
}

// Create planets with orbits and moons
function createPlanets(count) {
    for (let i = 0; i < count; i++) {
        const distance = Math.random() * canvas.width / 4 + 100; // Increased distance for realistic spacing
        const radius = Math.random() * 20 + 10;
        planets.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            distance: distance,
            angle: Math.random() * Math.PI * 2,
            speed: 0.0005 + Math.random() * 0.0015, // Slower speeds for realistic orbits
            radius: radius,
            color: planetColors[i % planetColors.length], // Ensure unique colors
            moons: [] // Initialize moons array
        });

        // Add moons to 5 out of the first 6 planets
        if (i < 5) {
            const moonCount = i < 2 ? 2 : 1; // First 2 planets get 2 moons, others get 1
            const baseMoonDistance = radius + 30; // Base distance for the first moon, slightly further away
            for (let j = 0; j < moonCount; j++) {
                const moonDistance = baseMoonDistance + j * 50; // Increase distance for the second moon
                const moonSize = Math.random() * (radius / 4) + 2; // Smaller moons for smaller planets
                planets[i].moons.push({
                    distance: moonDistance,
                    angle: Math.random() * Math.PI * 2,
                    speed: 0.003 + Math.random() * 0.002, // Adjusted speed
                    size: moonSize // Store the size of the moon
                });
            }
        }
    }

    // Add an additional planet near the middle orbit without moons
    const middlePlanetDistance = canvas.width / 5;
    planets.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        distance: middlePlanetDistance,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0007 + Math.random() * 0.001, // Adjusted speed
        radius: Math.random() * 15 + 5, // Smaller planet
        color: planetColors[5], // Use the new color
        moons: [] // No moons for this planet
    });
}

// Function to create falling stars
function createFallingStar(x, y) {
    fallingStars.push({
        x: x,
        y: y,
        length: Math.random() * 80 + 10,
        speed: Math.random() * 5 + 3,
        alpha: 1,
        life: Math.random() * 30 + 50
    });
}

// Function to create particles for collision effects
function createParticles(x, y) {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particles.push({
            x: x,
            y: y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            alpha: 1,
            life: Math.random() * 20 + 30
        });
    }
}

// Draw stars with twinkling effect
function drawStars() {
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.alpha += (Math.random() - 0.5) * 0.02;
        if (star.alpha < 0) star.alpha = 0;
        if (star.alpha > 1) star.alpha = 1;

        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
    });
}

// Draw falling stars (background and interactive)
function drawFallingStars() {
    [...fallingStars, ...interactiveFallingStars].forEach((fallingStar, index) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${fallingStar.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fallingStar.x, fallingStar.y);
        ctx.lineTo(fallingStar.x + fallingStar.length, fallingStar.y + fallingStar.length);
        ctx.stroke();

        fallingStar.x += fallingStar.speed;
        fallingStar.y += fallingStar.speed;
        fallingStar.alpha -= 0.01;
        fallingStar.life -= 1;

        // Remove falling star if it's faded or its life is over
        if (fallingStar.alpha <= 0 || fallingStar.life <= 0) {
            if (index < fallingStars.length) {
                fallingStars.splice(index, 1); // Background stars
            } else {
                interactiveFallingStars.splice(index - fallingStars.length, 1); // Interactive stars
            }
        }
    });
}

// Draw planets with orbits and their moons
function drawPlanets() {
    planets.forEach(planet => {
        const orbitX = planet.x + Math.cos(planet.angle) * planet.distance;
        const orbitY = planet.y + Math.sin(planet.angle) * planet.distance;

        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.distance, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(orbitX, orbitY, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // Draw moons for the planet
        planet.moons.forEach(moon => {
            moon.angle -= moon.speed; // Clockwise rotation
            const moonX = orbitX + Math.cos(moon.angle) * moon.distance;
            const moonY = orbitY + Math.sin(moon.angle) * moon.distance;

            ctx.beginPath();
            ctx.arc(moonX, moonY, moon.size, 0, Math.PI * 2); // Use random moon size
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fill();
        });

        // Update planet angle to simulate rotation
        planet.angle += planet.speed;
    });
}

// Draw particles
function drawParticles() {
    particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 0, ${particle.alpha})`; // Yellow particles
        ctx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.alpha -= 0.02; // Fade out
        particle.life -= 1;

        // Remove particle if its life is over
        if (particle.alpha <= 0 || particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
}

// Check if cursor or touch is near a star
function checkStarInteraction(x, y) {
    stars.forEach(star => {
        const dx = star.x - x;
        const dy = star.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < star.radius + 10) { // Adjust the hit area as needed
            createFallingStar(star.x, star.y);
            star.alpha = 0; // Optionally make the star disappear
        }
    });
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars();
    drawFallingStars();
    drawPlanets();
    drawParticles(); // Draw particles

    // Randomly add background falling stars
    if (Math.random() < 0.02) {
        createFallingStar(Math.random() * canvas.width, Math.random() * canvas.height);
    }

    requestAnimationFrame(animate);
}

// Initial setup
createStars(900);  // Increased number of stars for density
createPlanets(8);  // Number of planets (including the new one without moons)
animate();

// Adjust canvas size dynamically
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mouse click event
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    checkStarInteraction(x, y);
});

// Touch event for mobile devices
canvas.addEventListener('touchstart', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const y = event.touches[0].clientY - rect.top;
    checkStarInteraction(x, y);
});
