import { FormComponent } from "./formComponent";

export class RadioButton extends FormComponent{
  type : string = 'radio';

  constructor(key: string, className : string){
    super(key, className)
  }
}