/* ==========================================
   หวยลาว Premium
   Popup Production
========================================== */

const Popup = {
    callback: null,
    isOpen: false,

    icons: {
        success: "https://img.icons8.com/fluency/128/checked.png",
        error: "https://img.icons8.com/fluency/128/high-priority.png",
        warning: "https://img.icons8.com/fluency/128/error.png",
        confirm: "https://img.icons8.com/fluency/128/help.png",
        info: "https://img.icons8.com/fluency/128/info.png"
    },

    show(type = "info", title = "แจ้งเตือน", message = "", options = {}) {
        const overlay = document.getElementById("popupOverlay");
        const icon = document.getElementById("popupIcon");
        const titleEl = document.getElementById("popupTitle");
        const messageEl = document.getElementById("popupMessage");
        const actions = document.getElementById("popupActions");

        if (!overlay || !icon || !titleEl || !messageEl || !actions) return;

        this.callback = typeof options.onConfirm === "function" ? options.onConfirm : null;

        icon.src = this.icons[type] || this.icons.info;
        titleEl.innerHTML = title;
        messageEl.innerHTML = message;

        if (options.confirm) {
            actions.innerHTML = `
                <button class="ghost-button" onclick="Popup.close()">ยกเลิก</button>
                <button class="gold-button" onclick="Popup.ok()">ยืนยัน</button>
            `;
        } else {
            actions.innerHTML = `
                <button class="gold-button" onclick="Popup.close()">ตกลง</button>
            `;
        }

        overlay.classList.add("show");
        this.isOpen = true;
        vibrate(12);
    },

    success(title = "สำเร็จ", message = "") {
        this.show("success", title, message);
    },

    error(title = "ผิดพลาด", message = "") {
        this.show("error", title, message);
    },

    warning(title = "แจ้งเตือน", message = "") {
        this.show("warning", title, message);
    },

    alert(title = "แจ้งเตือน", message = "") {
        this.show("info", title, message);
    },

    confirm(title = "ยืนยัน", message = "", callback = null) {
        this.show("confirm", title, message, {
            confirm: true,
            onConfirm: callback
        });
    },

    ok() {
        const cb = this.callback;
        this.close();

        if (cb) {
            setTimeout(() => {
                cb();
            }, 120);
        }
    },

    close() {
        const overlay = document.getElementById("popupOverlay");
        if (!overlay) return;

        overlay.classList.remove("show");
        this.isOpen = false;
        this.callback = null;
    }
};

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && Popup.isOpen) {
        Popup.close();
    }
});