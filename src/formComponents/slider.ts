import { FormComponent } from "./formComponent";

export class Slider extends FormComponent{
  constructor(key: string, className : string){
    super(key, className, 'slider')
  }
}