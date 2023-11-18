import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';

@Controller({ path: 'profile', version: '1' })
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}

  @Get()
  getProfile(): Observable<any> {
    return this.profile.getProfile();
  }
}
