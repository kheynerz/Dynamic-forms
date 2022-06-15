import { FormComponent } from "./formComponent";

export class Select  extends FormComponent{
  type: string = 'select';
  
  constructor(key: string, className : string){
    super(key, className)
  }
}