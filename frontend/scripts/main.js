    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    }
    
    const searchBtn = document.getElementById('searchBtn');
    const cartBtn = document.getElementById('cartBtn');
    const searchModal = document.getElementById('searchModal');
    const cartModal = document.getElementById('cartModal');
    const closeSearch = document.getElementById('closeSearch');
    const closeCart = document.getElementById('closeCart')

    searchBtn.addEventListener('click', () => searchModal.classList.remove('hidden'));
    cartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));

    closeSearch.addEventListener('click', () => searchModal.classList.add('hidden'));
    closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
        
        if(!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        }
    });
    });

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card-hover');
        elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if(elementPosition < windowHeight - 100) {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
    };

    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    const wishlistButtons = document.querySelectorAll('.fa-heart');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('text-red-500');
        this.classList.toggle('text-primary');
    });
    });