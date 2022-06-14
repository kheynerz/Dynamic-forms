export class Checkbox {
    className : string = '';
    type : string = 'checkbox';
    key : string = 'chk';

    templateOptions = {
      label: '',
      description: '',
      pattern: '',
      required: false,
    }
    validation = {
      messages: {
        pattern: '',
      },
    }
}