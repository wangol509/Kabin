import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceDeleteComponent } from './audience-delete.component';

describe('AudienceDeleteComponent', () => {
  let component: AudienceDeleteComponent;
  let fixture: ComponentFixture<AudienceDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AudienceDeleteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
