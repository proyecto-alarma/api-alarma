import { Module } from '@nestjs/common';
import { ColaboradoresService } from './colaboradores.service';
import { ColaboradoresController } from './colaboradores.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Colaboradore, ColaboradoreSchema } from './entities/colaboradore.entity';

@Module({
  controllers: [ColaboradoresController],
  providers: [ColaboradoresService],
  exports:[
    ColaboradoresService
  ],
  imports:[
    CommonModule,

    MongooseModule.forFeature([
      {
        name: Colaboradore.name,
        schema: ColaboradoreSchema,
      },
    ]),
  ]
})
export class ColaboradoresModule {}
