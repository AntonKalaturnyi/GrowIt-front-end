import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerRegComponent } from './borrower-reg.component';

describe('BorrowerRegComponent', () => {
  let component: BorrowerRegComponent;
  let fixture: ComponentFixture<BorrowerRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowerRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
