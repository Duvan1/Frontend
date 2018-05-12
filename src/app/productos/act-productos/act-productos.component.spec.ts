import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActProductosComponent } from './act-productos.component';

describe('ActProductosComponent', () => {
  let component: ActProductosComponent;
  let fixture: ComponentFixture<ActProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
