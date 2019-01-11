import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayComponent } from './employee-pay.component';

describe('EmployeePayComponent', () => {
  let component: EmployeePayComponent;
  let fixture: ComponentFixture<EmployeePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
