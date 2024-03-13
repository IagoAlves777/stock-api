import { Injectable } from '@nestjs/common';

import * as crypto from 'crypto';

@Injectable()
export class HashService {
  public async generateHash(payload: string): Promise<string> {
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const payloadHashed = crypto
      .createHash('sha256')
      .update(payload)
      .digest('hex');

    return String(payloadHashed).toLowerCase() === String(hashed).toLowerCase();
  }
}
