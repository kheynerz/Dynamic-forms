import { FormComponent } from "./formComponent";

export class Input extends FormComponent {

  constructor(key: string, className : string){
    super(key, className, 'input', ['defaultValue', 'label', 'placeholder', 'description', 'required' , 'pattern'])
  }

 
}