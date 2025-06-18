import jwt_encode from "jwt-encode";

export function createToken(userId) {
  const payload = {
    user_id: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
  };
  const secret = "ZXCV1qazSXX";
  const token = jwt_encode(payload, secret);
  return token;
}

export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}
