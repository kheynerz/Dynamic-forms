import { FormComponent } from "./formComponent";

export class Checkbox extends FormComponent{
  type : string = 'checkbox';

  constructor(key: string, className : string){
    super(key, className)
  }
}