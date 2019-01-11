import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairePaymentComponent } from './affaire-payment.component';

describe('AffairePaymentComponent', () => {
  let component: AffairePaymentComponent;
  let fixture: ComponentFixture<AffairePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffairePaymentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffairePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
