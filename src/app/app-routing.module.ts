import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgplDatePickerTestComponent} from './app-test/ngpl-date-picker-test/ngpl-date-picker-test.component';

const routes: Routes = [
  {
    path: 'ngpl-date-picker',
    component: NgplDatePickerTestComponent
  }, {
    path: '**',
    component: NgplDatePickerTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
