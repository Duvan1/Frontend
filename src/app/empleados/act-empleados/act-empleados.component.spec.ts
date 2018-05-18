import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActEmpleadosComponent } from './act-empleados.component';

describe('ActEmpleadosComponent', () => {
  let component: ActEmpleadosComponent;
  let fixture: ComponentFixture<ActEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
