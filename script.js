const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
const toggleButton = document.getElementById("toggleParticles");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let animationId;
let particlesEnabled = true; // Track if particles are enabled

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    animationId = requestAnimationFrame(animate);
}

// Toggle function
toggleButton.addEventListener("click", () => {
    if (particlesEnabled) {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesEnabled = false;
        toggleButton.textContent = "ENABLE IT BACK :DDD";
    } else {
        initParticles();
        animate();
        particlesEnabled = true;
        toggleButton.textContent = "disable snowww :(";
    }
});

// Auto-start animation
initParticles();
animate();
