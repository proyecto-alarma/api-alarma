import { ApiProperty } from '@nestjs/swagger';

export interface IresponseBase<T = any> {
  code: string | number;
  message: string;
  data?: T;
  readonly transactionId: string;
}

export class ResponseBase<T = any> implements IresponseBase<T> {
  @ApiProperty({ type: String, description: 'Identificador de la transacción' })
  public readonly transactionId: string;

  @ApiProperty({
    description:
      'Código de respuesta. Cero (0) indica que la solicitud se ejecutó correctamente. Los códigos de error pueden ser de tipo string.',
  })
  public code: string;

  @ApiProperty({ description: 'Mensaje asociado a la respuesta.' })
  public message: string;

  @ApiProperty({
    description: 'Campo en el cual se retorna la data de respuesta.',
  })
  public data?: T;

  constructor(code?: string , message?: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
