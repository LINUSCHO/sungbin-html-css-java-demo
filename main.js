// 공지사항 슬라이더
let currentAnnouncementIndex = 0;
const announcementItems = document.querySelectorAll('.announcement-item');

function showAnnouncement(index) {
    announcementItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function nextAnnouncement() {
    currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcementItems.length;
    showAnnouncement(currentAnnouncementIndex);
}

// 공지사항 자동 슬라이드 (5초마다)
setInterval(nextAnnouncement, 5000);

// 모바일 메뉴 토글
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navItems = document.querySelectorAll('.nav-item');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    
    // 햄버거 아이콘 애니메이션
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mainNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// 모바일 드롭다운 토글
navItems.forEach(item => {
    const link = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown');
    
    if (dropdown && window.innerWidth <= 768) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('active');
        });
    }
});

// 히어로 슬라이더
let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
const heroDots = document.getElementById('heroDots');

// 도트 생성
heroSlides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('hero-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    heroDots.appendChild(dot);
});

const dots = document.querySelectorAll('.hero-dot');

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

heroNext.addEventListener('click', nextSlide);
heroPrev.addEventListener('click', prevSlide);

// 히어로 자동 슬라이드 (7초마다)
setInterval(nextSlide, 7000);

// 위시리스트 버튼
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        this.style.color = this.style.color === 'red' ? '#1a1a1a' : 'red';
        this.textContent = this.style.color === 'red' ? '♥' : '♡';
    });
});

// 장바구니 추가 애니메이션
const productCards = document.querySelectorAll('.product-card');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
let itemCount = 0;

productCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('wishlist-btn')) {
            itemCount++;
            cartCount.textContent = itemCount;
            
            // 장바구니 아이콘 애니메이션
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 300);
            
            // 알림 표시
            showNotification('장바구니에 상품이 추가되었습니다');
        }
    });
});

// 뉴스레터 폼
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const checkboxes = document.querySelectorAll('.newsletter-consent input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    if (allChecked) {
        showNotification('이메일 구독이 완료되었습니다!');
        this.reset();
    } else {
        showNotification('필수 동의 항목을 체크해주세요', 'error');
    }
});

// 알림 표시 함수
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 알림 애니메이션 스타일 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 컬렉션 카드와 제품 카드에 애니메이션 적용
document.querySelectorAll('.collection-card, .product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// 검색 버튼 기능
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    const searchQuery = prompt('검색어를 입력하세요:');
    if (searchQuery) {
        showNotification(`"${searchQuery}" 검색 결과를 찾고 있습니다...`);
    }
});

// 계정 버튼 기능
const accountBtn = document.querySelector('.account-btn');
accountBtn.addEventListener('click', () => {
    showNotification('로그인 페이지로 이동합니다');
});

// 반응형 처리
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mainNav.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// 페이지 로드 완료 후 초기화
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('Ralph Lauren 쇼핑몰 페이지가 로드되었습니다.');
});

