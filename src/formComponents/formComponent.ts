export class FormComponent {
    className : string = '';
    key : string = '';
    type: string = '';
    defaultValue: any = '';
    templateOptions = {
      label: '',
      description: '',
      placeholder: '',
      pattern: '',
      value: '',
      required: false,      
      multiple: false,
      selectAllOption: '',
      options : [{}]
    } 
    validation = {
      messages: {
        pattern: '',
      },
    }

    constructor(key: string, className : string, type: string){
        this.key = key;
        this.className= className;
        this.type = type;
    }

    returnObject(){
      let values: any = {"key": this.key, "className" : this.className, "type": this.type}

      this.templateOptions.label != '' ? values['label'] = this.templateOptions.label : null
      this.templateOptions.description != '' ? values['description'] = this.templateOptions.description : null
      this.templateOptions.placeholder != '' ? values['placeholder'] = this.templateOptions.placeholder : null
      this.templateOptions.pattern != '' ? values['pattern'] = this.templateOptions.pattern : null
      this.templateOptions.value != '' ? values['value'] = this.templateOptions.value : null
      this.templateOptions.required != false ? values['required'] = this.templateOptions.required : null
      this.templateOptions.multiple != false ? values['multiple'] = this.templateOptions.multiple : null
      this.templateOptions.selectAllOption != '' ? values['selectAllOption'] = this.templateOptions.selectAllOption : null
      
      if (this.templateOptions.options.length === 1 && Object.keys(this.templateOptions.options[0]).length === 0){
        values['options'] = this.templateOptions.options
      };
      
      return values
    }
}