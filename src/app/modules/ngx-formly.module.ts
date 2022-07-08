import { NgModule } from '@angular/core';


import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

let modules = [
    FormlyMatDatepickerModule,
    FormlyMatSliderModule,
    FormlyMatToggleModule,
]

@NgModule({
    imports: modules,
    exports: modules,
})
export class NGXFormlyModule { }