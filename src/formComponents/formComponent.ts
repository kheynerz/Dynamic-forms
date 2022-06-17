export class FormComponent {
    className : string = '';
    key : string = '';
    defaultValue: any = '';
    templateOptions = {
      label: '',
      description: '',
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

    constructor(key: string, className : string){
        this.key = key;
        this.className= className;
    }
}