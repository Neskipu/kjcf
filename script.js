
/* =========================

*   MOBILE NAVIGATION*

========================= */

const hamburger =

    document.querySelector('.hamburger');

const navLinks =

    document.querySelector('.nav-links');

const navDropdown =

    document.querySelector('.nav-dropdown');

const devotionalsLink =

    navDropdown?.querySelector(':scope > a');
/* =========================
   CLOSE MOBILE MENU
========================= */

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

    /* Reset hamburger icon */

    const icon =
        hamburger?.querySelector('i');

    if (icon) {

        icon.classList.remove(
            'fa-times'
        );

        icon.classList.add(
            'fa-bars'
        );

    }
}


/* =========================
   HAMBURGER BUTTON
========================= */

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
                'fa-times',
                isOpen
            );

        }

    }
);


/* =========================
   MOBILE DEVOTIONALS DROPDOWN
========================= */

devotionalsLink?.addEventListener('click', function (event) {

    if (window.innerWidth <= 768) {

        const dropdownIsOpen =
            navDropdown.classList.contains('dropdown-open');

        if (!dropdownIsOpen) {

            // First tap: open the submenu
            event.preventDefault();

            navDropdown.classList.add('dropdown-open');

        } else {

            // Second tap: go to the Devotionals page
            event.preventDefault();

            window.location.href = './devotionals.html';

        }
    }

});

/* =========================
   DEVOTIONAL DROPDOWN LINKS
========================= */

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


/* =========================
   OTHER NAVIGATION LINKS
========================= */

navLinks
    ?.querySelectorAll(
        'li:not(.nav-dropdown) > a'
    )
    .forEach(link => {

        link.addEventListener(
            'click',
            closeMobileMenu
        );

    });


/* =========================
   CLICK OUTSIDE MENU
========================= */

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


/* =========================
   RESET ON DESKTOP
========================= */

window.addEventListener(
    'resize',
    () => {

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    }
);


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById(
        'contactForm'
    );


contactForm?.addEventListener(
    'submit',
    event => {

        event.preventDefault();

        alert(
            'Thank you for your message! We will get back to you soon.'
        );

        contactForm.reset();

    }
);


/* =========================
   SMOOTH ANCHOR SCROLLING
========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            'click',
            event => {

                const targetId =
                    anchor.getAttribute(
                        'href'
                    );

                if (
                    !targetId ||
                    targetId === '#'
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                window.scrollTo({

                    top:
                        target.offsetTop - 80,

                    behavior: 'smooth'

                });

            }
        );

    });


/* =========================
   ABOUT FEATURE ANIMATION
========================= */

const aboutFeatures =
    document.querySelectorAll(
        '.feature'
    );


if (aboutFeatures.length) {

    const observer =
        new IntersectionObserver(

            entries => {

                if (
                    entries.some(
                        entry =>
                            entry.isIntersecting
                    )
                ) {

                    aboutFeatures.forEach(
                        (feature, index) => {

                            setTimeout(
                                () => {

                                    feature.classList.add(
                                        'visible'
                                    );

                                },
                                index * 250
                            );

                        }
                    );

                    observer.disconnect();

                }

            },

            {
                threshold: 0.2
            }

        );


    aboutFeatures.forEach(
        feature =>
            observer.observe(feature)
    );

}


/* =========================
   MAIN WEBSITE TRANSLATIONS
========================= */

