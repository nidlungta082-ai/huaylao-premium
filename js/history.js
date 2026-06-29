/* ==========================================
   หวยลาว Premium
   History
========================================== */

const History = {

    async load() {

        const phone = cleanPhone(

            document.getElementById("historyPhone").value

        );

        if (phone.length !== 10) {

            Popup.error(

                "แจ้งเตือน",

                "กรุณากรอกเบอร์โทร 10 หลัก"

            );

            return;

        }

        showLoading();

        const result = await API.history(phone);

        hideLoading();

        const list = document.getElementById("historyList");

        if (!result.success) {

            list.innerHTML = `
                <p class="mini-note">
                    ไม่สามารถโหลดข้อมูลได้
                </p>
            `;

            return;

        }

        if (result.history.length === 0) {

            list.innerHTML = `
                <p class="mini-note">
                    ไม่พบประวัติ
                </p>
            `;

            return;

        }

        let html = "";

        result.history.forEach(item => {

            const color =
                item.result === "ถูกรางวัล"
                    ? "#47ff78"
                    : item.result === "รอตรวจผล"
                    ? "#ffd84d"
                    : "#ff7070";

            html += `

            <div class="history-card">

                <div class="history-top">

                    <div>

                        <strong>${item.name}</strong>

                        <div class="history-date">

                            ${item.date}

                        </div>

                    </div>

                    <span
                        class="history-result"
                        style="color:${color}"
                    >

                        ${item.result}

                    </span>

                </div>

                <div class="history-number">

                    <div>

                        <small>2 ตัว</small>

                        <h3>${item.digit2 || "--"}</h3>

                    </div>

                    <div>

                        <small>3 ตัว</small>

                        <h3>${item.digit3 || "---"}</h3>

                    </div>

                </div>

            </div>

            `;

        });

        list.innerHTML = html;

    }

};