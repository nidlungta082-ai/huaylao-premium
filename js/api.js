/* ==========================================
   หวยลาว Premium
   API V2
========================================== */

const API = {
  async getSetting() {
    try {
      const url = CONFIG.WEB_APP_URL + "?action=ตั้งค่า&_=" + Date.now();

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store"
      });

      const text = await response.text();
      console.log("SETTING RESPONSE =", text);

      return JSON.parse(text);

    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "โหลดข้อมูลตั้งค่าไม่สำเร็จ"
      };
    }
  },

  async submit(data) {
    try {
      const form = new URLSearchParams();

      form.append("name", data.name || "");
      form.append("phone", data.phone || "");
      form.append("digit2", data.digit2 || "");
      form.append("digit3", data.digit3 || "");

      const response = await fetch(CONFIG.WEB_APP_URL, {
        method: "POST",
        body: form
      });

      const text = await response.text();
      console.log("SUBMIT RESPONSE =", text);

      return JSON.parse(text);

    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: err.message || "ส่งข้อมูลไม่สำเร็จ"
      };
    }
  },

  async history(phone) {
    try {
      const url =
        CONFIG.WEB_APP_URL +
        "?action=ประวัติ&phone=" +
        encodeURIComponent(phone) +
        "&_=" +
        Date.now();

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store"
      });

      const text = await response.text();
      console.log("HISTORY RESPONSE =", text);

      return JSON.parse(text);

    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "โหลดประวัติไม่สำเร็จ",
        history: []
      };
    }
  }
};