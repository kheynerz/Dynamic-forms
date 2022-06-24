import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { FormControl } from '@angular/forms';

@Component({
 selector: 'formly-field-label',
 template: `
  [formControl]="formControl" [formlyAttributes]="field"
 `,
})
export class FormlyFieldLabel extends FieldType<FieldTypeConfig> {
  FormControl! : FormControl;
}