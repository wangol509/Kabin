import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireAudienceComponent } from './affaire-audience.component';

describe('AffaireAudienceComponent', () => {
  let component: AffaireAudienceComponent;
  let fixture: ComponentFixture<AffaireAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireAudienceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
