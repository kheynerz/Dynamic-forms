import { FormComponent } from "./formComponent";

export class Datepicker extends FormComponent {
  constructor(key: string, className : string){
    super(key, className, 'datepicker', ['defaultValue', 'label', 'description', 'required'])
  }
}