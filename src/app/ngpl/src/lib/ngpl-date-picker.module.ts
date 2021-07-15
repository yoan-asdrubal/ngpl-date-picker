import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {OverlayModule} from '@angular/cdk/overlay';
import {NgplCommonDirectivesModule, NgplCommonModule} from 'ngpl-common';
import {NgplDatePickerComponent} from './ngpl-date-picker/ngpl-date-picker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgplFilterModule} from 'ngpl-filter';

const components = [
  NgplDatePickerComponent,
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    OverlayModule,
    NgplCommonModule,
    NgplFilterModule,
    NgplCommonDirectivesModule
  ]
})
export class NgplDatePickerModule {
}
