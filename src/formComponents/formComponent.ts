export class FormComponent {
    className : string = '';
    key : string = '';

    templateOptions = {
        label: '',
        description: '',
        pattern: '',
        required: false,      
        multiple: false,
        selectAllOption: '',
        options: []
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