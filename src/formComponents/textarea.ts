import { FormComponent } from "./formComponent";

export class Textarea extends FormComponent{

  constructor(key: string, className : string){
    super(key, className, 'textarea')
  }
}