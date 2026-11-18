document.addEventListener("DOMContentLoaded", function () {
    const servicesSection = document.querySelector(".services-broad");
    const serviceCards = document.querySelectorAll(".service-card.service-fade-in");

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
        threshold: 0.2
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
});
