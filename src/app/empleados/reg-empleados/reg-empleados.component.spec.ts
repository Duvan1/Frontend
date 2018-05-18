import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEmpleadosComponent } from './reg-empleados.component';

describe('RegEmpleadosComponent', () => {
  let component: RegEmpleadosComponent;
  let fixture: ComponentFixture<RegEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
