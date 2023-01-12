import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { AuthModule } from '../auth/auth.module';
import { Auth, AuthSchema } from '../auth/entities/auth.entity';
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],
  imports:[
    CommonModule,
ConfigurationModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
  ]
})

export class UserModule {}
