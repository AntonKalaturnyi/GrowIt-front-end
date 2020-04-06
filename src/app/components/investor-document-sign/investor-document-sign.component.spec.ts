import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorDocumentSignComponent } from './investor-document-sign.component';

describe('InvestorDocumentSignComponent', () => {
  let component: InvestorDocumentSignComponent;
  let fixture: ComponentFixture<InvestorDocumentSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorDocumentSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorDocumentSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
