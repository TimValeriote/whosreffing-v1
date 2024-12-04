import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffReportComponent } from './playoff-report.component';

describe('PlayoffReportComponent', () => {
  let component: PlayoffReportComponent;
  let fixture: ComponentFixture<PlayoffReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayoffReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
