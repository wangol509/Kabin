import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireDeleteComponent } from './affaire-delete.component';

describe('AffaireDeleteComponent', () => {
  let component: AffaireDeleteComponent;
  let fixture: ComponentFixture<AffaireDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireDeleteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
