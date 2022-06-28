import { FormComponent } from "./formComponent";

export class Toggle extends FormComponent{

  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'toggle', ['label', 'description', 'required'])
  }
}