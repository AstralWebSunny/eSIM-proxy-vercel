export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ code: "METHOD_NOT_ALLOWED", message: "Only POST allowed" });
  }

  try {
    const body = req.body;

    // 如果是 App Proxy 傳進來，Shopify 會轉成 x-www-form-urlencoded，要處理
    let iccid = body.iccid;

    if (typeof body === "string") {
      const params = new URLSearchParams(body);
      iccid = params.get("iccid");
    }

    if (!iccid) {
      return res.status(400).json({ code: "MISSING_ICCID", message: "請提供 ICCID" });
    }

    // 呼叫 ERP 查詢 API
    const response = await fetch("https://ordershook.avironetwork.com/Shopifyhook/sim_open_api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ iccid }),
    });

    const result = await response.json();

    if (result.code !== "0") {
      return res.status(500).json({ code: result.code, message: result.message || "查詢失敗" });
    }

    // 成功回傳 ERP 查詢資料
    return res.status(200).json(result);

  } catch (err) {
    console.error("查詢錯誤：", err);
    return res.status(500).json({ code: "SERVER_ERROR", message: "伺服器錯誤，請稍後再試。" });
  }
}
