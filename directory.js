// ===== FLOATING PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['#ff69b4', '#FF6B00', '#ff0000', '#ffffff', '#fbcfe8'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 10;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = left + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
    }
}

createParticles();

// ===== CLICK NAVIGATION =====
function goToTicket(artist, clickedEvent) {
    const eventObject = clickedEvent || window.event;
    if (eventObject) eventObject.stopPropagation();
    const ticket = eventObject && eventObject.currentTarget
        ? eventObject.currentTarget
        : document.activeElement;
    const rect = ticket.getBoundingClientRect();
    const x = eventObject.clientX - rect.left;
    const y = eventObject.clientY - rect.top;
    
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ticket.appendChild(ripple);
    
    const ticketPages = {
        ariana: "artist.html?id=ariana",
        taylor: "artist.html?id=taylor",
        bruno: "artist.html?id=bruno",
        justin: "artist.html?id=justin",
        sabrina: "artist.html?id=sabrina",
        billie: "artist.html?id=billie",
        olivia: "artist.html?id=olivia"
    };

    // Check whether the artist has a page
    if (ticketPages[artist]) {

        window.location.href = ticketPages[artist];

    } else {

        console.error("Ticket page not found for:", artist);

    }
}


// ===== HOVER TILT EFFECT =====
document.querySelectorAll('.ticket').forEach(ticket => {
    ticket.addEventListener('mousemove', (e) => {
        const rect = ticket.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        ticket.style.transform =` perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    ticket.addEventListener('mouseleave', () => {
        ticket.style.transform = '';
    });
});

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.ticket').forEach(ticket => {
    observer.observe(ticket);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    const tickets = document.querySelectorAll('.ticket');
    const focused = document.activeElement;
    const currentIndex = Array.from(tickets).indexOf(focused);
    
    if (e.key === 'ArrowDown' && currentIndex < tickets.length - 1) {
        tickets[currentIndex + 1].focus();
        tickets[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        tickets[currentIndex - 1].focus();
        tickets[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (e.key === 'Enter' && focused.classList.contains('ticket')) {
        focused.click();
    }
});
function goBack() {
            if (
                window.parent &&
                window.parent !== window &&
                typeof window.parent.goToPage === "function"
            ) {
                window.parent.goToPage(
                    "home.html"
                );
                return;
            }

            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href =
                    "home.html";
            }
        }
