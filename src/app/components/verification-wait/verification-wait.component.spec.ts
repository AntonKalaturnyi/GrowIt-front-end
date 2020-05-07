import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationWaitComponent } from './verification-wait.component';

describe('VerificationWaitComponent', () => {
  let component: VerificationWaitComponent;
  let fixture: ComponentFixture<VerificationWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
