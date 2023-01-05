import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from './response-base.model';

export class ResponseHttp<T = any> extends ResponseBase<T> {
  @ApiProperty({
    description: 'Objeto con parámetros que indican los datos de paginación.',
  })
  public details?: any;

  constructor(
    public status?: number,
    code?: string,
    message?: string,
    data?: T,
  ) {
    super(code, message, data);
  }
}
