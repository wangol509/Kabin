import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierViewComponent } from './dossier-view.component';

describe('DossierViewComponent', () => {
  let component: DossierViewComponent;
  let fixture: ComponentFixture<DossierViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DossierViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
