document.addEventListener("DOMContentLoaded", function () {

    // DARK MODE
    // ===============================
// DARK MODE AVEC MÉMOIRE
// ===============================
const darkModeBtn = document.querySelector("#darkModeBtn");

// Charger le mode sauvegardé
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (darkModeBtn) {
        darkModeBtn.textContent = "☀️ Mode clair";
    }
}

// Gestion du clic
if (darkModeBtn) {
    darkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            darkModeBtn.textContent = "☀️ Mode clair";
        } else {
            localStorage.setItem("theme", "light");
            darkModeBtn.textContent = "🌙 Mode sombre";
        }
    });
}   

    // RETOUR EN HAUT
    const backToTopBtn = document.querySelector("#backToTop");

    if (backToTopBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // FAQ
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            question.parentElement.classList.toggle("active");
        });
    });

    // FORMULAIRE
    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formMessage = document.querySelector("#formMessage");

            if (formMessage) {
                formMessage.textContent = "Votre message a bien été envoyé !";
                formMessage.className = "form-message success";
            } else {
                alert("Votre message a bien été envoyé !");
            }

            contactForm.reset();
        });
    }

    // CARROUSEL
    const carouselImages = document.querySelectorAll(".carousel-image");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentImage = 0;

    function showImage(index) {
        carouselImages.forEach(function (image) {
            image.classList.remove("active");
        });

        if (carouselImages[index]) {
            carouselImages[index].classList.add("active");
        }
    }

    function nextImage() {
        if (carouselImages.length > 0) {
            currentImage = (currentImage + 1) % carouselImages.length;
            showImage(currentImage);
        }
    }

    function prevImage() {
        if (carouselImages.length > 0) {
            currentImage = (currentImage - 1 + carouselImages.length) % carouselImages.length;
            showImage(currentImage);
        }
    }

    if (carouselImages.length > 0) {
        showImage(currentImage);

        if (nextBtn) {
            nextBtn.addEventListener("click", nextImage);
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", prevImage);
        }

        setInterval(nextImage, 4000);
    }


// ===============================
// COMPTEURS CHIFFRES CLÉS
// ===============================
const counters = document.querySelectorAll(".counter");

function animateCounters() {
    counters.forEach((counter) => {
        const target = Number(counter.getAttribute("data-target"));
        const duration = 1200;
        const increment = target / (duration / 20);

        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

let countersStarted = false;

window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".stat-card");

    if (statsSection && !countersStarted) {
        const position = statsSection.getBoundingClientRect().top;

        if (position < window.innerHeight - 100) {
            countersStarted = true;
            animateCounters();
        }
    }
});

window.addEventListener("load", () => {
    const statsSection = document.querySelector(".stat-card");

    if (statsSection) {
        const position = statsSection.getBoundingClientRect().top;

        if (position < window.innerHeight) {
            countersStarted = true;
            animateCounters();
        }
    }
});    
// ===============================
// HERO CAROUSEL (ACCUEIL)
// ===============================
const heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;

function changeHeroSlide() {
    if (heroSlides.length > 0) {
        heroSlides[heroIndex].classList.remove("active");
        heroIndex = (heroIndex + 1) % heroSlides.length;
        heroSlides[heroIndex].classList.add("active");
    }
}

if (heroSlides.length > 0) {
    setInterval(changeHeroSlide, 4000);
}

// ===============================
// QUIZ D'ORIENTATION
// ===============================
const quizButtons = document.querySelectorAll(".quiz-btn");
const quizResult = document.querySelector("#quizResult");

const quizTexts = {
    web: {
        title: "Bachelor Développeur Web & IA",
        text: "Ce parcours correspond à votre profil si vous aimez créer des interfaces, développer des applications et intégrer des technologies intelligentes."
    },
    cyber: {
        title: "Bachelor Cybersécurité & Réseaux",
        text: "Ce parcours est adapté si vous aimez comprendre les infrastructures, sécuriser les systèmes et protéger les données."
    },
    data: {
        title: "Cycle Ingénieur - Data Science",
        text: "Cette spécialisation est idéale si vous aimez analyser les données, comprendre l’intelligence artificielle et construire des modèles utiles."
    },
    it: {
        title: "Cycle Ingénieur - Information Technology",
        text: "Cette filière correspond si vous souhaitez piloter des projets numériques, gérer des systèmes d’information et accompagner la transformation digitale."
    }
};

quizButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const result = button.dataset.result;
        const selected = quizTexts[result];

        if (selected && quizResult) {
            quizResult.innerHTML = `
                <h3>${selected.title}</h3>
                <p>${selected.text}</p>
                <a href="contact.html" class="btn">Demander plus d’informations</a>
            `;
        }

        quizButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
    });
});

// ===============================
// COOKIE MODAL FIX FINAL
// ===============================
const cookieModal = document.querySelector("#cookieModal");
const acceptCookies = document.querySelector("#acceptCookies");
const continueWithoutCookies = document.querySelector("#continueWithoutCookies");
const customizeCookies = document.querySelector("#customizeCookies");

// ⚠️ FORCER affichage UNIQUEMENT si jamais accepté
if (cookieModal) {
    cookieModal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Boutons
function closeCookie(choice) {
    localStorage.setItem("cookiesChoice", choice);
    cookieModal.style.display = "none";
    document.body.style.overflow = "auto";
}

if (acceptCookies) {
    acceptCookies.addEventListener("click", () => closeCookie("accepted"));
}

if (continueWithoutCookies) {
    continueWithoutCookies.addEventListener("click", () => closeCookie("refused"));
}

if (customizeCookies) {
    customizeCookies.addEventListener("click", () => {
        alert("Pas de personnalisation avancée dans ce projet 🙂");
    });
}
});