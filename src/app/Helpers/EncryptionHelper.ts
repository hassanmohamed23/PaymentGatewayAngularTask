import * as CryptoJS from 'crypto-js';

export class EncryptionHelper {
  static encrypt(data: string, key: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Base64.parse(key), {
      mode: CryptoJS.mode.CBC,
      iv: CryptoJS.lib.WordArray.random(16),
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  static decrypt(encryptedData: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Base64.parse(key), {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
