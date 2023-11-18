import { Injectable } from '@nestjs/common';
import { Observable, of, switchMap } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { Logger } from 'src/logger/logger.service';
import { SupabaseResponseUserDataInterface } from 'src/supabase/interfaces/supabase.interface';
import { SupabaseService } from 'src/supabase/supabase.service';
import { signupDbQuery } from './db-queries/signup.db-query';
import { LoginInterface, SignupInterface } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly supabase: SupabaseService,
    private readonly db: DatabaseService<any>,
  ) {
    this.logger.setContext(AuthService.name);
  }

  signup(body: SignupInterface): Observable<boolean> {
    return this.supabase.signup(body).pipe(
      switchMap(
        (response: SupabaseResponseUserDataInterface): Observable<boolean> => {
          this.db.query(
            signupDbQuery,
            [response.id, body.name, body.name.split(' ')[0], body.email],
            String,
          );
          return of(true);
        },
      ),
    );
  }

  login(body: LoginInterface): Observable<boolean> {
    return this.supabase.login(body);
  }
}
