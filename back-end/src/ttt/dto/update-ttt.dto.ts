import { PartialType } from '@nestjs/swagger';
import { CreateTttDto } from './create-ttt.dto';

export class UpdateTttDto extends PartialType(CreateTttDto) {}
