document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    function revealVisibleElements() {
        fadeElements.forEach(function (element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 50 && rect.bottom > 0) {
                element.classList.add("show");
            }
        });
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    fadeElements.forEach(function (element) {
        observer.observe(element);
    });

    // Important: handles refreshes when user is already lower on the page
    revealVisibleElements();

    window.addEventListener("load", revealVisibleElements);
    window.addEventListener("scroll", revealVisibleElements);
    window.addEventListener("resize", revealVisibleElements);
});