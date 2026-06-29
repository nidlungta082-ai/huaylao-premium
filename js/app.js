/* ==========================================
   หวยลาว Premium
   Main App V2
========================================== */

const App = {
  async init() {
    await Splash.start();

    showLoading();

    const result = await API.getSetting();

    hideLoading();

    if (!result.success) {
      Popup.error("เชื่อมต่อไม่สำเร็จ", result.message || "โหลดข้อมูลไม่สำเร็จ");
      return;
    }

    APP.setting = result.setting || {};
    this.applySetting();
  },

  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },

  applySetting() {
    const s = APP.setting;

    const title = s["ชื่อกิจกรรม"] || "ทายผลหวยลาว";
    this.setText("mainTitle", title);
    this.setText("headerTitle", title);

    const drawDate = s["งวดประจำวันที่"] || "-";
    this.setText("drawDate", "งวดวันที่ " + drawDate);

    const round = s["รอบปัจจุบัน"] || "-";
    this.setText("roundText", "รอบ : " + round);

    const formCard = document.getElementById("formCard");
    const closedCard = document.getElementById("closedCard");

    if (s["สถานะระบบ"] === "ปิด") {
      if (formCard) formCard.style.display = "none";
      if (closedCard) closedCard.style.display = "block";
    } else {
      if (closedCard) closedCard.style.display = "none";
      if (formCard) formCard.style.display = "block";
    }

    const open2 = String(
      s["เปิดเลข2"] ??
      s["เปิดเลข 2 ตัว"] ??
      "TRUE"
    ).trim().toUpperCase();

    const open3 = String(
      s["เปิดเลข3"] ??
      s["เปิดเลข 3 ตัว"] ??
      "TRUE"
    ).trim().toUpperCase();

    const digit2Card = document.getElementById("digit2Card");
    const digit3Card = document.getElementById("digit3Card");

    if (digit2Card) digit2Card.style.display = open2 === "TRUE" ? "" : "none";
    if (digit3Card) digit3Card.style.display = open3 === "TRUE" ? "" : "none";
  },

  showPage(id, button) {
    showPage(id);

    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.remove("active");
    });

    if (button) button.classList.add("active");

    APP.currentPage = id;
  },

  confirmSubmit() {
    const nameInput = document.getElementById("nameInput");
    const phoneInput = document.getElementById("phoneInput");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? cleanPhone(phoneInput.value) : "";

    const s = APP.setting;

    const open2 = String(
      s["เปิดเลข2"] ??
      s["เปิดเลข 2 ตัว"] ??
      "TRUE"
    ).trim().toUpperCase();

    const open3 = String(
      s["เปิดเลข3"] ??
      s["เปิดเลข 3 ตัว"] ??
      "TRUE"
    ).trim().toUpperCase();

    if (open2 === "TRUE" && APP.digit2.length !== 2) {
      Popup.warning("เลขไม่ครบ", "กรุณาเลือกเลข 2 ตัว");
      return;
    }

    if (open3 === "TRUE" && APP.digit3.length !== 3) {
      Popup.warning("เลขไม่ครบ", "กรุณาเลือกเลข 3 ตัว");
      return;
    }

    if (!name) {
      Popup.error("แจ้งเตือน", "กรุณากรอกชื่อ");
      return;
    }

    if (phone.length !== 10) {
      Popup.error("แจ้งเตือน", "กรุณากรอกเบอร์โทร 10 หลัก");
      return;
    }

    Popup.confirm(
      "ยืนยันคำตอบ",
      `
      <div style="text-align:center">
        <p>เลข 2 ตัว : <b>${APP.digit2 || "-"}</b></p>
        <p>เลข 3 ตัว : <b>${APP.digit3 || "-"}</b></p>
        <p>${name}</p>
        <p>${phone}</p>
      </div>
      `,
      () => this.submit()
    );
  },

  async submit() {
    if (APP.loading) return;

    APP.loading = true;
    showLoading();

    const nameInput = document.getElementById("nameInput");
    const phoneInput = document.getElementById("phoneInput");

    const result = await API.submit({
      name: nameInput ? nameInput.value.trim() : "",
      phone: phoneInput ? cleanPhone(phoneInput.value) : "",
      digit2: APP.digit2,
      digit3: APP.digit3
    });

    hideLoading();
    APP.loading = false;

    if (!result.success) {
      Popup.error("ผิดพลาด", result.message || "ส่งข้อมูลไม่สำเร็จ");
      return;
    }

    Popup.success("สำเร็จ", result.message || "ส่งคำทายเรียบร้อย");

    this.resetForm();
  },

  resetForm() {
    const nameInput = document.getElementById("nameInput");
    const phoneInput = document.getElementById("phoneInput");

    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";

    APP.digit2 = "";
    APP.digit3 = "";

    this.setText("digit2Text", "--");
    this.setText("digit3Text", "---");

    const digit2Card = document.getElementById("digit2Card");
    const digit3Card = document.getElementById("digit3Card");

    if (digit2Card) digit2Card.classList.remove("active");
    if (digit3Card) digit3Card.classList.remove("active");
  }
};

window.addEventListener("load", () => {
  App.init();
});