import { Component} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
selector: 'formly-wrapper-label',
template: `
 <span >
    {{to.label}}
 </span>
`,
})
export class LabelWrapperComponent extends FieldWrapper {
}