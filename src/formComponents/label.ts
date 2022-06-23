import { FormComponent } from "./formComponent"

export class Label  extends FormComponent{
    constructor(key: string, className: string){
       super(key,className,'label');
    }

}