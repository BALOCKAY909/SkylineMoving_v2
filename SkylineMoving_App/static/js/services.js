function setupStaggeredFadeIn(sectionSelector, cardSelector, threshold) {
    const servicesSection = document.querySelector(sectionSelector);
    const serviceCards = document.querySelectorAll(cardSelector);

    if (!servicesSection || serviceCards.length === 0) {
        return;
    }

    let loadedNearBottom = false;

    function isNearBottom() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        return scrollPosition >= pageHeight * 0.75;
    }

    const servicesObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                let cardsArray = Array.from(serviceCards);

                if (loadedNearBottom || isNearBottom()) {
                    cardsArray.reverse();
                }

                cardsArray.forEach(function (card, index) {
                    setTimeout(function () {
                        card.classList.add("show");
                    }, index * 150);
                });

                servicesObserver.unobserve(servicesSection);
            }
        });
    }, {
        threshold: threshold
    });

    function startObserving() {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                loadedNearBottom = isNearBottom();
                servicesObserver.observe(servicesSection);
            });
        });
    }

    if (document.readyState === "complete") {
        startObserving();
    } else {
        window.addEventListener("load", startObserving);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setupStaggeredFadeIn(".services-broad", ".service-card.service-fade-in", 0.2);
    setupStaggeredFadeIn(".services-specific", ".specific-card.specific-fade-in", 0.05);
});
