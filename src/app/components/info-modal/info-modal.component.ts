import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {

  constructor(private modalService: ModalService, 
    private cookieService: CookieService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.modalService.hideModal();
    this.router.navigate(['/']);
  }

}