const khasiTranslations = {

    "Home":
        "Ing",

    "About":
        "Shaphang",

    "About Us":
        "Shaphang Ngi",

    "Services":
        "Kam",

    "Events":
        "Jingjia",

    "Contact":
        "Iakren",

    "Devotionals":
        "Jingpuson",

    "THE KHASI JAINTIA CHRISTIAN FELLOWSHIP":
        "KA KHASI JAINTIA CHRISTIAN FELLOWSHIP",

    "Welcomes you":
        "Ka pdiang sngewbha ia phi",

    "Daily Devotionals":
        "Ki Jingpuson",

    "Get Connected":
        "Iakynduh bad Ngi",

    "About Our Church":
        "Shaphang Ka Balang Jong Ngi",

    "KJCF is a non-denominational Church comprising of various christian denominations from the Khasi and Jaintia Hills, Meghalaya.":
        "KJCF ka dei ka Balang kaba ym don kawei ka denomination, kaba kynthup ia ki denomination Khristan bapher bapher na ki Khasi bad Jaintia Hills, Meghalaya.",

    "We believe in creating a welcoming environment where everyone can grow in their relationship with God and with one another.":
        "Ngi ngeit ha kaba thaw ia ka jaka kaba pdiang sngewbha ia baroh, ha kaba baroh ki lah ban san ha ka jingïadei jong ki bad U Blei bad bad iwei ia iwei.",

    "Biblical Teaching":
        "Ka Jinghikai Na Ka Baibl",

    "Community Outreach":
        "Ka Jingtrei Shapoh Ka Imlang Sahlang",

    "Fellowship":
        "Ka Jingiasyllok",

    "Prayer":
        "Ka Jingduwai",

    "Our Services":
        "Ki Jingmane Jong Ngi",

    "Sunday Worship":
        "Ka Jingmane Ha Ka Sngi U Trai",

    "Join us every Sunday for inspiring worship services that uplift the soul and strengthen faith.":
        "Ngi khot sngewbha ia phi man ka Sngi U Trai ban iashim bynta ha ka jingmane kaba pynshlur ia ka mynsiem bad pynkhlain ia ka jingngeit.",

    "Time:":
        "Por:",

    "Sundays, 2:30 PM":
        "Sngi U Trai, 2:30 PM",

    "Bible Study":
        "Ka Jingpule Baibl",

    "Deepen your understanding of Scripture through our weekly Bible study groups.":
        "Pynjylliew ia ka jingsngewthuh jong phi ia ka Ktien U Blei lyngba ki kynhun pule Baibl man la ka taiew.",

    "Wednesdays, 7:00 PM":
        "Balang, 7:00 PM",

    "Prayer Meetings":
        "Ki Jingialang Jingduwai",

    "Come together in prayer for our church, community, and personal needs.":
        "To ngin iawan lang ha ka jingduwai na ka bynta ka balang jong ngi, ka imlang sahlang, bad ki jingdonkam jong ngi hi.",

    "Fridays, 6:30 PM":
        "Thohdieng, 6:30 PM",

    "Upcoming Events":
        "Ki Jingjia Ki Ban Wan",

    "October":
        "Risaw",

    "November":
        "Naiwieng",

    "Fall Festival":
        "Ka Jingkhawai",

    "Youth Retreat":
        "Ka Jingiaseng Samla",

    "All Day":
        "Baroh Ka Sngi",

    "Join us for a fun-filled afternoon with games, food, and fellowship for the whole family.":
        "Iaishim bynta lang bad ngi ha ka janmiet kaba dap da ki jingïalehkai, ki jingbam bad ka jingiasyllok na ka bynta ka longïing baroh.",

    "A weekend getaway for our youth to grow in faith and build lasting friendships.":
        "Ka por kyrkieh na ka bynta ki samla jong ngi ban san ha ka jingngeit bad tei ia ki paralok kiba neh.",

    "Help us serve our local community through various outreach initiatives.":
        "Iarap ia ngi ban shakri ia ka imlang sahlang jong ngi lyngba ki kam shakri bapher bapher.",

    "Learn More":
        "Tip Shuh Shuh",

    "Register Now":
        "Register Mynta",

    "Volunteer":
        "Iarap",

    "Get In Touch":
        "Iakren bad Ngi",

    "Contact Information":
        "Ki Jingtip Ban Iakynduh Ngi",

    "Address":
        "Ka Address",

    "Phone":
        "Ka Phone",

    "Email":
        "Ka Email",

    "Send Us a Message":
        "Phah Khubor Sha Ngi",

    "Your Name":
        "Ka Kyrteng Jong Phi",

    "Your Email":
        "Ka Email Jong Phi",

    "Your Message":
        "Ka Khubor Jong Phi",

    "Send Message":
        "Phah Khubor",

    "KHASI JAINTIA CHRISTIAN FELLOWSHIP CHURCH":
        "KA KHASI JAINTIA CHRISTIAN FELLOWSHIP CHURCH",

    "Quick Links":
        "Ki Link Ba Kongsan",

    "Ministries":
        "Ki Ministry",

    "Children's Ministry":
        "Ka Ministry Ki Khynnah",

    "Youth Ministry":
        "Ka Ministry Ki Samla",

    "Women's Fellowship":
        "Ka Jingiasyllok Ki Longkmie",

    "Men's Ministry":
        "Ka Ministry Ki Shynrang",

    "Outreach Programs":
        "Ki Prokram Shakri",

    "All Rights Reserved.":
        "La Riang Bishar Ïa Baroh Ki Hok."

};


/* =========================
   MAIN LANGUAGE SYSTEM
========================= */

const languageToggle =
    document.getElementById(
        'languageToggle'
    );

const languageSlider =
    document.getElementById(
        'languageSlider'
    );

const originalTexts =
    new WeakMap();


