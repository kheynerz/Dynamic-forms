import { FormComponent } from "./formComponent";

export class Input extends FormComponent {

  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'input', ['defaultValue', 'label', 'placeholder', 'description', 'required' , 'pattern'])
  }

 
}