document.addEventListener("DOMContentLoaded", function () {
    const reviewCards = Array.from(document.querySelectorAll(".review-card.review-fade-in"));

    if (reviewCards.length === 0) {
        return;
    }

    function isNearBottom() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        return scrollPosition >= pageHeight * 0.75;
    }

    const reviewObserver = new IntersectionObserver(function (entries) {
        let batch = entries
            .filter(function (entry) { return entry.isIntersecting; })
            .map(function (entry) { return entry.target; });

        if (batch.length === 0) {
            return;
        }

        batch.sort(function (a, b) { return reviewCards.indexOf(a) - reviewCards.indexOf(b); });

        if (isNearBottom()) {
            batch.reverse();
        }

        batch.forEach(function (card, index) {
            reviewObserver.unobserve(card);
            setTimeout(function () {
                card.classList.add("show");
            }, index * 150);
        });
    }, {
        threshold: 0.1
    });

    function startObserving() {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                reviewCards.forEach(function (card) {
                    reviewObserver.observe(card);
                });
            });
        });
    }

    if (document.readyState === "complete") {
        startObserving();
    } else {
        window.addEventListener("load", startObserving);
    }
});