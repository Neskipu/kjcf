
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
               Scroll to devotional library
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
   MAIN WEBSITE LANGUAGE TOGGLE
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
   KHASI = DEFAULT
   ENGLISH = COMING SOON BARRIER
========================================================= */

const devotionLanguageToggle =
    document.getElementById(
        'devotionLanguageToggle'
    );

const devotionLanguageText =
    document.getElementById(
        'devotionLanguageText'
    );


/*
   IMPORTANT:

   The devotional always starts in Khasi.

   We intentionally do NOT use localStorage here.
   That means even if someone selected English before,
   the page will return to Khasi when they reload it.
*/

let devotionLanguage = 'khasi';


/* =========================================================
   CREATE ENGLISH COMING SOON BARRIER
========================================================= */

function createEnglishComingSoonBarrier() {

    let barrier =
        document.getElementById(
            'devotionEnglishComingSoon'
        );


    if (barrier) {
        return barrier;
    }


    barrier =
        document.createElement('div');

    barrier.id =
        'devotionEnglishComingSoon';

    barrier.className =
        'devotion-english-coming-soon';


    barrier.innerHTML = `
        <div class="devotion-coming-soon-icon">
            <i class="fas fa-language"></i>
        </div>

        <h3>
            English Version Coming Soon
        </h3>

        <p>
            The English version of this devotional
            is currently being prepared.
            Please check back soon.
        </p>
    `;


    /*
       Put the barrier inside the devotional content,
       directly after the date row.
    */

    const devotionContent =
        document.querySelector(
            '.devotion-card .devotion-content'
        );

    const dateRow =
        devotionContent?.querySelector(
            '.devotion-date-row'
        );


    if (devotionContent && dateRow) {

        dateRow.insertAdjacentElement(
            'afterend',
            barrier
        );

    }


    return barrier;

}


/* =========================================================
   GET KHASI DEVOTIONAL CONTENT
========================================================= */

function getDevotionContentElements() {

    const devotionContent =
        document.querySelector(
            '.devotion-card .devotion-content'
        );


    if (!devotionContent) {
        return [];
    }


    /*
       These are the actual devotional pieces
       that should disappear when EN is selected.

       We deliberately leave:
       - the date row
       - the language toggle
       - Explore Collections

       visible.
    */

    return Array.from(
        devotionContent.children
    ).filter(element => {

        return (
            !element.classList.contains(
                'devotion-date-row'
            ) &&
            !element.classList.contains(
                'devotion-english-coming-soon'
            ) &&
            !element.classList.contains(
                'explore-collections'
            )
        );

    });

}


/* =========================================================
   UPDATE DEVOTIONAL LANGUAGE
========================================================= */

function updateDevotionLanguage() {

    const barrier =
        createEnglishComingSoonBarrier();

    const contentElements =
        getDevotionContentElements();


    /* =====================================================
       KHASI MODE
    ===================================================== */

    if (devotionLanguage === 'khasi') {

        /*
           Show the actual Khasi devotional.
        */

        contentElements.forEach(element => {

            element.style.display = '';

        });


        /*
           Hide the English Coming Soon barrier.
        */

        if (barrier) {

            barrier.style.display =
                'none';

        }


        /*
           Toggle appearance
        */

        if (devotionLanguageToggle) {

            devotionLanguageToggle.classList.remove(
                'english-active'
            );

            devotionLanguageToggle.setAttribute(
                'aria-pressed',
                'false'
            );

        }


        /*
           Toggle text
        */

        if (devotionLanguageText) {

            devotionLanguageText.textContent =
                'English Coming Soon';

        }

        return;
    }


    /* =====================================================
       ENGLISH MODE
    ===================================================== */

    /*
       Hide all of the actual Khasi devotional content.
    */

    contentElements.forEach(element => {

        element.style.display = 'none';

    });


    /*
       Show the single English Coming Soon barrier.
    */

    if (barrier) {

        barrier.style.display =
            'block';

    }


    /*
       Toggle appearance
    */

    if (devotionLanguageToggle) {

        devotionLanguageToggle.classList.add(
            'english-active'
        );

        devotionLanguageToggle.setAttribute(
            'aria-pressed',
            'true'
        );

    }


    /*
       Toggle text

       Once EN is selected, the user can click it again
       to return to Khasi.
    */

    if (devotionLanguageText) {

        devotionLanguageText.textContent =
            'Read in Khasi';

    }

}


/* =========================================================
   DEVOTIONAL LANGUAGE TOGGLE CLICK
========================================================= */

if (devotionLanguageToggle) {

    devotionLanguageToggle.addEventListener(
        'click',
        () => {

            devotionLanguage =
                devotionLanguage === 'khasi'
                    ? 'english'
                    : 'khasi';


            updateDevotionLanguage();

        }
    );


    /*
       Also allow keyboard activation
       with Enter or Space.
    */

    devotionLanguageToggle.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Enter' ||
                event.key === ' '
            ) {

                event.preventDefault();

                devotionLanguage =
                    devotionLanguage === 'khasi'
                        ? 'english'
                        : 'khasi';


                updateDevotionLanguage();

            }

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

        /*
           Always start devotional language in KHASI.
        */

        devotionLanguage =
            'khasi';

        updateDevotionLanguage();


        /*
           Check URL hash.
        */

        if (window.location.hash) {

            openTabFromHash();

        } else {

            /*
               Default to About Info.
            */

            activateTab(
                'about-info',
                false,
                false
            );

        }

    }
);


/* =========================================================
   CONTACT FORM
   Sends the form data to the Express backend
========================================================= */

const contactForm =
    document.getElementById(
        'contactForm'
    );


if (contactForm) {

    contactForm.addEventListener(
        'submit',
        async event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    'name'
                ).value;


            const phone =
                document.getElementById(
                    'phone'
                )?.value || '';


            const email =
                document.getElementById(
                    'email'
                ).value;


            const message =
                document.getElementById(
                    'message'
                ).value;


            try {

                const response =
                    await fetch(
                        'http://localhost:3000/api/contacts',
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body:
                                JSON.stringify({
                                    name: name,
                                    phone: phone,
                                    email: email,
                                    message: message
                                })
                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    alert(
                        'Message sent successfully!'
                    );

                    contactForm.reset();

                } else {

                    alert(
                        data.message ||
                        'Failed to send message.'
                    );

                }


            } catch (error) {

                console.error(
                    'Error submitting contact form:',
                    error
                );

                alert(
                    'Could not connect to the server.'
                );

            }

        }
    );

}
