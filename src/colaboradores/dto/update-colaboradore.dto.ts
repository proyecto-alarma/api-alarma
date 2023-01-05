import { PartialType } from '@nestjs/swagger';
import { CreateColaboradoreDto } from './create-colaboradore.dto';

export class UpdateColaboradoreDto extends PartialType(CreateColaboradoreDto) {}
