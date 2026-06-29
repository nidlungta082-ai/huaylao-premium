/* ==========================================
   หวยลาว Premium V1
   CONFIG
========================================== */

const CONFIG = {

    /* -------------------------------
       Apps Script Web App
    --------------------------------*/

    WEB_APP_URL:
        "https://script.google.com/macros/s/AKfycbzjnZEpmAyG3wCFkqztcIkWK_4wWNrZcan9fcBoN0OwsjM9XQFoPyUpPpHDj-DZ2Ztq3Q/exec",

    /* -------------------------------
       Version
    --------------------------------*/

    VERSION: "1.0.0",

    /* -------------------------------
       เวลาโหลด Splash
    --------------------------------*/

    SPLASH_MIN_TIME: 1800,

    /* -------------------------------
       Animation
    --------------------------------*/

    ENABLE_ANIMATION: true,

    ENABLE_RIPPLE: true,

    ENABLE_SOUND: false,

    ENABLE_VIBRATE: true,

    /* -------------------------------
       Theme
    --------------------------------*/

    DEFAULT_THEME: {

        primary: "#C41230",

        secondary: "#123A8C",

        gold: "#F7C948",

        dark: "#050008"

    },

    /* -------------------------------
       Line
    --------------------------------*/

    LINE_URL: "",

    /* -------------------------------
       Cache
    --------------------------------*/

    CACHE_SETTING_TIME: 1000 * 60 * 5,

    CACHE_HISTORY_TIME: 1000 * 60 * 2

};


/* ==========================================
   Runtime
========================================== */

const APP = {

    setting: {},

    history: [],

    digit2: "",

    digit3: "",

    currentPage: "home",

    loading: false,

    version: CONFIG.VERSION

};