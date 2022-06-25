import { FormComponent } from "./formComponent";

export class Textarea extends FormComponent{

  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'textarea', ['label', 'placeholder', 'description', 'required', 'rows'])
  }
}