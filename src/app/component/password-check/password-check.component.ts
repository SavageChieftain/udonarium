import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit } from '@angular/core';

import { EventSystem, Network } from '@udonarium/core/system/system';

import { ModalService } from 'service/modal.service';
import { PanelService } from 'service/panel.service';
import { PointerDeviceService } from 'service/pointer-device.service';

@Component({
  selector: 'password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordCheckComponent implements OnInit {
  password: string = '';
  help: string = '';

  private needPassword: string = '';

  get peerId(): string { return Network.peerId; }
  get isConnected(): boolean {
    return Network.peerIds.length <= 1 ? false : true;
  }

  constructor(
    private ngZone: NgZone,
    private panelService: PanelService,
    private modalService: ModalService,
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private pointerDeviceService: PointerDeviceService
  ) {
    this.needPassword = modalService.option.password ? modalService.option.password : '';
  }

  ngOnInit() {
    this.modalService.title = this.panelService.title = 'パスワード'
    EventSystem.register(this);
  }

  ngOnDestroy() {
    EventSystem.unregister(this);
  }

  onInputChange(value: string) {
    this.help = '';
  }

  submit() {
    if (this.needPassword === this.password) this.modalService.resolve(this.password);
    this.help = 'パスワードが違います';
  }
}