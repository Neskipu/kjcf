/* =========================================================
       RESPONSIVE NAVIGATION
   ========================================================= */

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navDropdown = document.querySelector('.nav-dropdown');
const devotionalsMenuToggle = document.querySelector('.devotionals-menu-toggle');


/* =========================================================
       CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {
    navLinks?.classList.remove('active');

    hamburger?.setAttribute(
        'aria-expanded',
        'false'
    );

    hamburger?.setAttribute(
        'aria-label',
        'Open navigation menu'
    );

    /* Close Devotionals dropdown */
    navDropdown?.classList.remove(
        'dropdown-open'
    );

    devotionalsMenuToggle?.setAttribute(
        'aria-expanded',
        'false'
    );

    devotionalsMenuToggle?.setAttribute(
        'aria-label',
        'Open Devotionals submenu'
    );

    /* Reset hamburger icon */
    const icon = hamburger?.querySelector('i');

    if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
}


/* =========================================================
       HAMBURGER BUTTON
   ========================================================= */

hamburger?.addEventListener(
    'click',
    event => {
        event.stopPropagation();

        const isOpen =
            navLinks?.classList.toggle('active');

        hamburger?.setAttribute(
            'aria-expanded',
            isOpen ? 'true' : 'false'
        );

        hamburger?.setAttribute(
            'aria-label',
            isOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
        );

        /* Change hamburger icon */
        const icon =
            hamburger?.querySelector('i');

        if (icon) {
            icon.classList.toggle(
                'fa-bars',
                !isOpen
            );

            icon.classList.toggle(
                'fa-xmark',
                isOpen
            );
        }

        /*
         * If the main mobile menu is being closed,
         * also close the Devotionals submenu.
         */
        if (!isOpen) {
            navDropdown?.classList.remove(
                'dropdown-open'
            );

            devotionalsMenuToggle?.setAttribute(
                'aria-expanded',
                'false'
            );
        }
    }
);


/* =========================================================
       MOBILE DEVOTIONALS DROPDOWN
   ========================================================= */

/*
 * IMPORTANT:
 * The Devotionals text/link now navigates normally.
 *
 * Only the small chevron button opens the submenu.
 */

devotionalsMenuToggle?.addEventListener(
    'click',
    event => {
        event.preventDefault();
        event.stopPropagation();

        /*
         * Only use the dropdown toggle on mobile.
         * On desktop, CSS handles the dropdown on hover.
         */
        if (window.innerWidth > 768) {
            return;
        }

        const isOpen =
            navDropdown?.classList.toggle(
                'dropdown-open'
            );

        devotionalsMenuToggle?.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        devotionalsMenuToggle?.setAttribute(
            'aria-label',
            isOpen
                ? 'Close Devotionals submenu'
                : 'Open Devotionals submenu'
        );
    }
);


/* =========================================================
       DEVOTIONAL DROPDOWN LINKS
   ========================================================= */

navDropdown
    ?.querySelectorAll(
        '.devotionals-dropdown a'
    )
    .forEach(link => {

        link.addEventListener(
            'click',
            event => {

                const url =
                    new URL(
                        link.href,
                        window.location.href
                    );

                const target =
                    url.hash.replace('#', '');

                /*
                 * If this is About Info or Collections
                 * on the current Devotionals page,
                 * activate the tab FIRST, then scroll.
                 */
                if (
                    url.pathname === window.location.pathname &&
                    (
                        target === 'about' ||
                        target === 'collections'
                    )
                ) {
                    event.preventDefault();

                    activateTab(
                        target,
                        true,
                        true
                    );
                }

                /*
                 * Close the mobile navigation after
                 * selecting a submenu item.
                 */
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            }
        );
    });


/* =========================================================
       OTHER NAVIGATION LINKS
   ========================================================= */

navLinks
    ?.querySelectorAll(
        'li:not(.nav-dropdown) > a'
    )
    .forEach(link => {

        link.addEventListener(
            'click',
            () => {

                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            }
        );
    });


/* =========================================================
       DEVOTIONALS MAIN LINK
   ========================================================= */

/*
 * Do NOT prevent the Devotionals link from navigating.
 *
 * Clicking:
 *     Devotionals
 *
 * should always open:
 *     devotionals.html
 *
 * The chevron button beside it is what opens
 * the submenu on mobile.
 */


/* =========================================================
       CLICK OUTSIDE MENU
   ========================================================= */

document.addEventListener(
    'click',
    event => {

        if (!navLinks || !hamburger) {
            return;
        }

        if (
            !navLinks.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            closeMobileMenu();
        }
    }
);


/* =========================================================
       RESET MOBILE NAV WHEN RETURNING TO DESKTOP
   ========================================================= */

window.addEventListener(
    'resize',
    () => {

        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }
);


/* =========================================================
       TABS
   ========================================================= */

const tabButtons =
    document.querySelectorAll(
        '.tab-button'
    );

const tabContents =
    document.querySelectorAll(
        '.tab-content'
    );


/* =========================================================
       SCROLL TO ACTIVE TAB
   ========================================================= */

