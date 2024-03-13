import { Injectable } from '@nestjs/common';

import { createCipheriv, createDecipheriv, createHash } from 'crypto';

@Injectable()
export class CipherService {
  password = 'enovar';
  iterations = 19;
  salt = Buffer.from([0xa9, 0x9b, 0xc8, 0x32, 0x56, 0x35, 0xe3, 0x03]);

  KDF() {
    const pwd = Buffer.from(this.password);
    let key = Buffer.concat([pwd, this.salt]);
    let i = 0;

    for (i = 0; i < this.iterations; i += 1) {
      key = createHash('md5').update(key).digest();
    }

    return key;
  }

  getKeyIV() {
    const key = this.KDF();
    const keyBuf = Buffer.from(key).slice(0, 8);
    const ivBuf = Buffer.from(key).slice(8, 16);

    return [keyBuf, ivBuf];
  }

  encrypt(payload: string) {
    const kiv = this.getKeyIV();
    const cipher = createCipheriv('des', kiv[0], kiv[1]);
    const encrypted = [];

    encrypted.push(cipher.update(payload, 'utf-8', 'hex'));
    encrypted.push(cipher.final('hex'));

    return Buffer.from(encrypted.join(''), 'hex').toString('base64');
  }

  decrypt(payload: string) {
    const encryptedBuffer = Buffer.from(payload, 'base64');
    const kiv = this.getKeyIV();
    const decipher = createDecipheriv('des', kiv[0], kiv[1]);
    const decrypted = [];

    decrypted.push(decipher.update(encryptedBuffer));
    decrypted.push(decipher.final());

    return decrypted.join('');
  }
}
