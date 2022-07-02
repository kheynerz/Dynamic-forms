import { FormComponent } from "./formComponent";

export class Datepicker extends FormComponent {
  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'datepicker', ['label', 'description', 'required'])
  }
}