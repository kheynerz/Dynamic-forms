import { FormComponent } from "./formComponent";

export class Checkbox extends FormComponent{
  constructor(key: string, className : string){
    super(key, className, 'checkbox', ['defaultValue', 'label','description'])
  }
}