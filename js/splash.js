/* ==========================================
   หวยลาว Premium
   Splash
========================================== */

const Splash = {

    async start() {

        const bar = document.getElementById("splashBar");
        const percent = document.getElementById("splashPercent");
        const text = document.getElementById("splashText");

        function update(value, msg) {

            bar.style.width = value + "%";
            percent.innerHTML = value + "%";
            text.innerHTML = msg;

        }

        update(10, "กำลังเริ่มระบบ...");
        await delay(200);

        update(35, "กำลังโหลดธีม...");
        await delay(200);

        update(60, "กำลังเตรียมหน้าจอ...");
        await delay(200);

        update(85, "เกือบเสร็จแล้ว...");
        await delay(200);

        update(100, "พร้อมใช้งาน");
        await delay(200);

        this.finish();

    },

    finish() {

        document
            .getElementById("splashPage")
            .classList
            .add("hide");

    }

};