document.addEventListener("DOMContentLoaded", function () {
    const boxes = Array.from(document.querySelectorAll(".contact-box-fade"));
    if (!boxes.length) return;

    const seen = new Set();

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const index = boxes.indexOf(entry.target);
            if (entry.isIntersecting && !seen.has(index)) {
                seen.add(index);
                setTimeout(function () {
                    entry.target.classList.add("visible");
                    entry.target.addEventListener("transitionend", function onDone() {
                        entry.target.classList.add("done");
                        entry.target.removeEventListener("transitionend", onDone);
                    });
                }, index * 60);
            } else if (!entry.isIntersecting && !seen.has(index)) {
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.1 });

    boxes.forEach(function (box) {
        observer.observe(box);
    });
});