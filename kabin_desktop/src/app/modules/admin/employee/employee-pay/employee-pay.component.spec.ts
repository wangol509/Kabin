import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayMgrComponent } from './employee-pay-mgr.component';

describe('EmployeePayMgrComponent', () => {
  let component: EmployeePayMgrComponent;
  let fixture: ComponentFixture<EmployeePayMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePayMgrComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
