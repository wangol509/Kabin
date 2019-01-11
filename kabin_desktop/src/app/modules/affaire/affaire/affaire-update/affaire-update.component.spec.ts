import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireUpdateComponent } from './affaire-update.component';

describe('AffaireUpdateComponent', () => {
  let component: AffaireUpdateComponent;
  let fixture: ComponentFixture<AffaireUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
