document.addEventListener('DOMContentLoaded', () => {
        const lampWrapper = document.getElementById('lampWrapper');
        const lightBeam = document.getElementById('lightBeam');

        if (!lampWrapper || !lightBeam) return;

        let posX = 0;
        let direction = 1;
        const minX = -180;
        const maxX = 180;
        const speed = 1.6;

        function animateLamp() {
            posX += speed * direction;

            if (posX >= maxX) {
                direction = -1;
            } else if (posX <= minX) {
                direction = 1;
            }

            const jumpCycle = Math.abs(Math.sin(posX * 0.05));
            const posY = -jumpCycle * 30;

            const beamAngle = (direction * 12) + (Math.cos(posX * 0.05) * 8);

            lampWrapper.style.transform = `translate(${posX}px, ${posY}px)`;
            lightBeam.style.transform = `rotate(${beamAngle}deg)`;

            requestAnimationFrame(animateLamp);
        }

        animateLamp();
    });
// Apply saved theme state on page load
(function syncTheme() {
    const savedTheme = localStorage.getItem('theme'); // Adjust key if your settings page uses another name (e.g., 'appTheme')
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
})();
