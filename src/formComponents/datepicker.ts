import { FormComponent } from "./formComponent";

export class Datepicker extends FormComponent {
  type : string = 'datepicker';
 
  constructor(key: string, className : string){
    super(key, className)
    setTimeout(()=> {
      super.defaultValue = new Date()
    }, 0);
  }

  returnObject(){
    let templateOptions = {
      label: this.templateOptions.label,
      placeholder: this.templateOptions.placeholder,
      description: this.templateOptions.description,
      required: this.templateOptions.required,
      value: this.templateOptions.value
    }

    
  return {"key": this.key, 
      "className": this.className, 
      "type": this.type,
      "defaultValue": this.defaultValue,
      "templateOptions": templateOptions,
      "validation": this.validation }
  }

}