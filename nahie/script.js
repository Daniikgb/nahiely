const sky = document.getElementById('sky-canvas');
const field = document.getElementById('flower-field');

function createStars() {
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${Math.random() * 4 + 3}s`);
        sky.appendChild(star);
    }
}

function createFlowers() {
    // White Lilies (Hyper-Artistic)
    for (let i = 0; i < 22; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.left = `${Math.random() * 100}%`;

        const height = 100 + Math.random() * 50;
        flower.style.setProperty('--height', `${height}px`);
        flower.style.setProperty('--sway-duration', `${4 + Math.random() * 2}s`);
        flower.style.animationDelay = `${Math.random() * 3}s`;
        flower.style.zIndex = 100 + Math.floor(Math.random() * 50);

        const stem = document.createElement('div');
        stem.className = 'stem';
        stem.style.height = `${height}px`;

        const head = document.createElement('div');
        head.className = 'lily-head';

        // Add Tube
        const tube = document.createElement('div');
        tube.className = 'lily-tube';
        head.appendChild(tube);

        // 6 Petals
        for (let j = 1; j <= 6; j++) {
            const petal = document.createElement('div');
            petal.className = `lily-petal l-p${j}`;
            head.appendChild(petal);
        }

        // Multi-Filaments
        const filaments = document.createElement('div');
        filaments.className = 'lily-filaments';
        for (let j = 1; j <= 3; j++) {
            const stamen = document.createElement('div');
            stamen.className = `stamen s${j}`;
            filaments.appendChild(stamen);
        }
        head.appendChild(filaments);

        flower.appendChild(head);
        flower.appendChild(stem);
        field.appendChild(flower);
    }

    // Blue Tulips (Increased to ~70)
    for (let i = 0; i < 70; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.left = `${Math.random() * 100}%`;

        const height = 40 + Math.random() * 45;
        flower.style.setProperty('--height', `${height}px`);
        flower.style.setProperty('--sway-duration', `${3 + Math.random() * 2}s`);
        flower.style.animationDelay = `${Math.random() * 5}s`;
        flower.style.zIndex = Math.floor(height);

        const stem = document.createElement('div');
        stem.className = 'stem';
        stem.style.height = `${height}px`;

        const head = document.createElement('div');
        head.className = 'tulip-head';
        const colors = ['#2563eb', '#3b82f6', '#1e40af'];
        flower.style.setProperty('--flower-color', colors[Math.floor(Math.random() * colors.length)]);

        for (let j = 1; j <= 4; j++) {
            const petal = document.createElement('div');
            petal.className = `tulip-petal t-p${j}`;
            head.appendChild(petal);
        }
        flower.appendChild(head);
        flower.appendChild(stem);
        field.appendChild(flower);
    }
}

function createComet() {
    const comet = document.createElement('div');
    comet.className = 'comet';
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight / 2);
    const length = Math.random() * 150 + 100;

    comet.style.left = `${startX}px`;
    comet.style.top = `${startY}px`;
    comet.style.width = `${length}px`;
    comet.style.transform = `rotate(-45deg)`;
    sky.appendChild(comet);

    comet.animate([
        { transform: 'translateX(0) translateY(0) rotate(-45deg)', opacity: 0 },
        { transform: 'translateX(-20px) translateY(20px) rotate(-45deg)', opacity: 0.8, offset: 0.1 },
        { transform: `translateX(-${length * 4}px) translateY(${length * 4}px) rotate(-45deg)`, opacity: 0 }
    ], {
        duration: 700 + Math.random() * 800,
        easing: 'ease-in'
    }).onfinish = () => comet.remove();
}

// Parallax effect for the character image
document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.character-container');
    if (!container) return;

    const img = container.querySelector('.character-img');
    if (!img) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (mouseX - centerX) / centerX;
    const percentY = (mouseY - centerY) / centerY;

    const rotateX = percentY * 10; // Max rotation 10deg
    const rotateY = percentX * -10; // Max rotation 10deg
    const moveX = percentX * 20; // Max move 20px
    const moveY = percentY * 20; // Max move 20px

    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${moveX}px, ${moveY}px)`;
});

createStars();
createFlowers();
setInterval(createComet, 1500); // Higher frequency: ~1.5s
createComet();
