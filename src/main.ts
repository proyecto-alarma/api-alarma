import { NestFactory } from '@nestjs/core';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';
import { PipeResponseBase } from './common/pipe/response.pipe';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new PipeResponseBase(),

  );
  app.setGlobalPrefix('api/v1/')
  app.enableCors();



  const adminConfig: ServiceAccount = {
    "projectId": "alarma-488b1",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDieIlcWjYJcXhg\n9Hg0TVSp11B10TElG66n/UGoRSls98R4uw+mSv3FKcUOIanrNuBze2k5K0U//Mt+\nWXTi8IyAEaG45w2PjpF7sKVfJATV2V+lw5ckVfSZtGCXiiLv16xa3UaomZ6duh23\nrOI9kvcXemLtxhMSHSN+W2epVL5nVwsRWvHCpI6M1kLXVc+hpBAYKlkB+KI7EtR1\n2QwxsXZVhnJh90drxZje/DnD4hLxoqLQV+j4eJGub0/eFwdlmy5c0O1YO94pcUQI\nqDoZb4kWPdjIRIIiYkTXjRJjK5U+2jE4oNXXt4A+j44KtC4o8ZQlAqf6SOMd4cJi\nkYsHo8UBAgMBAAECggEADSvoxEboY+f2MgBh8dvKB+dCkhmgt7lqkPFnNU3RdRmb\ncxChHkE4DXSqlfHyB6C9UOYddnJccJZnsPFrvYuzRjsQSnhgtufaMQUS9yu5fsUJ\n3bKYmqfHpj1iDUo+0i97Yh0CwClQGvkRQ6ah0WY36gUHli/qGch5UR7okmX//XNL\n5bHlawF6+PfiwF/qohHVRF0hvAQw6JwqI6jXfTFkEzEzs++d8OL9X1CL7V+n3jwI\nibiZaMh95aKLCipWsORjq43YUULpqiC47spc3IxTwkAZU7/7BKAqhgfGcGqviD4M\ntMG6kwmOehjVFXmKdYOB0ibp3kNSeOVmTJQknYlxYQKBgQD5/wu65bfZcVk86jIw\npvzdzzjlGnbjjySub4Gq18HffTJfLZsrLStUTaPjvDuvwLqvhm6ApsktJQg85h1A\nFWiji7wIUVvypsd/znM84nDdUIVlfnD2UylHPImoQ/m2y2oArfW6DBK+hGg+laHL\nk2fjp2TO9oj8hjW1fO0pOHxEUQKBgQDn6NvLq0omPQmScoN0IUyc6wftz9qKDeyr\nxlpkg5foI+SxOs2Bpucm64iX2t0M3mt2WTldWIi0AdaWId5NQRjfmNK/bNzrXW3L\nWIUFNpRDpdPhlqgqgiYu8t4biWVvzgb1Beqys3+DkODAf0OJOW89ApVgHAZOKO3Q\novQEEjq5sQKBgAbuXEvlPJCpxNicgaG5r38S1Lf9YNh0SocPjl/HNZfVp8TdxdSP\nnwjqUiXpPRplVIezSXMFrMQ0p6LQmnUBYvJN2Hu+jbcPiq5vceB5QrnQFrK2q7kY\nmydfdU2V/OFliF3WdN6goRBpKV661U6ImrPEG1ZlnWyq5+hNO2IOL9vRAoGAMVa6\nRGeJ2/7KZYzVaMSY3x2lzzOUhCCYRKdrnczdabcRNZ+UD0xqCz67DcuzkcRUSpaK\n/NAULW/irohAGmGKIDAMTkuj6LM047lOe6B0BLxoCquZ1YlhBEYJeQRPP20uz7xV\nhXVo4J3XIz0wKia9Atbk3tC3irNsfSHeFmumcNECgYEAxo4vm5/gebGXhC7oy0KS\nbxraBSTtToSG6pTIZJFVNIvDsGwsbeZ6NZuFdjDnmmFrIbg1bah/y2EErdwA9+xn\n4DyKnCpH520RyBVDpuuWIXpTR+8sUCyoUU4Rly8rNEbANzNoZ1Z3aziMd1EezLgF\nxQmFGJ/hvvvI7+eRrrd9Kx8=\n-----END PRIVATE KEY-----\n",
    "clientEmail": process.env.CLIENT_EMAIL,
  };


  admin.initializeApp({
    credential: admin.credential.cert(adminConfig)
  },);

  await app.listen(process.env.PORT|| 3000,()=>{
    console.log('Running int porct',process.env.PORT);
    
  });
 
}
bootstrap(); 
