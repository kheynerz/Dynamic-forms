import { FormComponent } from "./formComponent";

export class Input extends FormComponent {
  type : string = 'input';

  constructor(key: string, className : string){
    super(key, className)
  }
}