import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactsComponent } from './impacts.component';

describe('impactsComponent', () => {
  let component: ImpactsComponent;
  let fixture: ComponentFixture<ImpactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
