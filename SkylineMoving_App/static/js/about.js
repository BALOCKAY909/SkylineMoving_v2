document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

                entry.target.addEventListener("transitionend", function onDone() {
                    entry.target.classList.add("done");
                    entry.target.removeEventListener("transitionend", onDone);
                });
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".fade-in-left").forEach(function (el) {
        observer.observe(el);
    });
});
