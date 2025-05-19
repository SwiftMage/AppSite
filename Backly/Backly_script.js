document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    if (!carouselSlide || carouselImages.length === 0 || !prevButton || !nextButton) {
        // Carousel elements not found, do not proceed with script.
        // console.warn("Carousel elements not found. Ensure your HTML structure is correct.");
        return;
    }

    let currentIndex = 0;
    const totalImages = carouselImages.length;

    // Function to move to a specific slide
    function goToSlide(index) {
        if (index < 0) {
            currentIndex = totalImages - 1;
        } else if (index >= totalImages) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        // Update the carousel position
        const offset = -currentIndex * 100;
        carouselSlide.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Event listeners for next and previous buttons
    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Add click event listeners to dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
    });

    // Auto-play functionality
    const autoplayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    // Pause autoplay when user interacts with carousel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    // Resume autoplay when user leaves carousel
    carouselContainer.addEventListener('mouseleave', () => {
        clearInterval(autoplayInterval);
        setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });

    // Enable keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
        }
    });

    // Initialize carousel to the first image
    goToSlide(0);

    // Download button click event (placeholder)
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            alert('Download functionality will be implemented soon!');
        });
    }
}); 