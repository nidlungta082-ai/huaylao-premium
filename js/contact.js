const Contact = {
  openAdmin() {
    const link =
      APP.setting["LINE"] ||
      APP.setting["ลิงก์ติดต่อแอดมิน"] ||
      CONFIG.LINE_URL ||
      "";

    if (!link) {
      Popup.error("ยังไม่มีลิงก์", "กรุณาใส่ลิงก์ LINE ในชีตตั้งค่า");
      return;
    }

    openLink(link);
  }
};