import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireViewComponent } from './affaire-view.component';

describe('AffaireViewComponent', () => {
  let component: AffaireViewComponent;
  let fixture: ComponentFixture<AffaireViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
