// 导航栏功能
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 汉堡菜单切换
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle menu-active class for pointer-events control
        if (navMenu.classList.contains('active')) {
            navbar.classList.add('menu-active');
            document.body.style.overflow = 'hidden';
        } else {
            navbar.classList.remove('menu-active');
            document.body.style.overflow = '';
        }
    });

    // 点击导航链接时关闭移动菜单并平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 只对内部锚点链接阻止默认行为并使用平滑滚动
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // 先关闭移动菜单，然后滚动
                const isMobileMenuOpen = hamburger.classList.contains('active');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navbar.classList.remove('menu-active');
                document.body.style.overflow = '';
                
                // 只在移动菜单打开时延迟，否则立即滚动
                if (isMobileMenuOpen) {
                    setTimeout(() => {
                        smoothScrollTo(targetId);
                    }, 50);
                } else {
                    smoothScrollTo(targetId);
                }
            } else {
                // 对外部链接，也要关闭移动菜单
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // 添加加载指示器（可选）
                this.style.opacity = '0.7';
            }
        });
        
        // 添加触摸反馈
        link.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 150);
        });
    });

    // 平滑滚动和活跃链接
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const navbarHeight = navbar.offsetHeight; // 动态获取导航栏高度
        const scrollPos = window.scrollY + navbarHeight + 30; // 增加缓冲区
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // 初始调用

    // 联系表单处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 通知显示函数
    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // 添加通知样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            animation: slideInRight 0.3s ease-out;
            ${type === 'success' ? 'background: #10b981;' : ''}
            ${type === 'error' ? 'background: #ef4444;' : ''}
            ${type === 'info' ? 'background: #3b82f6;' : ''}
        `;

        // 关闭按钮样式
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: 1rem;
        `;

        // 添加到页面
        document.body.appendChild(notification);

        // 关闭功能
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // 自动关闭
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // 滚动动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.research-card, .publication-item, .teaching-card, .contact-item, .interest-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 添加动画CSS类
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .research-card,
        .publication-item,
        .teaching-card,
        .contact-item,
        .interest-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .research-card.animate-in,
        .publication-item.animate-in,
        .teaching-card.animate-in,
        .contact-item.animate-in,
        .interest-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        /* 为不同元素添加延迟 */
        .research-card:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }
        .research-card:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }
        .research-card:nth-child(4).animate-in {
            transition-delay: 0.3s;
        }

        .teaching-card:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }
        .teaching-card:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }

        .interest-item:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }
        .interest-item:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }
        .interest-item:nth-child(4).animate-in {
            transition-delay: 0.3s;
        }
        .interest-item:nth-child(5).animate-in {
            transition-delay: 0.4s;
        }
        .interest-item:nth-child(6).animate-in {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);

    // 返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
    `;

    document.body.appendChild(backToTopBtn);

    // 显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // 返回顶部功能
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 鼠标悬停效果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });

    // 打字机效果（可选）
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // 为主标题添加打字机效果（可选，注释掉以禁用）
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 150);
    // }

    // 研究卡片悬停效果增强
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 社交链接悬停效果
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 出版物链接点击统计（可选）
    const pubLinks = document.querySelectorAll('.pub-link');
    pubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 这里可以添加点击统计代码
            console.log('Publication link clicked:', this.textContent.trim());
        });
    });

    // 移动设备优化
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }
    
    if (isMobileDevice()) {
        // 防止iOS Safari的橡皮筋效果
        document.addEventListener('touchmove', function(e) {
            if (navMenu.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // 处理iOS Safari的视口高度问题
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
        
        // 改进触摸反馈
        document.addEventListener('touchstart', function() {}, { passive: true });
    }
    
    // 页面加载完成后的初始化
    setTimeout(() => {
        // 移除加载动画类（如果有的话）
        document.body.classList.add('loaded');
        
        // 检查导航栏高度并调整
        const actualNavHeight = navbar.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${actualNavHeight}px`);
    }, 100);

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动菜单
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 点击菜单外部关闭菜单
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 触摸支持 - 防止意外点击
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const touchDiff = Math.abs(touchEndY - touchStartY);
        
        // 如果是滚动手势（移动距离 > 10px），不关闭菜单
        if (touchDiff > 10) return;
        
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 防抖函数用于优化滚动性能
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 优化滚动事件处理
    const debouncedScrollHandler = debounce(function() {
        updateActiveNav();
        
        // 视差效果（可选）
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);
});

