import { FormComponent } from "./formComponent";

export class Input extends FormComponent {

  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'input', ['label', 'type', 'placeholder', 'description', 'required', 'min', 'max', 'validators'])
  }

 
}