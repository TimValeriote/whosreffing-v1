import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeHubComponent } from './referee-hub.component';

describe('RefereeHubComponent', () => {
  let component: RefereeHubComponent;
  let fixture: ComponentFixture<RefereeHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefereeHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
