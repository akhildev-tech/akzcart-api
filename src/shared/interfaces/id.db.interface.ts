import { Type } from 'class-transformer';

export class IdDbInterface {
  @Type(() => Number)
  id: number;
}
