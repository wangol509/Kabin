import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireMgrComponent } from './affaire-mgr.component';

describe('AffaireMgrComponent', () => {
  let component: AffaireMgrComponent;
  let fixture: ComponentFixture<AffaireMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireMgrComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
