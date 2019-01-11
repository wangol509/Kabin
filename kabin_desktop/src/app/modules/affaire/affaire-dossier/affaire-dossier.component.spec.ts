import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireDossierComponent } from './affaire-dossier.component';

describe('AffaireDossierComponent', () => {
  let component: AffaireDossierComponent;
  let fixture: ComponentFixture<AffaireDossierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireDossierComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
