function setupStaggeredFadeIn(cardSelector, threshold) {
    const cards = Array.from(document.querySelectorAll(cardSelector));

    if (cards.length === 0) {
        return;
    }

    function isNearBottom() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        return scrollPosition >= pageHeight * 0.75;
    }

    const observer = new IntersectionObserver(function (entries) {
        let batch = entries
            .filter(function (entry) { return entry.isIntersecting; })
            .map(function (entry) { return entry.target; });

        if (batch.length === 0) {
            return;
        }

        batch.sort(function (a, b) { return cards.indexOf(a) - cards.indexOf(b); });

        if (isNearBottom()) {
            batch.reverse();
        }

        batch.forEach(function (card, index) {
            observer.unobserve(card);
            setTimeout(function () {
                card.classList.add("show");
            }, index * 150);
        });
    }, {
        threshold: threshold
    });

    function startObserving() {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                cards.forEach(function (card) {
                    observer.observe(card);
                });
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
    setupStaggeredFadeIn(".service-card.service-fade-in", 0.1);
    setupStaggeredFadeIn(".specific-card.specific-fade-in", 0.1);
});
