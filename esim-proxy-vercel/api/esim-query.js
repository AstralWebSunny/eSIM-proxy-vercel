const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { iccid } = req.body;

  if (!iccid) {
    return res.status(400).json({ code: -1, message: "缺少 ICCID" });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("iccid", iccid);
    formData.append("pwd", "test123");

    const response = await fetch("https://ordershook.avironetwork.com/Shopifyhook/sim_open_api", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ code: -1, message: "伺服器錯誤：" + err.message });
  }
};
