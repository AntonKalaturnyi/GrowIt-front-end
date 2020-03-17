import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFillComponent } from './address-fill.component';

describe('AddressFillComponent', () => {
  let component: AddressFillComponent;
  let fixture: ComponentFixture<AddressFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
