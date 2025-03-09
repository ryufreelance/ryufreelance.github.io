const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');

let width, height, particles;

function initCanvas() {
    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;
    particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > width || this.x < 0) this.vx *= -1;
        if (this.y > height || this.y < 0) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#1e90ff';
        ctx.fill();
    }
}

function drawNeuralNetwork() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
        p.move();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(30, 144, 255, ${1 - distance / 100})`;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(drawNeuralNetwork);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawNeuralNetwork();
