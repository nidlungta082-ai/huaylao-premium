/* ==========================================
   หวยลาว Premium
   Utility Functions
========================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* -------------------------
   Delay
------------------------- */

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* -------------------------
   Random
------------------------- */

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* -------------------------
   Vibrate
------------------------- */

function vibrate(time = 20) {

    if (!CONFIG.ENABLE_VIBRATE) return;

    if (navigator.vibrate) {

        navigator.vibrate(time);

    }

}

/* -------------------------
   Loading
------------------------- */

function showLoading() {

    const layer = $("#loadingLayer");

    if (layer) {

        layer.classList.add("show");

    }

}

function hideLoading() {

    const layer = $("#loadingLayer");

    if (layer) {

        layer.classList.remove("show");

    }

}

/* -------------------------
   Page
------------------------- */

function showPage(id) {

    document
        .querySelectorAll(".page, .splash-page")
        .forEach(el => {

            el.classList.remove("active-page");
            el.classList.remove("active");

        });

    const page = $("#" + id);

    if (page) {

        page.classList.add("active-page");

    }

}

/* -------------------------
   Cache
------------------------- */

function saveCache(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}

function loadCache(key) {

    const value = localStorage.getItem(key);

    if (!value) return null;

    try {

        return JSON.parse(value);

    } catch {

        return null;

    }

}

/* -------------------------
   Phone
------------------------- */

function cleanPhone(phone) {

    return String(phone)
        .replace(/\D/g, "")
        .substring(0, 10);

}

/* -------------------------
   Format Date
------------------------- */

function formatDate(date) {

    return new Date(date).toLocaleString("th-TH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

}

/* -------------------------
   Toast
------------------------- */

function toast(text = "") {

    if (window.Popup && typeof Popup.alert === "function") {

        Popup.alert(
            "แจ้งเตือน",
            text,
            "success"
        );

    } else {

        alert(text);

    }

}

/* -------------------------
   Animation
------------------------- */

function fadeOut(element) {

    if (!element) return;

    element.style.opacity = "0";

    setTimeout(() => {

        element.style.display = "none";

    }, 250);

}

function fadeIn(element) {

    if (!element) return;

    element.style.display = "block";

    requestAnimationFrame(() => {

        element.style.opacity = "1";

    });

}

/* -------------------------
   Copy
------------------------- */

async function copy(text) {

    try {

        await navigator.clipboard.writeText(text);

        toast("คัดลอกเรียบร้อย");

    } catch (err) {

        console.error(err);

    }

}

/* -------------------------
   Open Link
------------------------- */

function openLink(url) {

    window.open(
        url,
        "_blank"
    );

}

/* -------------------------
   Number Only
------------------------- */

function numberOnly(input) {

    if (!input) return;

    input.value = input.value
        .replace(/\D/g, "");

}

/* -------------------------
   Input Events
------------------------- */

window.addEventListener("DOMContentLoaded", () => {

    const phone = $("#phoneInput");

    if (phone) {

        phone.addEventListener("input", () => {

            numberOnly(phone);

        });

    }

    const history = $("#historyPhone");

    if (history) {

        history.addEventListener("input", () => {

            numberOnly(history);

        });

    }

});