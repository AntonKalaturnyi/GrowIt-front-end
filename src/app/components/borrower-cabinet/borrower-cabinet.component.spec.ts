import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BorrowerCabinetComponent } from './borrower-cabinet.component';


describe('BorrowerCabinetComponent', () => {
  let component: BorrowerCabinetComponent;
  let fixture: ComponentFixture<BorrowerCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowerCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
