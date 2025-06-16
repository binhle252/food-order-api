const https = require('https');
const crypto = require('crypto');

exports.createMomoPayment = (req, res) => {
  const {
    amount = '50000',
    orderInfo = 'Thanh toán đơn hàng',
  } = req.body;

  const partnerCode = process.env.MOMO_PARTNER_CODE;
  const accessKey = process.env.MOMO_ACCESS_KEY;
  const secretKey = process.env.MOMO_SECRET_KEY;
  const redirectUrl = process.env.MOMO_REDIRECT_URL;
  const ipnUrl = process.env.MOMO_IPN_URL;

  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const requestType = "captureWallet";
  const extraData = ''; // optional

  // Raw signature
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  // HMAC SHA256
  const signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang: 'vi',
    requestType,
    autoCapture: true,
    extraData,
    signature
  });

  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  };

  const momoReq = https.request(options, momoRes => {
    let data = '';
    momoRes.on('data', chunk => (data += chunk));
    momoRes.on('end', () => {
      const response = JSON.parse(data);
      res.json({ payUrl: response.payUrl });
    });
  });

  momoReq.on('error', e => {
    res.status(500).json({ message: 'Lỗi khi gọi MoMo', error: e.message });
  });

  momoReq.write(requestBody);
  momoReq.end();
};
