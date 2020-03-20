import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsFillComponent } from './assets-fill.component';

describe('AssetsFillComponent', () => {
  let component: AssetsFillComponent;
  let fixture: ComponentFixture<AssetsFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
