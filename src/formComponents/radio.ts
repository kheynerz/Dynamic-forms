import { FormComponent } from "./formComponent";

export class Radio extends FormComponent{
  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'radio', ['label', 'placeholder', 'description', 'required', 'options'])
  }
}