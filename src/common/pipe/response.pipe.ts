import { ArgumentMetadata, BadRequestException, ValidationPipe } from "@nestjs/common"
import { ResponseBase } from "../model/response-base.model"

export class PipeResponseBase extends ValidationPipe {
    public async transform (value: any, metadata: ArgumentMetadata) {
      try {
        return await super.transform(value, metadata)
      } catch (e) {
        if (e instanceof BadRequestException) {
            let err = e.getResponse();            
          throw new BadRequestException(new ResponseBase("0", "Error al recibir datos", err['message']))
        }
      }
    }
  }
  