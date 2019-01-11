import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamMgrComponent } from './param-mgr.component';

describe('ParamMgrComponent', () => {
  let component: ParamMgrComponent;
  let fixture: ComponentFixture<ParamMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParamMgrComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
