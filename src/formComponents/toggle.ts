import { FormComponent } from "./formComponent";

export class Toggle extends FormComponent{
  type : string = 'toggle';

  constructor(key: string, className : string){
    super(key, className)
  }
}