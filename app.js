// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Starting app...');

    // ===== GET ELEMENTS =====
    const intro = document.getElementById('introScreen');
    const mainApp = document.getElementById('mainApp');
    const enterBtn = document.getElementById('enterBtn');
    const darkToggle = document.getElementById('darkToggle');
    
    // ===== VARIABLES =====
    let love = parseInt(localStorage.getItem('loveCount')) || 0;
    let currentSlide = 0;
    let slides = [];
    let autoSlideInterval;

    // ===== ENTER BUTTON =====
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            console.log('Enter clicked!');
            
            // Hide intro
            intro.style.display = 'none';
            
            // Show main app
            mainApp.style.display = 'block';
            
            // Show dark toggle
            darkToggle.style.display = 'block';
            
            // Update love display
            document.getElementById('loveCount').textContent = love;
            
            // Initialize features
            initTypewriter();
            initSlider();
            initEventListeners();
        });
    }

    // ===== TYPEWRITER =====
    function initTypewriter() {
        const text = "To the most caring, loving, intelligent and beautiful Girl I know 💖";
        const element = document.getElementById('typewriter');
        let i = 0;
        
        if (!element) return;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    // ===== SLIDER =====
    function initSlider() {
        slides = document.querySelectorAll('.slide');
        updateSlideIndicator();
        
        // Clear existing interval
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        
        // Start auto slide
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function nextSlide() {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        updateSlideIndicator();
    }

    function prevSlide() {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        updateSlideIndicator();
    }

    function updateSlideIndicator() {
        const indicator = document.getElementById('slideIndicator');
        if (indicator) {
            indicator.textContent = (currentSlide + 1) + '/8';
        }
    }

    // ===== LOVE COUNTER =====
    function addLove() {
        love++;
        document.getElementById('loveCount').textContent = love;
        localStorage.setItem('loveCount', love);
        
        // Create heart pop
        const heart = document.createElement('div');
        heart.className = 'heart-pop';
        heart.innerHTML = '❤️';
        heart.style.left = '50%';
        heart.style.top = '50%';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }

    // ===== NEW MESSAGE =====
    function newMessage() {
        const messages = [
            "You make work feel lighter ✨",
            "Your smile changes everything 💖",
            "You are rare and unforgettable 🌹",
            "Ann, you are appreciated more than you know 💫",
            "Every day with you is a blessing 🌺",
            "You bring sunshine to the office ☀️",
            "Your kindness knows no bounds 💝",
            "You're not just a colleague, you're family 💕"
        ];
        
        const random = Math.floor(Math.random() * messages.length);
        const msgEl = document.getElementById('dynamicMessage');
        
        if (msgEl) {
            msgEl.style.opacity = '0';
            setTimeout(() => {
                msgEl.textContent = messages[random];
                msgEl.style.opacity = '1';
            }, 200);
        }
        
        createConfetti(15);
    }

    // ===== CELEBRATE =====
    function celebrate() {
        createConfetti(50);
    }

    // ===== SECRET MODAL =====
    const modal = document.getElementById('secretModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function showSecret() {
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // ===== DARK MODE =====
    if (darkToggle) {
        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }

    // ===== CONFETTI =====
    function createConfetti(count) {
        const colors = ['#ff2e63', '#6c5ce7', '#00cec9', '#fdcb6e', '#e84342', '#0984e3'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 2900);
            }, i * 20);
        }
    }

    // ===== INIT EVENT LISTENERS =====
    function initEventListeners() {
        // Slider buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Love counter
        const loveCard = document.getElementById('loveCard');
        if (loveCard) {
            loveCard.addEventListener('click', addLove);
        }
        
        // New message button
        const newMsgBtn = document.getElementById('newMessageBtn');
        if (newMsgBtn) {
            newMsgBtn.addEventListener('click', newMessage);
        }
        
        // Celebrate button
        const celebrateBtn = document.getElementById('celebrateBtn');
        if (celebrateBtn) {
            celebrateBtn.addEventListener('click', celebrate);
        }
        
        // Secret button
        const secretBtn = document.getElementById('secretBtn');
        if (secretBtn) {
            secretBtn.addEventListener('click', showSecret);
        }
    }

    // ===== TOUCH GESTURES FOR SLIDER =====
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        let touchStartX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }, { passive: true });
    }

    // ===== IMAGE FALLBACK =====
    const images = document.querySelectorAll('.slide');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%23ff2e63\'/%3E%3Ctext x=\'50\' y=\'115\' font-size=\'50\' fill=\'white\'%3E💖%3C/text%3E%3C/svg%3E';
        };
    });

    console.log('App initialized successfully!');
});
