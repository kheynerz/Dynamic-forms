import { FormComponent } from "./formComponent";

export class Textarea extends FormComponent{
  type : string = 'textarea';

  constructor(key: string, className : string){
    super(key, className)
  }
}