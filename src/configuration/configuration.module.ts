import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtstrategy.service';

@Module({
  providers: [ConfigurationService,
    JwtStrategy,
  
  ],
  exports:[
    ConfigurationService
  ],
  imports:[    JwtModule.register({
    secret: '43vcdsvr4565756',
    privateKey:"23423646327467362746",
    signOptions: { expiresIn: '24h', },
  }),]
})
export class ConfigurationModule {}
