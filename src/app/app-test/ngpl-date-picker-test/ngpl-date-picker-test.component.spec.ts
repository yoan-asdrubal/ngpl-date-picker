import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplDatePickerTestComponent } from './ngpl-date-picker-test.component';

describe('NgplSelectTestComponent', () => {
  let component: NgplDatePickerTestComponent;
  let fixture: ComponentFixture<NgplDatePickerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgplDatePickerTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplDatePickerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
