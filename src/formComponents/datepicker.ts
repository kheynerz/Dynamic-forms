import { FormComponent } from "./formComponent";

export class Datepicker extends FormComponent {
  type : string = 'datepicker';
 
  constructor(key: string, className : string){
    super(key, className)
  }
}