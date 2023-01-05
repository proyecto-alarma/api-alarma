import { PartialType } from '@nestjs/mapped-types';
import { CreateAlarmaDto } from './create-alarma.dto';

export class UpdateAlarmaDto extends PartialType(CreateAlarmaDto) {}