function getTextNodes(element) {

    const nodes = [];

    const walker =
        document.createTreeWalker(

            element,

            NodeFilter.SHOW_TEXT,

            {

                acceptNode(node) {

                    if (!node.nodeValue.trim()) {

                        return NodeFilter.FILTER_REJECT;

                    }

                    const parent =
                        node.parentElement;

                    if (
                        !parent ||
                        parent.closest(
                            '.language-toggle, .devotion-language-toggle, #devotions, script, style'
                        )
                    ) {

                        return NodeFilter.FILTER_REJECT;

                    }

                    return NodeFilter.FILTER_ACCEPT;

                }

            }

        );


    let node;

    while (
        (node = walker.nextNode())
    ) {

        nodes.push(node);

    }

    return nodes;

}


function changeLanguage(language) {

    getTextNodes(document.body)
        .forEach(node => {

            if (!originalTexts.has(node)) {

                originalTexts.set(
                    node,
                    node.nodeValue
                );

            }


            const original =
                originalTexts.get(node);

            const trimmed =
                original.trim();


            if (
                language === 'kh' &&
                khasiTranslations[trimmed]
            ) {

                const leading =
                    original.match(
                        /^\s*/
                    )?.[0] || '';

                const trailing =
                    original.match(
                        /\s*$/
                    )?.[0] || '';


                node.nodeValue =
                    leading +
                    khasiTranslations[trimmed] +
                    trailing;

            }


            if (language === 'en') {

                node.nodeValue =
                    original;

            }

        });

}


function updateMainLanguageUI(language) {

    const isKhasi =
        language === 'kh';


    languageToggle?.classList.toggle(
        'kh-active',
        isKhasi
    );


    if (languageSlider) {

        languageSlider.textContent =
            isKhasi
                ? 'KH'
                : 'EN';

    }


    languageToggle?.setAttribute(
        'aria-pressed',
        isKhasi
            ? 'true'
            : 'false'
    );


    document.documentElement.lang =
        isKhasi
            ? 'kha'
            : 'en';

}


function setMainLanguage(language) {

    currentLanguage =
        language;


    localStorage.setItem(
        'kjcf-language',
        language
    );


    updateMainLanguageUI(
        language
    );


    changeLanguage(
        language
    );

}


let currentLanguage =
    localStorage.getItem(
        'kjcf-language'
    ) || 'en';


setMainLanguage(
    currentLanguage
);


function toggleLanguage() {

    setMainLanguage(

        currentLanguage === 'en'
            ? 'kh'
            : 'en'

    );

}


languageToggle?.addEventListener(
    'click',
    toggleLanguage
);


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


/* =========================
   DEVOTION LANGUAGE SYSTEM
========================= */

const devotionLanguageToggle =
    document.getElementById(
        'devotionLanguageToggle'
    );


const devotionLanguageText =
    document.getElementById(
        'devotionLanguageText'
    );


const devotionElements =
    document.querySelectorAll(
        '[data-devotion-en][data-devotion-khasi]'
    );


let devotionLanguage =
    localStorage.getItem(
        'kjcf-devotion-language'
    ) || 'en';


function setDevotionLanguage(language) {

    devotionLanguage =
        language;


    localStorage.setItem(
        'kjcf-devotion-language',
        language
    );


    devotionElements.forEach(
        element => {

            const attribute =
                language === 'en'
                    ? 'data-devotion-en'
                    : 'data-devotion-khasi';


            element.textContent =
                element.getAttribute(
                    attribute
                );

        }
    );


    const isKhasi =
        language === 'kh';


    if (devotionLanguageText) {

        devotionLanguageText.textContent =
            isKhasi
                ? 'Read in English'
                : 'Read in Khasi';

    }


    devotionLanguageToggle?.setAttribute(
        'aria-label',
        isKhasi
            ? 'Read devotion in English'
            : 'Read devotion in Khasi'
    );


    devotionLanguageToggle?.setAttribute(
        'aria-pressed',
        isKhasi
            ? 'true'
            : 'false'
    );


    devotionLanguageToggle?.classList.toggle(
        'flipped',
        isKhasi
    );

}


function toggleDevotionLanguage() {

    setDevotionLanguage(

        devotionLanguage === 'kh'
            ? 'en'
            : 'kh'

    );

}


setDevotionLanguage(
    devotionLanguage
);


devotionLanguageToggle?.addEventListener(
    'click',
    toggleDevotionLanguage
);


devotionLanguageToggle?.addEventListener(
    'keydown',
    event => {

        if (
            event.key === 'Enter' ||
            event.key === ' '
        ) {

            event.preventDefault();

            toggleDevotionLanguage();

        }

    }
);

