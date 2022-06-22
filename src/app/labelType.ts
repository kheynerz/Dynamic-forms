import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { Form, FormControl } from '@angular/forms';

@Component({
 selector: 'formly-field-label',
 template: `
   <span type="input" [formControl]="formControl" [formlyAttributes]="field"></span>
 `,
})
export class FormlyFieldLabel extends FieldType<FieldTypeConfig> {
    FormControl! : FormControl;

}