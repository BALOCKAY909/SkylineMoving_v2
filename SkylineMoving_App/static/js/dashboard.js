document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", function () {
            mobileMenu.classList.toggle("open");
        });
        document.addEventListener("click", function (e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove("open");
            }
        });
        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mobileMenu.classList.remove("open");
            });
        });
        window.addEventListener("resize", function () {
            if (window.innerWidth > 1024) {
                mobileMenu.classList.remove("open");
            }
        });
    }

    const successMsg = document.querySelector(".success-message");
    if (successMsg) {
        setTimeout(function () {
            successMsg.style.transition = "opacity 0.8s ease";
            successMsg.style.opacity = "0";
            setTimeout(function () {
                successMsg.remove();
            }, 800);
        }, 5000);
    }

    const currentPath = window.location.pathname;

    document.querySelectorAll(".navigation-bar a").forEach(function (link) {
        const button = link.querySelector("button");
        if (!button) return;

        if (link.getAttribute("href") === currentPath) {
            button.classList.remove("inactive");
            button.classList.add("active");
        } else {
            button.classList.add("inactive");
        }
    });

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
    }, { threshold: 0 });

    document.querySelectorAll(".fade-in, .fade-in-right").forEach(function (el) {
        observer.observe(el);
    });
});
