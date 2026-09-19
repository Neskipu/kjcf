

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {

    hamburger.addEventListener('click', () => {

        navLinks.classList.toggle('active');

        const isOpen = navLinks.classList.contains('active');

        hamburger.setAttribute(
            'aria-expanded',
            isOpen ? 'true' : 'false'
        );

    });

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu() {

    if (navLinks) {
        navLinks.classList.remove('active');
    }

    if (hamburger) {
        hamburger.setAttribute(
            'aria-expanded',
            'false'
        );
    }

}


/* =========================================================
   TAB ELEMENTS
========================================================= */

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');


/* =========================================================
   GET HEADER HEIGHT
========================================================= */

function getHeaderHeight() {

    const header = document.querySelector('header');

    if (!header) {
        return 0;
    }

    return header.offsetHeight;

}

function scrollToLibrary() {

    const library = document.querySelector('.devotion-library');

    if (!library) {
        return;
    }

    const headerHeight = getHeaderHeight();

    const libraryTop =
        library.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

    window.scrollTo({
        top: libraryTop,
        behavior: 'smooth'
    });

}

/* =========================================================
   ACTIVATE TAB
========================================================= */

function activateTab(
    target,
    shouldScroll = false,
    updateUrl = true
) {

    if (!target) {
        return;
    }


    const targetButton =
        document.querySelector(
            `.tab-button[data-tab="${target}"]`
        );

    const targetContent =
        document.getElementById(target);


    /* -----------------------------------------------------
       Make sure the requested tab actually exists
    ----------------------------------------------------- */

    if (!targetButton || !targetContent) {
        return;
    }


    /* -----------------------------------------------------
       Remove active state from every button
    ----------------------------------------------------- */

    tabButtons.forEach(button => {

        button.classList.remove('active');

    });


    /* -----------------------------------------------------
       Hide every tab content
    ----------------------------------------------------- */

    tabContents.forEach(content => {

        content.classList.remove('active');

    });


    /* -----------------------------------------------------
       Activate selected tab
    ----------------------------------------------------- */

    targetButton.classList.add('active');

    targetContent.classList.add('active');


    /* -----------------------------------------------------
       Update URL
    ----------------------------------------------------- */

    if (updateUrl) {

        const newUrl =
            `${window.location.pathname}#${target}`;

        window.history.replaceState(
            null,
            '',
            newUrl
        );

    }


    /* -----------------------------------------------------
       Scroll after tab activation
    ----------------------------------------------------- */

    if (shouldScroll) {

        setTimeout(() => {

            scrollToLibrary();

        }, 50);

    }

}


/* =========================================================
   TAB BUTTON CLICK
========================================================= */

tabButtons.forEach(button => {

    button.addEventListener('click', () => {

        const target =
            button.dataset.tab;

        activateTab(
            target,
            true,
            true
        );

    });

});


/* =========================================================
   NAVIGATION LINKS
   ABOUT / COLLECTIONS / CONTACT
========================================================= */

document
    .querySelectorAll('[data-devotion-target]')
    .forEach(link => {

        link.addEventListener('click', function (event) {

            event.preventDefault();


            const target =
                this.dataset.devotionTarget;


            if (!target) {
                return;
            }


            /* -------------------------------------------------
               Activate the correct tab
            ------------------------------------------------- */

            activateTab(
                target === 'about'
                    ? 'about-info'
                    : target,
                false,
                true
            );


            /* -------------------------------------------------
               Scroll to the devotional library
            ------------------------------------------------- */

            setTimeout(() => {

                scrollToLibrary();

            }, 50);


            /* -------------------------------------------------
               Close mobile menu
            ------------------------------------------------- */

            closeMobileMenu();

        });

    });


/* =========================================================
   NAVIGATION DROPDOWN / OTHER LINKS
========================================================= */

document
    .querySelectorAll('.nav-links a')
    .forEach(link => {

        if (
            !link.hasAttribute('data-devotion-target') &&
            link.getAttribute('href') !== '#'
        ) {

            link.addEventListener('click', () => {

                closeMobileMenu();

            });

        }

    });


/* =========================================================
   OPEN TAB FROM URL HASH
========================================================= */

function openTabFromHash() {

    const hash =
        window.location.hash.replace('#', '');


    if (!hash) {
        return;
    }


    let target = hash;


    /* -----------------------------------------------------
       The navbar uses #about for the whole library,
       while the actual About tab is #about-info.
    ----------------------------------------------------- */

    if (hash === 'about') {

        target = 'about-info';

    }


    /* -----------------------------------------------------
       Only activate valid tabs
    ----------------------------------------------------- */

    const targetContent =
        document.getElementById(target);

    const targetButton =
        document.querySelector(
            `.tab-button[data-tab="${target}"]`
        );


    if (!targetContent || !targetButton) {
        return;
    }


    /* -----------------------------------------------------
       Activate without changing the hash again
    ----------------------------------------------------- */

    activateTab(
        target,
        false,
        false
    );


    /* -----------------------------------------------------
       Wait for layout before scrolling
    ----------------------------------------------------- */

    setTimeout(() => {

        scrollToLibrary();

    }, 100);

}


/* =========================================================
   HANDLE BROWSER BACK / FORWARD
========================================================= */

window.addEventListener(
    'hashchange',
    openTabFromHash
);


/* =========================================================
   LANGUAGE TOGGLE
========================================================= */

const languageToggle =
    document.getElementById('languageToggle');

const languageSlider =
    document.getElementById('languageSlider');


if (languageToggle) {

    languageToggle.addEventListener(
        'click',
        () => {

            const isKhasi =
                languageToggle.classList.toggle(
                    'kh-active'
                );


            languageToggle.setAttribute(
                'aria-pressed',
                isKhasi ? 'true' : 'false'
            );


            if (languageSlider) {

                languageSlider.textContent =
                    isKhasi ? 'KH' : 'EN';

            }

        }
    );

}


/* =========================================================
   DEVOTIONAL LANGUAGE TOGGLE
========================================================= */

const devotionLanguageToggle =
    document.getElementById(
        'devotionLanguageToggle'
    );

const devotionLanguageText =
    document.getElementById(
        'devotionLanguageText'
    );


let devotionLanguage =
    localStorage.getItem(
        'devotionLanguage'
    ) || 'khasi';


function updateDevotionLanguage() {

    const elements =
        document.querySelectorAll(
            '[data-devotion-en]'
        );


    elements.forEach(element => {

        const english =
            element.dataset.devotionEn;

        const khasi =
            element.dataset.devotionKhasi;


        if (
            devotionLanguage === 'english'
        ) {

            element.textContent =
                english;

        } else {

            element.textContent =
                khasi;

        }

    });


    if (devotionLanguageToggle) {

        devotionLanguageToggle.classList.toggle(
            'english-active',
            devotionLanguage === 'english'
        );

        devotionLanguageToggle.setAttribute(
            'aria-pressed',
            devotionLanguage === 'english'
                ? 'true'
                : 'false'
        );

    }


    if (devotionLanguageText) {

        devotionLanguageText.textContent =
            devotionLanguage === 'english'
                ? 'Read in Khasi'
                : 'Read in English';

    }

}


if (devotionLanguageToggle) {

    devotionLanguageToggle.addEventListener(
        'click',
        () => {

            devotionLanguage =
                devotionLanguage === 'khasi'
                    ? 'english'
                    : 'khasi';


            localStorage.setItem(
                'devotionLanguage',
                devotionLanguage
            );


            updateDevotionLanguage();

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        '.devotion-card, .library-panel, .english-message'
    );


if ('IntersectionObserver' in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        'visible'
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   HERO ICON SCROLL
========================================================= */

const heroIcon =
    document.querySelector(
        '.devotion-hero-icon'
    );


if (heroIcon) {

    heroIcon.addEventListener(
        'click',
        event => {

            event.preventDefault();


            const target =
                document.getElementById(
                    'devotion-of-the-day'
                );


            if (!target) {
                return;
            }


            const headerHeight =
                getHeaderHeight();


            const targetTop =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight + 20;


            window.scrollTo({

                top: targetTop,

                behavior: 'smooth'

            });

        }
    );

}


/* =========================================================
   HERO TYPING ANIMATION
========================================================= */

const heroParagraph =
    document.querySelector(
        '.devotion-hero-content p'
    );


if (heroParagraph) {

    const originalText =
        heroParagraph.textContent.trim();


    heroParagraph.textContent = '';


    let typingIndex = 0;


    function typeHeroText() {

        if (
            typingIndex <
            originalText.length
        ) {

            heroParagraph.textContent +=
                originalText.charAt(
                    typingIndex
                );

            typingIndex++;

            setTimeout(
                typeHeroText,
                75
            );

        }

    }


    setTimeout(
        typeHeroText,
        700
    );

}


/* =========================================================
   INITIAL PAGE STATE
========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        /* ---------------------------------------------
           Set devotional language
        --------------------------------------------- */

        updateDevotionLanguage();


        /* ---------------------------------------------
           Check URL hash
        --------------------------------------------- */

        if (window.location.hash) {

            openTabFromHash();

        } else {

            /* -----------------------------------------
               Default to About Info
            ----------------------------------------- */

            activateTab(
                'about-info',
                false,
                false
            );

        }

    }
);

// =========================================================
// CONTACT FORM
// Sends the form data to the Express backend
// =========================================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {
            const response = await fetch("http://localhost:3000/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert(data.message || "Failed to send message.");
            }

        } catch (error) {
            console.error("Error submitting contact form:", error);
            alert("Could not connect to the server.");
        }
    });
}