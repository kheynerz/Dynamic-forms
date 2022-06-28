import { FormComponent } from "./formComponent";

export class Select  extends FormComponent{
  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'select', ['label', 'placeholder', 'description', 'required' , 'multiple', 'options', 'selectAllOption'])
  }
}