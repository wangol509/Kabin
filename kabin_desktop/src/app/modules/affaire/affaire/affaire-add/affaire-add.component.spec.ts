import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireAddComponent } from './affaire-add.component';

describe('AffaireAddComponent', () => {
  let component: AffaireAddComponent;
  let fixture: ComponentFixture<AffaireAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
