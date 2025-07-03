export default async function handler(req, res) {
  const { shop } = req.query;
  const client_id = "1a33ac3f500ae872a5d8744109994d40";
  const redirect_uri = "https://e-sim-proxy-vercel.vercel.app/api/auth/callback";

  if (!shop) return res.status(400).send("Missing shop param");

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${client_id}&scope=read_products&redirect_uri=${redirect_uri}`;
  res.redirect(installUrl);
}
