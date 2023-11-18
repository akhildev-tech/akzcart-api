import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Logger } from 'src/logger/logger.service';

@Injectable()
export class ProfileService {
  constructor(private readonly logger: Logger) {
    this.logger.setContext(ProfileService.name);
  }

  getProfile(): Observable<any> {
    return of({ id: 1 });
  }
}
