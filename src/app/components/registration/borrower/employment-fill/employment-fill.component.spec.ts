import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentFillComponent } from './employment-fill.component';

describe('EmploymentFillComponent', () => {
  let component: EmploymentFillComponent;
  let fixture: ComponentFixture<EmploymentFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
