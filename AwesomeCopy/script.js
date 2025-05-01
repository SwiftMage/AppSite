document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelectorAll('.carousel-image');
    let currentImageIndex = 0;
    const intervalTime = 4000; // Time in milliseconds (e.g., 4 seconds)

    function showNextImage() {
        // Remove active class from current image
        carouselImages[currentImageIndex].classList.remove('active');

        // Move to the next image index, looping back to 0 if at the end
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;

        // Add active class to the new current image
        carouselImages[currentImageIndex].classList.add('active');
    }

    // Start the carousel interval if there are images
    if (carouselImages.length > 1) {
        setInterval(showNextImage, intervalTime);
    }
}); 