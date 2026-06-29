/* ==========================================
   หวยลาว Premium
   Keypad Production
========================================== */

const Keypad = {

    mode: "",
    value: "",

    open(mode) {

        this.mode = mode;
        this.value = "";

        const overlay = document.getElementById("sheetOverlay");
        const display = document.getElementById("keyDisplay");
        const title = document.getElementById("keypadTitle");

        if (!overlay || !display || !title) return;

        if (mode === "digit2") {
            title.innerHTML = "เลือกเลข 2 ตัว";
        } else {
            title.innerHTML = "เลือกเลข 3 ตัว";
        }

        display.innerHTML = mode === "digit2" ? "--" : "---";

        overlay.classList.add("show");

        vibrate(15);

    },

    close() {

        const overlay = document.getElementById("sheetOverlay");

        if (overlay) {
            overlay.classList.remove("show");
        }

        this.mode = "";
        this.value = "";

    },

    closeByOverlay(e) {

        if (e.target.id === "sheetOverlay") {
            this.close();
        }

    },

    press(num) {

        const limit = this.mode === "digit2" ? 2 : 3;

        if (this.value.length >= limit) return;

        this.value += num;

        this.render();

        vibrate(10);

    },

    delete() {

        if (!this.value.length) return;

        this.value = this.value.slice(0, -1);

        this.render();

        vibrate(8);

    },

    render() {

        const display = document.getElementById("keyDisplay");

        if (!display) return;

        const limit = this.mode === "digit2" ? 2 : 3;

        let txt = this.value;

        while (txt.length < limit) {

            txt += "-";

        }

        display.innerHTML = txt;

    },

    confirm() {

        const limit = this.mode === "digit2" ? 2 : 3;

        if (this.value.length !== limit) {

            Popup.warning(
                "เลขไม่ครบ",
                `กรุณาเลือกเลข ${limit} หลัก`
            );

            return;

        }

        if (this.mode === "digit2") {

            APP.digit2 = this.value;

            const text = document.getElementById("digit2Text");
            if (text) text.innerHTML = this.value;

            const card = document.getElementById("digit2Card");
            if (card) card.classList.add("active");

        } else {

            APP.digit3 = this.value;

            const text = document.getElementById("digit3Text");
            if (text) text.innerHTML = this.value;

            const card = document.getElementById("digit3Card");
            if (card) card.classList.add("active");

        }

        this.close();

    }

};

/* ESC ปิด */

document.addEventListener("keydown", function(e){

    if(e.key==="Escape"){

        Keypad.close();

    }

});