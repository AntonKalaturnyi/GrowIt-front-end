import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerPassportFillComponent } from './borrower-passport-fill.component';

describe('BorrowerPassportFillComponent', () => {
  let component: BorrowerPassportFillComponent;
  let fixture: ComponentFixture<BorrowerPassportFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowerPassportFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerPassportFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
