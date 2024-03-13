import { Module } from '@nestjs/common';

import { CipherService } from './cipher/cipher.service';
import { HashService } from './hash.service';

@Module({
  providers: [HashService, CipherService],
  exports: [HashService, CipherService],
})
export class HashModule {}
