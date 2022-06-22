import { FormComponent } from "./formComponent";

export class RadioButton extends FormComponent{
  constructor(key: string, className : string){
    super(key, className, 'radio')
  }
}