import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationFillComponent } from './education-fill.component';

describe('EducationFillComponent', () => {
  let component: EducationFillComponent;
  let fixture: ComponentFixture<EducationFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
