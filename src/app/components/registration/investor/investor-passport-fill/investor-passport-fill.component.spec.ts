import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorPassportFillComponent } from './investor-passport-fill.component';

describe('InvestorPassportFillComponent', () => {
  let component: InvestorPassportFillComponent;
  let fixture: ComponentFixture<InvestorPassportFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorPassportFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorPassportFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
