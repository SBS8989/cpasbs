// 테마 토글 기능
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// 로컬 스토리지에서 테마 설정 불러오기
if (localStorage.getItem('theme') === 'dark') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
}

// 테마 토글 버튼 클릭 이벤트
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    // 모드 변경 시 로컬 스토리지에 저장
    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-menu');
});

// 메뉴 링크 클릭시 모바일 메뉴 닫기
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-menu');
        hamburger.classList.remove('active');
    });
});

// 스크롤 애니메이션
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.expertise-card, .service-card, .contact-card, .career-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if(elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // 초기 로드 시 실행

// 스탯 숫자 카운터 애니메이션
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(number => {
        const finalValue = number.getAttribute('data-count');
        const duration = 2000; // 애니메이션 시간 (ms)
        const startTime = Date.now();
        const tick = 50; // 업데이트 간격 (ms)
        
        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        
        const updateNumber = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            if(elapsedTime < duration) {
                const progress = elapsedTime / duration;
                const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
                const currentValue = Math.floor(easeProgress * finalValue);
                number.textContent = numberWithCommas(currentValue);
                setTimeout(updateNumber, tick);
            } else {
                number.textContent = numberWithCommas(finalValue);
            }
        };
        
        updateNumber();
    });
};

// 스탯 섹션 관찰 시작
const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateNumbers();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsContainer);
}

// 스크롤시 네비게이션 스타일 변경
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 현재 연도 자동 업데이트
const currentYear = new Date().getFullYear();
document.querySelector('.footer-copyright p').textContent = `© ${currentYear} 손보승 회계사. All Rights Reserved.`;

// 페이지 로드 완료시 로딩 애니메이션
setTimeout(() => {
    document.body.classList.add('loaded');
}, 300);

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            // 모바일 메뉴 열려있을 경우 닫기
            if(navLinks.classList.contains('mobile-menu')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-menu');
            }
            
            // 스크롤 애니메이션
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 