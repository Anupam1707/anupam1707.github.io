/* ================================
   ULTRA MODERN SPLASH SCREEN
   Advanced particle system + smooth animations
   ================================ */

(function() {
    'use strict';
    
    // ================================
    // PARTICLE SYSTEM
    // ================================
    class ParticleSystem {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 150;
            this.connectionDistance = 150;
            this.mouse = { x: null, y: null, radius: 150 };
            
            this.resize();
            this.init();
            this.animate();
            this.addEventListeners();
        }
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        addEventListeners() {
            window.addEventListener('resize', () => this.resize());
            
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
            
            window.addEventListener('mouseout', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
        
        init() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                const size = Math.random() * 3 + 1;
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                const speedX = (Math.random() - 0.5) * 0.5;
                const speedY = (Math.random() - 0.5) * 0.5;
                const color = this.getRandomColor();
                
                this.particles.push(new Particle(x, y, size, speedX, speedY, color));
            }
        }
        
        getRandomColor() {
            const colors = [
                'rgba(96, 165, 250, 0.8)',   // Blue
                'rgba(6, 182, 212, 0.8)',    // Cyan
                'rgba(167, 139, 250, 0.8)',  // Purple
                'rgba(255, 255, 255, 0.6)'   // White
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw particles
            this.particles.forEach((particle, index) => {
                particle.update(this.canvas, this.mouse);
                particle.draw(this.ctx);
                
                // Connect particles
                for (let j = index + 1; j < this.particles.length; j++) {
                    const dx = particle.x - this.particles[j].x;
                    const dy = particle.y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.connectionDistance) {
                        const opacity = (1 - distance / this.connectionDistance) * 0.3;
                        this.ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            });
            
            requestAnimationFrame(() => this.animate());
        }
    }
    
    // ================================
    // PARTICLE CLASS
    // ================================
    class Particle {
        constructor(x, y, size, speedX, speedY, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.baseSize = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.color = color;
            this.baseX = x;
            this.baseY = y;
        }
        
        update(canvas, mouse) {
            // Boundary checking
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
            
            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceX = dx / distance;
                    const forceY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    
                    this.x -= forceX * force * 3;
                    this.y -= forceY * force * 3;
                    this.size = this.baseSize * (1 + force * 0.5);
                } else {
                    this.size = this.baseSize;
                }
            }
            
            // Move particle
            this.x += this.speedX;
            this.y += this.speedY;
        }
        
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // ================================
    // LOADING MANAGER
    // ================================
    class LoadingManager {
        constructor() {
            this.loadingBar = document.getElementById('loadingBar');
            this.loadingPercent = document.getElementById('loadingPercent');
            this.loadingStatus = document.getElementById('loadingStatus');
            this.splashScreen = document.getElementById('splashScreen');
            
            this.progress = 0;
            this.targetProgress = 0;
            this.loadingSteps = [
                { progress: 20, status: 'Loading core assets...', duration: 400 },
                { progress: 40, status: 'Initializing components...', duration: 500 },
                { progress: 60, status: 'Preparing interface...', duration: 400 },
                { progress: 80, status: 'Optimizing experience...', duration: 500 },
                { progress: 100, status: 'Ready to launch!', duration: 400 }
            ];
            
            this.currentStep = 0;
            this.start();
        }
        
        start() {
            this.loadNextStep();
        }
        
        loadNextStep() {
            if (this.currentStep >= this.loadingSteps.length) {
                setTimeout(() => this.complete(), 500);
                return;
            }
            
            const step = this.loadingSteps[this.currentStep];
            this.targetProgress = step.progress;
            this.loadingStatus.textContent = step.status;
            
            this.animateProgress(step.duration);
            
            this.currentStep++;
            setTimeout(() => this.loadNextStep(), step.duration + 100);
        }
        
        animateProgress(duration) {
            const start = this.progress;
            const end = this.targetProgress;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out-cubic)
                const eased = 1 - Math.pow(1 - progress, 3);
                
                this.progress = start + (end - start) * eased;
                this.updateUI();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        }
        
        updateUI() {
            this.loadingBar.style.width = `${this.progress}%`;
            this.loadingPercent.textContent = `${Math.round(this.progress)}%`;
        }
        
        complete() {
            // Add celebration effect
            this.addSparkles();
            
            // Wait for sparkles, then fade out
            setTimeout(() => {
                this.splashScreen.classList.add('hide');
                
                // Navigate to home page after animation
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }, 800);
        }
        
        addSparkles() {
            const splash = document.querySelector('.splash-content');
            const colors = ['#60a5fa', '#06b6d4', '#a78bfa', '#ffffff'];
            
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.style.cssText = `
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        border-radius: 50%;
                        pointer-events: none;
                        left: 50%;
                        top: 50%;
                        animation: sparkleOut 0.8s ease-out forwards;
                        box-shadow: 0 0 10px currentColor;
                    `;
                    
                    const angle = (Math.PI * 2 * i) / 30;
                    const distance = 100 + Math.random() * 100;
                    
                    sparkle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                    sparkle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
                    
                    splash.appendChild(sparkle);
                    
                    setTimeout(() => sparkle.remove(), 800);
                }, i * 20);
            }
            
            // Add sparkle animation to styles
            if (!document.getElementById('sparkle-styles')) {
                const style = document.createElement('style');
                style.id = 'sparkle-styles';
                style.textContent = `
                    @keyframes sparkleOut {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(var(--tx), var(--ty)) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
    
    // ================================
    // CUSTOM CURSOR EFFECT
    // ================================
    class CustomCursor {
        constructor() {
            this.cursor = null;
            this.trails = [];
            this.maxTrails = 20;
            this.init();
        }
        
        init() {
            // Create custom cursor element
            this.cursor = document.createElement('div');
            this.cursor.className = 'custom-cursor';
            document.body.appendChild(this.cursor);
            
            // Mouse move
            document.addEventListener('mousemove', (e) => {
                this.cursor.style.left = `${e.clientX}px`;
                this.cursor.style.top = `${e.clientY}px`;
                
                // Create trail
                this.createTrail(e.clientX, e.clientY);
            });
            
            // Mouse down
            document.addEventListener('mousedown', () => {
                this.cursor.classList.add('clicking');
            });
            
            // Mouse up
            document.addEventListener('mouseup', () => {
                this.cursor.classList.remove('clicking');
            });
            
            // Hover on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .status-badge');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('hovering');
                });
                
                el.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('hovering');
                });
            });
        }
        
        createTrail(x, y) {
            if (this.trails.length >= this.maxTrails) return;
            
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            document.body.appendChild(trail);
            
            this.trails.push(trail);
            
            setTimeout(() => {
                trail.remove();
                this.trails.shift();
            }, 500);
        }
    }
    
    // ================================
    // INITIALIZE ON PAGE LOAD
    // ================================
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize particle system
        const canvas = document.getElementById('particleCanvas');
        if (canvas) {
            new ParticleSystem(canvas);
        }
        
        // Initialize loading manager
        new LoadingManager();
        
        // Initialize custom cursor (only on desktop)
        if (window.innerWidth > 768) {
            new CustomCursor();
        }
        
        // Add keyboard skip (press Space or Enter to skip)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                const splash = document.getElementById('splashScreen');
                splash.classList.add('hide');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }
        });
    });
    
    // ================================
    // PREVENT FLICKERING
    // ================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
})();

