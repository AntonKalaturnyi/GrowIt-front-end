import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorCabinetComponent } from './investor-cabinet.component';

describe('InvestorCabinetComponent', () => {
  let component: InvestorCabinetComponent;
  let fixture: ComponentFixture<InvestorCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
