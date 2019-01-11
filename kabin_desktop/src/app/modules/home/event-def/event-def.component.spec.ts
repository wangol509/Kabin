import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDefComponent } from './class-def.component';

describe('ClassDefComponent', () => {
  let component: ClassDefComponent;
  let fixture: ComponentFixture<ClassDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDefComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
