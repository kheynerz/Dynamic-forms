import { FormComponent } from "./formComponent";

export class Slider extends FormComponent{
  constructor(key: string, flexPosition : string){
    super(key, flexPosition, 'slider', ['label', 'description', 'required' , 'thumbLabel'])
  }
}