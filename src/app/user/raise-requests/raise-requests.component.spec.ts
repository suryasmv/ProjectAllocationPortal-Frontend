import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseRequestsComponent } from './raise-requests.component';

describe('RaiseRequestsComponent', () => {
  let component: RaiseRequestsComponent;
  let fixture: ComponentFixture<RaiseRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaiseRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaiseRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
