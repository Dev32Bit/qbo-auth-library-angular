import { Component, Input, OnInit } from '@angular/core';
import { QboAuthService } from './qbo-auth-lib.service';

@Component({
  selector: 'auth',
  templateUrl: './qbo-auth-lib.component.html',
  styleUrls: ['./qbo-auth-lib.component.scss'],
  standalone: false
})
export class QboAuthComponent implements OnInit {
  @Input() clientId!: string;
  @Input() clientSecret!: string;
  @Input() callBackURL!: string;
  @Input() unifiedApiEndpoint!: string;

  isConnected = false;
  qboDetails: any;

  constructor(private qboService: QboAuthService) { }

  ngOnInit(): void {
    this.qboService.handleCallback(this.callBackURL).subscribe((res) => {
      this.qboDetails = res;
      this.isConnected = true;
    });
  }

  connectToQbo() {
    this.qboService.getAuthUrl(this.clientId, this.callBackURL).subscribe((url: string) => {
      window.location.href = url;
    });
  }

  disconnectQbo() {
    this.qboService.disconnect().subscribe(() => {
      this.qboDetails = null;
      this.isConnected = false;
    });
  }
}
