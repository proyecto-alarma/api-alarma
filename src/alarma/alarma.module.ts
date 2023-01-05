import { Module } from '@nestjs/common';
import { AlarmaService } from './alarma.service';
import { AlarmaController } from './alarma.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Alarma, AlarmaSchema } from './entities/alarma.entity';
import { ColaboradoresService } from 'src/colaboradores/colaboradores.service';
import { ColaboradoresModule } from 'src/colaboradores/colaboradores.module';
import { SendMailModule } from 'src/send-mail/send-mail.module';

@Module({
  controllers: [AlarmaController],
  providers: [AlarmaService,],
  imports:[
    CommonModule,
    SendMailModule,
    ColaboradoresModule,
    MongooseModule.forFeature([
      {
        name: Alarma.name,
        schema: AlarmaSchema,
      },
    ]),
  ]
})
export class AlarmaModule {}
