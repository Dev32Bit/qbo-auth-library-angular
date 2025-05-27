// qbo-auth-lib.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { QboAuthService, QboConfig } from './qbo-auth-lib.service';

@Component({
  selector: 'auth',
  templateUrl: './qbo-auth-lib.component.html',
  styleUrls: ['./qbo-auth-lib.component.scss']
})
export class QboAuthComponent implements OnInit {
  @Input() clientId = '';
  @Input() clientSecret = '';                          // ← new
  @Input() callBackURL = '';                           // ← renamed from callbackURL
  @Input() unifiedApiEndpoint = '';                    // your API base
  @Input() environment: any = 'sandbox';
  @Input() scope = '';

  errorMessage = '';
  isConnected = false;
  qboDetails: any;

  constructor(private qboService: QboAuthService) { }

  ngOnInit(): void {
    // 1️⃣ configure the service once
    const cfg: QboConfig = {
      apiBase: this.unifiedApiEndpoint,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redirectUri: this.callBackURL,
      environment: this.environment,
      scope: this.scope
    };
    this.qboService.setConfig(cfg);

    // 2️⃣ if Intuit redirected back with ?code=…
    if (window.location.search.includes('code=')) {
      this.qboService.handleCallback().subscribe({
        next: (res) => {
          // your controller returns { isConnected: true, tokens }
          this.qboDetails = res.tokens ?? res;
          this.isConnected = true;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Failed to connect to QBO';
        }
      });
    }
  }

  connectToQbo() {
    this.qboService.initiateAuth().subscribe({
      next: (url) => {
        console.log('Received URL:', url); // ✅ log the URL
        window.location.href = url;
      },
      error: (err) => {
        console.error('Error during QBO auth:', err); // ✅ log the error
        this.errorMessage = err.message;
      }
    });
  }


  disconnectQbo() {
    const token = this.qboDetails?.accessToken;
    if (!token) {
      this.errorMessage = 'No access token available to disconnect';
      return;
    }

    this.qboService.disconnect(token).subscribe({
      next: () => {
        this.qboDetails = null;
        this.isConnected = false;
      },
      error: (err) => (this.errorMessage = err.message)
    });
  }
}
