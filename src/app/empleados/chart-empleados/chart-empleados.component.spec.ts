import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEmpleadosComponent } from './chart-empleados.component';

describe('ChartEmpleadosComponent', () => {
  let component: ChartEmpleadosComponent;
  let fixture: ComponentFixture<ChartEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
