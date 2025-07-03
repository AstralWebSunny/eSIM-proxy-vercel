import querystring from "querystring";

export default async function handler(req, res) {
  const { shop, code } = req.query;
  const client_id = "1a33ac3f500ae872a5d8744109994d40";
  const client_secret = "3a731dd638415b5e9c13b8d67c5af311";

  if (!shop || !code) return res.status(400).send("Missing parameters");

  const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
  const payload = {
    client_id,
    client_secret,
    code,
  };

  try {
    const response = await fetch(accessTokenRequestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    // result.access_token 可用但此專案不需儲存

    return res.redirect("https://vn.avironetwork.com/apps/esim-query");
  } catch (err) {
    console.error("OAuth error:", err);
    return res.status(500).send("OAuth callback failed");
  }
}
