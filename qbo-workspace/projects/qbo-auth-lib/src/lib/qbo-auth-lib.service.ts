import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class QboAuthService {
  constructor(private http: HttpClient) {}

  getAuthUrl(clientId: string, redirectUri: string): Observable<string> {
    return this.http.get<string>(`/api/qbo/auth-url?clientId=${clientId}&redirectUri=${redirectUri}`);
  }

  handleCallback(callbackUrl: string): Observable<any> {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    return this.http.post<any>(`/api/qbo/callback`, { code, callbackUrl });
  }

  disconnect(): Observable<any> {
    return this.http.post<any>(`/api/qbo/disconnect`, {});
  }
}
