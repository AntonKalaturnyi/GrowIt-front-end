import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorRegComponent } from './investor-reg.component';

describe('InvestorRegComponent', () => {
  let component: InvestorRegComponent;
  let fixture: ComponentFixture<InvestorRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
