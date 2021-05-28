import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgplDatePickerComponent } from './ngpl-date-picker.component';

describe('WidgetDatePickerComponent', () => {
  let component: NgplDatePickerComponent;
  let fixture: ComponentFixture<NgplDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgplDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
