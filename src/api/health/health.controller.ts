import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { HealthService } from './health.service';

@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  @Public()
  getHealth(): void {
    return this.health.getHealth();
  }
}
