import { FormComponent } from "./formComponent";

export class Checkbox extends FormComponent{
  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'checkbox', ['defaultValue', 'label','description'])
  }
}