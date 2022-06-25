import { FormComponent } from "./formComponent";

export class Toggle extends FormComponent{

  constructor(key: string, className : string){
    super(key, className, 'toggle', ['label', 'description', 'required'])
  }
}