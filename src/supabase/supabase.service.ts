import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { Observable, from, of, switchMap } from 'rxjs';
import {
  LoginInterface,
  SignupInterface,
} from 'src/api/auth/interfaces/auth.interface';
import configuration from 'src/configuration/configuration';
import { Logger } from 'src/logger/logger.service';
import {
  SupabaseResponseInterface,
  SupabaseResponseUserDataInterface,
} from './interfaces/supabase.interface';

@Injectable()
export class SupabaseService {
  private supabaseUrl: string;
  private supabaseKey: string;
  private supabase: any;

  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(SupabaseService.name);

    this.supabaseUrl = this.config.supabase.url as string;
    this.supabaseKey = this.config.supabase.key as string;

    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  signup(body: SignupInterface): Observable<SupabaseResponseUserDataInterface> {
    const { email, password } = body;

    return from(this.supabase.auth.signUp({ email, password })).pipe(
      switchMap(
        ({ data, error }: SupabaseResponseInterface): Observable<any> => {
          if (error) throw new BadRequestException();
          return of({ id: data.user.id });
        },
      ),
    );
  }

  login(body: LoginInterface): Observable<boolean> {
    const { email, password } = body;

    return from(
      this.supabase.auth.signInWithPassword({ email, password }),
    ).pipe(
      switchMap(({ error }: { error: object | null }): Observable<boolean> => {
        if (error) throw new UnauthorizedException();
        return of(true);
      }),
    );
  }
}
