import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireReportComponent } from './affaire-report.component';

describe('AffaireReportComponent', () => {
  let component: AffaireReportComponent;
  let fixture: ComponentFixture<AffaireReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
