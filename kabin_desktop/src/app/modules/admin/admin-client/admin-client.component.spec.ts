import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMgrComponent } from './client-mgr.component';

describe('ClientMgrComponent', () => {
  let component: ClientMgrComponent;
  let fixture: ComponentFixture<ClientMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientMgrComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
