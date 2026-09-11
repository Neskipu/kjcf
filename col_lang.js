

/* =========================================================
   LANGUAGE TOGGLE ELEMENTS
========================================================= */

const languageToggle =
    document.getElementById('languageToggle');

const languageSlider =
    document.getElementById('languageSlider');


/* =========================================================
   CURRENT LANGUAGE
========================================================= */

/*
   English = en
   Khasi   = kh

   The visitor's last selected language
   is remembered across the site.
*/

let currentLanguage =
    localStorage.getItem('kjcf-language') || 'en';


/* =========================================================
   DEVOTION TRANSLATIONS
========================================================= */

const devotionTranslations = {

    en: {

        label:
            'DAILY DEVOTION',

        title:
            'A Desire to See and Hear',

        quote:
            '“Those who have ears to hear, let them hear.”',

        verse:
            'Matthew 13:9',

        paragraphs: [

            'Singers and musicians who are famous around the world often perform at concerts in Shillong. Many people desire not only to see them, but especially to hear them.',

            'Yet not everyone gets the opportunity to see and hear them. Some people simply come to observe and look at them — how they dress and how they carry themselves.',

            'The teachings of Jesus were precious and unlike anything that had come before. Those who lived in earlier times longed to see the Messiah and hear His teaching, yet they did not have that opportunity.',

            'The teachings of Jesus were extremely precious. However, some of the Pharisees did not come with a desire to hear His valuable teaching. Instead, they came only to find fault with Him and look for reasons to oppose Him.'
        ],

        reflectionTitle:
            'Reflection ✦',

        reflection:
            "We need to desire to know and understand the Word of God. A genuine desire for God's Word helps us become attentive and receptive to the truths within it, and responsive to God's will in our lives.",

        previous:
            'Previous Devotion',

        allDevotions:
            'All Devotionals',

        next:
            'Next Devotion'
    },


    kh: {

        label:
            'KA JINGPULE BA MAN KA SNGI',

        title:
            'Ka Jingkwah Ban Iohi Bad Sngew',

        quote:
            '“Uba don ki shkor ban sngew, to un sngew.”',

        verse:
            'Mathaios 13:9',

        paragraphs: [

            'Ki nongrwai bad ki nongtem kiba pawnam ha baroh ka pyrthei ki ju wan rwai bad tem ha ki concert ha Shillong. Bun ki briew ki kwah ym tang ban iohi ia ki, hynrei khamtam eh ban sngew ia ki.',

            'Hynrei ym baroh ki ioh ia ka kabu ban iohi bad ban sngew ia ki. Don kiba wan tang ban peit bad ban khmih ia ki — kumno ki phong bad kumno ki leh bad pyniaid ia lade.',

            'Ki jinghikai jong U Jisu ki long kiba kordor bad ki long kham pher na kiei baroh kiba la ju ioh mynshuwa. Kito kiba im ha ki por mynshuwa ki angnud ban iohi ia U Messiah bad ban sngew ia ki jinghikai jong U, hynrei kim shym la ioh ia kata ka kabu.',

            'Ki jinghikai jong U Jisu ki long shisha kiba kordor. Hynrei don na ki Pharisi kiba ym wan da ka jingkwah ban sngew ia ki jinghikai kiba kordor jong U. Ha ka jaka kata, ki wan tang ban wad jingdih ia U bad ban wad daw ban pyrshah ia U.'
        ],

        reflectionTitle:
            'Ka Jingpyrkhat ✦',

        reflection:
            'Ngi dei ban angnud ban tip bad sngewthuh ia ka Ktien U Blei. Ka jingangnud kaba shisha ia ka Ktien U Blei ka iarap ia ngi ban long kiba peitngor bad ban pdiang ia ki jingshisha kiba don ha ka, bad ban jubab ia ka mon U Blei ha ka jingim jong ngi.',

        previous:
            'Ka Jingpule Ba Mynshuwa',

        allDevotions:
            'Ki Jingpule Baroh',

        next:
            'Ka Jingpule Hadien'
    }
};


/* =========================================================
   UPDATE DEVOTION CONTENT
========================================================= */

function updateDevotionLanguage() {

    const language =
        devotionTranslations[currentLanguage];

    if (!language) {
        return;
    }


    /* LABEL */

    const label =
        document.querySelector('.devotion-label');

    if (label) {
        label.textContent =
            language.label;
    }


    /* TITLE */

    const title =
        document.querySelector('.devotion-title');

    if (title) {
        title.textContent =
            language.title;
    }


    /* SCRIPTURE QUOTE */

    const quote =
        document.querySelector('.scripture-quote');

    if (quote) {
        quote.textContent =
            language.quote;
    }


    /* SCRIPTURE VERSE */

    const verse =
        document.querySelector('.scripture-verse');

    if (verse) {
        verse.textContent =
            language.verse;
    }


    /* DEVOTIONAL PARAGRAPHS */

    const paragraphs =
        document.querySelectorAll(
            '.devotion-content > p'
        );

    paragraphs.forEach(
        (paragraph, index) => {

            if (
                language.paragraphs[index]
            ) {

                paragraph.textContent =
                    language.paragraphs[index];
            }
        }
    );


    /* REFLECTION TITLE */

    const reflectionTitle =
        document.querySelector(
            '.devotion-reflection h4'
        );

    if (reflectionTitle) {
        reflectionTitle.textContent =
            language.reflectionTitle;
    }


    /* REFLECTION TEXT */

    const reflection =
        document.querySelector(
            '.devotion-reflection p'
        );

    if (reflection) {
        reflection.textContent =
            language.reflection;
    }


    /* PREVIOUS */

    const previous =
        document.querySelector(
            '.devotion-navigation .previous'
        );

    if (previous) {

        const icon =
            previous.querySelector('i');

        previous.textContent =
            language.previous;

        if (icon) {
            previous.prepend(icon);
        }
    }


    /* ALL DEVOTIONALS */

    const allDevotions =
        document.querySelector(
            '.devotion-navigation .all-devotions'
        );

    if (allDevotions) {

        allDevotions.textContent =
            language.allDevotions;
    }


    /* NEXT */

    const next =
        document.querySelector(
            '.devotion-navigation .next'
        );

    if (next) {

        const icon =
            next.querySelector('i');

        next.textContent =
            language.next;

        if (icon) {
            next.append(icon);
        }
    }


    /* HTML LANGUAGE */

    document.documentElement.lang =
        currentLanguage === 'kh'
            ? 'kha'
            : 'en';
}


/* =========================================================
   UPDATE TOGGLE UI
========================================================= */

function updateLanguageUI() {

    const isKhasi =
        currentLanguage === 'kh';


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
        String(isKhasi)
    );


    languageToggle?.setAttribute(
        'aria-label',
        isKhasi
            ? 'Switch to English'
            : 'Switch to Khasi'
    );
}


/* =========================================================
   UPDATE EVERYTHING
========================================================= */

function updateLanguage() {

    updateDevotionLanguage();

    updateLanguageUI();
}


/* =========================================================
   TOGGLE LANGUAGE
========================================================= */

function toggleLanguage() {

    currentLanguage =
        currentLanguage === 'en'
            ? 'kh'
            : 'en';


    localStorage.setItem(
        'kjcf-language',
        currentLanguage
    );


    updateLanguage();
}


/* =========================================================
   CLICK
========================================================= */

languageToggle?.addEventListener(
    'click',
    toggleLanguage
);


/* =========================================================
   KEYBOARD SUPPORT
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


/* =========================================================
   INITIALIZE
========================================================= */

updateLanguage();

