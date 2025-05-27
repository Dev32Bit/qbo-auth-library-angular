// qbo-auth-lib.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map } from 'rxjs';

export interface QboConfig {
  apiBase:       string;
  clientId:      string;
  clientSecret:  string;
  redirectUri:   string;
  environment:   'sandbox' | 'production';
  scope:         string;
}

@Injectable({ providedIn: 'root' })
export class QboAuthService {
  private config!: QboConfig;

  constructor(private http: HttpClient) {}

  /** Call once, e.g. in your component’s ngOnInit */
  setConfig(cfg: QboConfig) {
    // strip trailing slash if present
    cfg.apiBase = cfg.apiBase.replace(/\/+$/, '');
    this.config = cfg;
  }

  /** STEP 1: kick off OAuth by POST-ing to /auth/initiate */
  initiateAuth(): Observable<string> {
    const body = {
      clientId:     this.config.clientId,
      clientSecret: this.config.clientSecret,
      redirectUri:  this.config.redirectUri,
      environment:  this.config.environment,
      scope:        this.config.scope
    };

    return this.http
      .post<{ url: string }>(`${this.config.apiBase}/auth/initiate`, body)
      .pipe(map(res => res.url));
  }

  /** STEP 2: exchange code for token by POST-ing to /auth/callback */
  handleCallback(): Observable<any> {
    if (typeof window === 'undefined')
      return throwError(() => new Error('Not in a browser'));

    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return throwError(() => new Error('No auth code in URL'));

    const body = {
      clientId:     this.config.clientId,
      clientSecret: this.config.clientSecret,
      redirectUri:  this.config.redirectUri,
      environment:  this.config.environment,
      authCode:     code
    };

    return this.http.post<any>(`${this.config.apiBase}/auth/callback`, body);
  }

  /** STEP 3: disconnect by POST-ing to /auth/disconnect */
  disconnect(accessToken: string): Observable<any> {
    const body = {
      clientId:     this.config.clientId,
      clientSecret: this.config.clientSecret,
      redirectUri:  this.config.redirectUri,
      environment:  this.config.environment,
      accessToken
    };
    return this.http.post<any>(`${this.config.apiBase}/auth/disconnect`, body);
  }
}
