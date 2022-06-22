import { FormComponent } from "./formComponent";

export class Select  extends FormComponent{
  constructor(key: string, className : string){
    super(key, className, 'select')
  }
}