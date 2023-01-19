import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from 'src/user/user.module';
import { ModeModule } from 'src/mode/mode.module';
@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    UserModule,
    ModeModule,
  ]
})
export class SeedModule {}
