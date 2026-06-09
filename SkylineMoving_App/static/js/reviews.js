document.addEventListener("DOMContentLoaded", function () {
    const reviewSection = document.querySelector(".customer-reviews-section, .reviews-section");
    const reviewCards = document.querySelectorAll(".review-card.review-fade-in");

    if (!reviewSection || reviewCards.length === 0) {
        return;
    }

    let loadedNearBottom = false;

    function checkIfLoadedNearBottom() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        loadedNearBottom = scrollPosition >= pageHeight * 0.75;
    }

    // Wait a moment so the browser can restore scroll position after refresh
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            checkIfLoadedNearBottom();
        });
    });

    const reviewObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                let cardsArray = Array.from(reviewCards);

                if (loadedNearBottom) {
                    cardsArray.reverse();
                }

                cardsArray.forEach(function (card, index) {
                    setTimeout(function () {
                        card.classList.add("show");
                    }, index * 150);
                });

                reviewObserver.unobserve(reviewSection);
            }
        });
    }, {
        threshold: 0.2
    });

    reviewObserver.observe(reviewSection);
});