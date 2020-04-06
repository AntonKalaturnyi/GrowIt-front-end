import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNavPanelComponent } from './reg-nav-panel.component';

describe('RegNavPanelComponent', () => {
  let component: RegNavPanelComponent;
  let fixture: ComponentFixture<RegNavPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegNavPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNavPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