// 工具函数
function smoothScrollTo(target, duration = 300) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 100; // 提高默认值
    const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 增加缓冲区
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// 响应式图片加载
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 初始化懒加载
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// 性能监控（可选）
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Toggle News Details Function
function toggleNews(headerElement) {
    headerElement.classList.toggle('collapsed');
    
    // Add smooth animation
    const newsDetails = headerElement.nextElementSibling;
    if (newsDetails && newsDetails.classList.contains('news-details')) {
        if (headerElement.classList.contains('collapsed')) {
            newsDetails.style.maxHeight = '0';
            newsDetails.style.opacity = '0';
        } else {
            newsDetails.style.maxHeight = newsDetails.scrollHeight + 'px';
            newsDetails.style.opacity = '1';
        }
    }
}

// Research Tab Functions
function openResearchTab(tabIndex) {
    // Get all tabs and panels
    const tabs = document.querySelectorAll('.research-tab');
    const panels = document.querySelectorAll('.research-panel');
    
    // Remove active class from all tabs and panels
    tabs.forEach(tab => tab.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to selected tab and panel
    const selectedTab = document.querySelector(`.research-tab[data-tab="${tabIndex}"]`);
    const selectedPanel = document.querySelector(`.research-panel[data-panel="${tabIndex}"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedPanel) selectedPanel.classList.add('active');
    
    // Smooth scroll to panel
    if (selectedPanel) {
        selectedPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Photo Carousel Functions
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Wrap around if index is out of bounds
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function moveCarousel(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(index) {
    showSlide(index);
}

// Auto-play carousel every 5 seconds
let carouselInterval;

function startCarousel() {
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        showSlide(0);
        startCarousel();
        
        // Pause on hover
        const carousel = document.querySelector('.photo-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopCarousel);
            carousel.addEventListener('mouseleave', startCarousel);
        }
    }
});

// Initialize publication year sections on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set proper max-height for initially active year
    const activeSection = document.querySelector('.year-section.active');
    if (activeSection) {
        const activeContent = activeSection.querySelector('.year-content');
        if (activeContent) {
            activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
        }
    }
});

// Publication year toggle function - only one year active at a time
function toggleYear(year) {
    const allSections = document.querySelectorAll('.year-section');
    const allNavBtns = document.querySelectorAll('.year-nav-btn');
    const selectedSection = document.getElementById('year-' + year);
    const selectedContent = selectedSection.querySelector('.year-content');
    const selectedIcon = selectedSection.querySelector('.year-icon');
    
    // Check if the selected year is already active
    const isActive = selectedSection.classList.contains('active');
    
    if (isActive) {
        // If clicking the active year, collapse it
        selectedSection.classList.remove('active');
        selectedContent.style.maxHeight = '0';
        selectedIcon.style.transform = 'rotate(-90deg)';
        
        // Deactivate all nav buttons
        allNavBtns.forEach(btn => btn.classList.remove('active'));
    } else {
        // Hide all other years
        allSections.forEach(section => {
            section.classList.remove('active');
            const content = section.querySelector('.year-content');
            const icon = section.querySelector('.year-icon');
            content.style.maxHeight = '0';
            icon.style.transform = 'rotate(-90deg)';
        });
        
        // Show only the selected year
        selectedSection.classList.add('active');
        selectedContent.style.maxHeight = selectedContent.scrollHeight + 'px';
        selectedIcon.style.transform = 'rotate(0deg)';
        
        // Update navigation buttons
        allNavBtns.forEach(btn => btn.classList.remove('active'));
        const selectedNavBtn = document.querySelector(`.year-nav-btn[onclick*="${year}"]`);
        if (selectedNavBtn) selectedNavBtn.classList.add('active');
        
        // Scroll to the year-title smoothly
        setTimeout(() => {
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const yearNavigation = document.querySelector('.year-navigation');
            const yearNavHeight = yearNavigation ? yearNavigation.offsetHeight : 0;
            const yearTitle = selectedSection.querySelector('.year-title');
            
            // Get the absolute position of the year-title from the top of the page
            let elementTop = 0;
            let element = yearTitle;
            while (element) {
                elementTop += element.offsetTop;
                element = element.offsetParent;
            }
            
            // Calculate offset: navbar + year navigation bar + some padding
            const totalOffset = navbarHeight + yearNavHeight + 40; // 40px padding
            const offsetPosition = elementTop - totalOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 100); // Small delay to allow content to start expanding
    }
}

// Particles Background Animation
(function() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep particles within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connecting lines between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Connect particles within 150px
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Pause animation when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
})();

// Light Particles Background Animation (white background, dark blue particles)
(function() {
    const canvasIds = ['particles-canvas-about', 'particles-canvas-join', 'particles-canvas-people', 'particles-canvas-publications'];
    
    canvasIds.forEach(canvasId => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationId;
        
        // Set canvas size
        function resizeCanvas() {
            const section = canvas.closest('section');
            if (section) {
                canvas.width = section.offsetWidth;
                canvas.height = section.offsetHeight;
            }
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                
                // Keep particles within bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 39, 76, 0.8)'; // Dark blue particles
                ctx.fill();
            }
        }
        
        // Create particles
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Draw connecting lines between nearby particles
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Connect particles within 150px
                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 39, 76, ${opacity})`; // Dark blue lines
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            drawConnections();
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        
        // Pause animation when page is not visible (performance optimization)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    });
})();

// Dark Particles Background Animation for Research Section (blue background, white particles)
(function() {
    const canvas = document.getElementById('particles-canvas-research');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        const section = canvas.closest('section');
        if (section) {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        }
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep particles within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // White particles
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connecting lines between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Connect particles within 150px
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; // White lines
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Pause animation when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
})();

/* =========================
   Page Tracker (localStorage)
   - Tracks page view, section view, time on page
   - No external dependency
========================= */
(function pageTracker() {
  const STORAGE_KEY = "deepthink_page_tracker_v1";

  function nowISO() {
    return new Date().toISOString();
  }

  function safeParse(json, fallback) {
    try { return JSON.parse(json); } catch { return fallback; }
  }

  function loadStore() {
    return safeParse(localStorage.getItem(STORAGE_KEY), {
      sessions: [],
      events: []
    });
  }

  function saveStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function pushEvent(type, payload = {}) {
    const store = loadStore();
    store.events.push({
      type,
      ts: nowISO(),
      path: location.pathname,
      url: location.href,
      referrer: document.referrer || null,
      ...payload
    });
    saveStore(store);
  }

  // Session start
  const sessionId = (crypto?.randomUUID?.() || String(Math.random()).slice(2));
  const startTs = Date.now();
  const store = loadStore();
  store.sessions.push({
    sessionId,
    startedAt: nowISO(),
    path: location.pathname,
    url: location.href
  });
  saveStore(store);

  // Page view
  pushEvent("page_view", {
    sessionId,
    title: document.title,
    userAgent: navigator.userAgent
  });

  // Track hash changes (e.g., clicking navbar #home)
  window.addEventListener("hashchange", () => {
    pushEvent("hash_change", {
      sessionId,
      hash: location.hash || "#"
    });
  });

  // Section tracking via IntersectionObserver
  const sections = Array.from(document.querySelectorAll("section[id]"));
  if (sections.length > 0 && "IntersectionObserver" in window) {
    const seen = new Set();

    const io = new IntersectionObserver((entries) => {
      // pick the most visible section
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

      if (!visible) return;

      const id = visible.target.id;
      if (!id) return;

      // Log first time a section becomes visible
      if (!seen.has(id)) {
        seen.add(id);
        pushEvent("section_view_first", { sessionId, sectionId: id });
      }

      // Also log every time it becomes the "primary" visible section
      pushEvent("section_view", {
        sessionId,
        sectionId: id,
        ratio: visible.intersectionRatio
      });
    }, {
      root: null,
      // trigger when ~55% visible
      threshold: [0.55]
    });

    sections.forEach(sec => io.observe(sec));
  }

  // Time on page (sent when leaving / background)
  function endSession(reason) {
    const durationMs = Date.now() - startTs;
    pushEvent("session_end", {
      sessionId,
      reason,
      durationMs
    });
  }

  // pagehide is more reliable than beforeunload on mobile
  window.addEventListener("pagehide", () => endSession("pagehide"), { once: true });

  // Also log when tab goes background
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") endSession("visibility_hidden");
  });

  // Optional: quick debug helper in console
  window.__pageTrackerDump = function () {
    return loadStore();
  };
})();
