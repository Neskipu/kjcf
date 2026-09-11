
/* =========================================================
   RESPONSIVE NAVIGATION
========================================================= */

const hamburger =
    document.querySelector('.hamburger');

const navLinks =
    document.querySelector('.nav-links');

const navDropdown =
    document.querySelector('.nav-dropdown');

const devotionalsMenuToggle =
    document.querySelector('.devotionals-menu-toggle');


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

    const icon =
        hamburger?.querySelector('i');

    if (icon) {

        icon.classList.remove(
            'fa-xmark'
        );

        icon.classList.add(
            'fa-bars'
        );
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
            navLinks?.classList.toggle(
                'active'
            );

        hamburger?.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        hamburger?.setAttribute(
            'aria-label',
            isOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
        );

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

devotionalsMenuToggle?.addEventListener(
    'click',
    event => {

        event.preventDefault();
        event.stopPropagation();

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
   DEVOTIONALS DROPDOWN LINKS
========================================================= */

navDropdown
    ?.querySelectorAll(
        '.devotionals-dropdown a'
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
   PAGE TRANSITION
========================================================= */

let isPageTransitioning =
    false;


function navigateWithTransition(url) {

    if (isPageTransitioning) {
        return;
    }

    isPageTransitioning =
        true;

    document.body.classList.add(
        'page-exit'
    );

    setTimeout(
        () => {

            window.location.href =
                url;

        },
        150
    );
}


/* =========================================================
   PAGE LINKS
========================================================= */

document
    .querySelectorAll(
        '.logo, .nav-links a, .devotion-navigation a'
    )
    .forEach(
        link => {

            link.addEventListener(
                'click',
                event => {

                    const href =
                        link.getAttribute(
                            'href'
                        );

                    if (!href) {
                        return;
                    }


                    /* Ignore anchors and special links */

                    if (
                        href.startsWith('#') ||
                        href.startsWith('mailto:') ||
                        href.startsWith('tel:')
                    ) {
                        return;
                    }


                    /* Ignore links opening new tabs */

                    if (
                        link.target === '_blank'
                    ) {
                        return;
                    }


                    /* Only handle local HTML pages */

                    const isLocalPage =
                        href.startsWith('./') ||
                        href.startsWith('../') ||
                        href.endsWith('.html') ||
                        href.includes('.html#');


                    if (!isLocalPage) {
                        return;
                    }


                    event.preventDefault();


                    /* Close mobile menu before navigating */

                    if (
                        window.innerWidth <= 768 &&
                        link.closest('.nav-links')
                    ) {

                        closeMobileMenu();
                    }


                    navigateWithTransition(
                        href
                    );
                }
            );
        }
    );

