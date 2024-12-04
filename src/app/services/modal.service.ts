import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModal: boolean = false;

  constructor() { }

  shouldShowModal(): boolean {
    return this.showModal;
  }

  showModalWindow(): void {
    this.showModal = true;
  }

  hideModal(): void {
    this.showModal = false;
  }
}