function scrollToTabContent(target) {

    const targetContent =
        document.getElementById(target);

    if (!targetContent) {
        return;
    }

    /*
     * scrollIntoView works together with:
     *
     * #about,
     * #collections {
     *     scroll-margin-top: ...;
     * }
     *
     * from your CSS.
     *
     * This keeps the content from hiding underneath
     * the fixed header.
     */
    requestAnimationFrame(() => {

        targetContent.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

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

    const targetButton =
        document.querySelector(
            `.tab-button[data-tab="${target}"]`
        );

    const targetContent =
        document.getElementById(target);

    if (
        !targetButton ||
        !targetContent
    ) {
        return;
    }


    /* Remove active state from all buttons */
    tabButtons.forEach(
        button => {

            button.classList.toggle(
                'active',
                button === targetButton
            );

        }
    );


    /* Hide all tab contents */
    tabContents.forEach(
        content => {

            content.classList.toggle(
                'active',
                content === targetContent
            );

        }
    );


    /*
     * Update URL without causing a page reload.
     */
    if (updateUrl) {

        history.replaceState(
            null,
            '',
            `./devotionals.html#${target}`
        );
    }


    /*
     * Scroll only AFTER the correct tab has
     * become visible.
     */
    if (shouldScroll) {

        scrollToTabContent(target);
    }
}


/* =========================================================
       TAB BUTTON CLICKS
   ========================================================= */

tabButtons.forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                const target =
                    button.getAttribute(
                        'data-tab'
                    );

                activateTab(
                    target,
                    true,
                    true
                );
            }
        );
    }
);


/* =========================================================
       OPEN TAB FROM URL HASH
   ========================================================= */

function openTabFromHash() {

    const hash =
        window.location.hash.substring(1);

    /*
     * Only handle the two actual tabs.
     */
    if (
        hash !== 'about' &&
        hash !== 'collections'
    ) {
        return;
    }


    /*
     * Activate the tab WITHOUT updating
     * the URL again.
     */
    activateTab(
        hash,
        false,
        false
    );


    /*
     * Give the browser a moment to display
     * the newly activated content before
     * scrolling to it.
     */
    setTimeout(
        () => {

            scrollToTabContent(hash);

        },
        100
    );
}


/*
 * Check the URL when the page first loads.
 */
openTabFromHash();


/*
 * Also respond if the hash changes while
 * the user is already on the page.
 */
window.addEventListener(
    'hashchange',
    openTabFromHash
);


/* =========================================================
       LANGUAGE TOGGLE
   ========================================================= */

const languageToggle =
    document.getElementById(
        'languageToggle'
    );

const languageSlider =
    document.getElementById(
        'languageSlider'
    );


/*
 * The Devotionals page starts in Khasi.
 */
let currentLanguage = 'kh';


/* =========================================================
       UPDATE LANGUAGE
   ========================================================= */

function updateLanguage() {

    const isKhasi =
        currentLanguage === 'kh';


    /*
     * Move the language toggle into the
     * correct visual state.
     */
    languageToggle?.classList.toggle(
        'kh-active',
        isKhasi
    );


    /*
     * Update the text inside the slider.
     */
    if (languageSlider) {

        languageSlider.textContent =
            isKhasi
                ? 'KH'
                : 'EN';
    }


    /*
     * Update the document language.
     */
    document.documentElement.lang =
        isKhasi
            ? 'kha'
            : 'en';


    /*
     * Add/remove the English class.
     *
     * Your CSS can use:
     *
     * body.english ...
     *
     * to show the English version.
     */
    document.body.classList.toggle(
        'english',
        !isKhasi
    );


    /*
     * Accessibility state.
     */
    languageToggle?.setAttribute(
        'aria-pressed',
        String(!isKhasi)
    );
}


/* =========================================================
       TOGGLE LANGUAGE
   ========================================================= */

function toggleLanguage() {

    currentLanguage =
        currentLanguage === 'kh'
            ? 'en'
            : 'kh';

    updateLanguage();
}


/* =========================================================
       LANGUAGE TOGGLE CLICK
   ========================================================= */

languageToggle?.addEventListener(
    'click',
    toggleLanguage
);


/* =========================================================
       LANGUAGE TOGGLE KEYBOARD SUPPORT
   ========================================================= */

languageToggle?.addEventListener(
    'keydown',
    event => {

        if (
            event.key === 'Enter' ||
            event.key === ' '
        ) {

            event.preventDefault();

            toggleLanguage();
        }
    }
);


/*
 * Set the initial language state.
 */
updateLanguage();


/* =========================================================
       SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        '.reveal'
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            'visible'
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );
        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );
    }
);


/* =========================================================
       DEVOTIONAL LIBRARY
       SLOW TYPING
   ========================================================= */

const libraryLabel =
    document.getElementById(
        'libraryLabel'
    );

const libraryHeading =
    document.querySelector(
        '.library-heading'
    );

const libraryText =
    'DEVOTIONAL LIBRARY';

let typingStarted = false;


/* =========================================================
       START LIBRARY TYPING
   ========================================================= */

function startLibraryTyping() {

    if (
        typingStarted ||
        !libraryLabel
    ) {
        return;
    }

    typingStarted = true;

    let index = 0;


    function typeCharacter() {

        if (
            index <
            libraryText.length
        ) {

            libraryLabel.textContent +=
                libraryText.charAt(
                    index
                );

            index++;


            setTimeout(
                typeCharacter,
                100
            );
        }
    }


    setTimeout(
        typeCharacter,
        350
    );
}


/* =========================================================
       LIBRARY HEADING OBSERVER
   ========================================================= */

if (libraryHeading) {

    const libraryTypingObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                'visible'
                            );

                            startLibraryTyping();

                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },
            {
                threshold: 0.25
            }
        );


    libraryTypingObserver.observe(
        libraryHeading
    );
}