/* ================================
   UNIVERSAL PARTICLE SYSTEM
   Reusable for all pages
   ================================ */

class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        
        // Configurable options
        this.config = {
            particleCount: options.particleCount || 100,
            particleColor: options.particleColor || 'rgba(0, 245, 255, 0.9)',
            connectionColor: options.connectionColor || 'rgba(0, 245, 255, 0.2)',
            connectionDistance: options.connectionDistance || 150,
            particleSize: options.particleSize || 2,
            speed: options.speed || 0.5,
            mouseInteraction: options.mouseInteraction !== false
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        if (this.config.mouseInteraction) {
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
            
            window.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.config));
        }
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    this.ctx.strokeStyle = this.config.connectionColor.replace('0.15', opacity * 0.15);
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });
        
        this.connectParticles();
    }
}

class Particle {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = config.particleSize;
        this.baseSpeedX = (Math.random() - 0.5) * config.speed;
        this.baseSpeedY = (Math.random() - 0.5) * config.speed;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
    }
    
    update(mouse) {
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;
                this.speedX = this.baseSpeedX + Math.cos(angle) * force * 2;
                this.speedY = this.baseSpeedY + Math.sin(angle) * force * 2;
            } else {
                // Gradually return to base speed
                this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
            }
        }
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Boundary checking
        if (this.x < 0 || this.x > this.canvas.width) {
            this.baseSpeedX *= -1;
            this.speedX *= -1;
            this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        }
        
        if (this.y < 0 || this.y > this.canvas.height) {
            this.baseSpeedY *= -1;
            this.speedY *= -1;
            this.y = Math.max(0, Math.min(this.canvas.height, this.y));
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = this.config.particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

/* ================================
   CUSTOM CURSOR SYSTEM
   ================================ */

class CustomCursor {
    constructor(options = {}) {
        this.options = {
            enabled: options.enabled !== false,
            trailLength: options.trailLength || 20,
            color: options.color || '#00f5ff'
        };
        
        if (this.options.enabled && !this.isTouchDevice()) {
            this.init();
        }
    }
    
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    init() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        document.querySelectorAll('a, button, [role="button"]').forEach(el => {
            el.style.cursor = 'none';
        });
        
        // Create custom cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        this.trails = [];
        this.maxTrails = this.options.trailLength;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => this.moveCursor(e));
        document.addEventListener('mousedown', () => this.cursor.classList.add('clicking'));
        document.addEventListener('mouseup', () => this.cursor.classList.remove('clicking'));
        
        // Hover effects
        document.querySelectorAll('a, button, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hovering'));
        });
    }
    
    moveCursor(e) {
        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';
        
        // Create trail
        this.createTrail(e.clientX, e.clientY);
    }
    
    createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        this.trails.push(trail);
        
        // Remove old trails
        if (this.trails.length > this.maxTrails) {
            const oldTrail = this.trails.shift();
            oldTrail.remove();
        }
        
        // Remove trail after animation
        setTimeout(() => {
            trail.remove();
            this.trails = this.trails.filter(t => t !== trail);
        }, 500);
    }
}

/* ================================
   INITIALIZATION HELPERS
   ================================ */

function initUniversalBackground(options = {}) {
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'bgCanvas';
    document.body.prepend(canvas);
    
    // Create gradient orbs
    for (let i = 1; i <= 3; i++) {
        const orb = document.createElement('div');
        orb.className = `bg-orb bg-orb-${i}`;
        document.body.prepend(orb);
    }
    
    // Initialize particle system
    const particleSystem = new ParticleSystem(canvas, options.particles || {});
    
    // Initialize custom cursor
    const cursor = new CustomCursor(options.cursor || {});
    
    return { particleSystem, cursor };
}

// Auto-initialize if data attribute is present
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.hasAttribute('data-universal-bg')) {
        const options = JSON.parse(document.body.getAttribute('data-universal-bg') || '{}');
        initUniversalBackground(options);
    }
});
