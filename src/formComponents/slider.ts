import { FormComponent } from "./formComponent";

export class Slider extends FormComponent{
  type : string = 'slider';

  constructor(key: string, className : string){
    super(key, className)
  }
}