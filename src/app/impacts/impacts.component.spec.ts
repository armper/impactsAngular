import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { impactsComponent } from './impacts.component';

describe('impactsComponent', () => {
  let component: impactsComponent;
  let fixture: ComponentFixture<impactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ impactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(impactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
