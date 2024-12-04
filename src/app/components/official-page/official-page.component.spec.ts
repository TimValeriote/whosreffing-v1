import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialPageComponent } from './official-page.component';

describe('OfficialPageComponent', () => {
  let component: OfficialPageComponent;
  let fixture: ComponentFixture<OfficialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficialPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
