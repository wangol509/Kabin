import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeleteComponent } from './client-delete.component';

describe('ClientDeleteComponent', () => {
  let component: ClientDeleteComponent;
  let fixture: ComponentFixture<ClientDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDeleteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
