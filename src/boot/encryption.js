
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'MoGHilLI15141405ParSE!AmIl@JoSSE798'; // کلید رمزنگاری خود را اینجا قرار دهید

export function encryptToken(token) {
  try {
    return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
}

export function decryptToken(encryptedToken) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}
