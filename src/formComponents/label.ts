import { FormComponent } from "./formComponent"

export class Label  extends FormComponent{
    constructor(key: string, flexPosition: string){
       super(key,flexPosition,'label', ['']);
    }

}