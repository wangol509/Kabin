import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMgrComponent } from './employee-mgr.component';

describe('EmployeeMgrComponent', () => {
  let component: EmployeeMgrComponent;
  let fixture: ComponentFixture<EmployeeMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeMgrComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
