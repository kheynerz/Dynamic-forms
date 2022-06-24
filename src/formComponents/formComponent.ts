
export class FormComponent {
  flexPosition: string = '';
  styles: object = {};
  stylesClass: string = '';

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
    this.flexPosition = className;
  }

  returnObject(){
    let values: any = {"key": this.key, "className" : this.flexPosition, "type": this.type}

    let templateOptions: any = {}
    if (this.templateOptions.label != '') templateOptions['label'] = this.templateOptions.label
    if (this.templateOptions.description != '')  templateOptions['description'] = this.templateOptions.description
    if (this.templateOptions.placeholder != '')  templateOptions['placeholder'] = this.templateOptions.placeholder
    if (this.templateOptions.pattern != '')  templateOptions['pattern'] = this.templateOptions.pattern
    if (this.templateOptions.value != '')  templateOptions['value'] = this.templateOptions.value
    if (this.templateOptions.required != false)  templateOptions['required'] = this.templateOptions.required
    if (this.templateOptions.multiple != false)  templateOptions['multiple'] = this.templateOptions.multiple
    if (this.templateOptions.selectAllOption != '')  templateOptions['selectAllOption'] = this.templateOptions.selectAllOption
    
    if (this.templateOptions.options.length === 1 && Object.keys(this.templateOptions.options[0]).length === 0){
      templateOptions['options'] = this.templateOptions.options
    };
    
    values['templateOptions'] = templateOptions
    return values
  }

  changeStyle(newStyles: string){
    var child = document.getElementById(this.key);
    child?.parentNode?.removeChild(child)

    var style = document.createElement('style');
    style.setAttribute("id", this.key);
    style.innerHTML = `.${this.key}Styles {${newStyles}}`;
    document.getElementsByTagName('head')[0].appendChild(style);
    
    this.stylesClass = this.key + 'Styles'
    
    this.className = this.flexPosition + ` ${this.stylesClass}` 
  }

  changeStyleProperty(key: string, property: string){
    const style = {
      ...this.styles,
      [key]: property,
    };
    
    
    const styleString = (
      Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';')
    );

    let newStyles = styleString.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    
    this.changeStyle(newStyles)
  
  }

  changePosition(newSize: Number){
    this.className = `flex-${newSize}` + ` ${this.stylesClass}`
    this.flexPosition = `flex-${newSize}`;
  }

}