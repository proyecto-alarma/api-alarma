import { plainToClass } from 'class-transformer';
import {
  IsString,
  validateSync,
} from 'class-validator';



//Declaración de variables de ambiente requeridas u obligatorias
class EnvironmentVariables {
 

  @IsString()
  DATABASE_URL: string;

  @IsString() 
  PORT: string;

  @IsString()
  CLIENT_EMAIL: string;

  @IsString() 
  USER_ID: string;

  @IsString()
  PASS_USER_ID: string;

  @IsString() 
  PASS_DEFAULT: string;

  


}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { 
    skipMissingProperties: false, 
  });

  if (errors.length > 0) {
    const variables = errors.map((error) => error.property);
   console.log({
    msg:"Configura las variables de entorno",
    var:variables,
   },);
    
    throw new Error('Pendiente configuración de ambiente.',);
  } 
  return validatedConfig;
}
