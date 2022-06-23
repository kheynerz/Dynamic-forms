
export class FormComponent {
  flexPosition: string = '';
  styles: object = {color: 'cyan'};
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

    if (this.templateOptions.label != '') values['label'] = this.templateOptions.label
    if (this.templateOptions.description != '')  values['description'] = this.templateOptions.description
    if (this.templateOptions.placeholder != '')  values['placeholder'] = this.templateOptions.placeholder
    if (this.templateOptions.pattern != '')  values['pattern'] = this.templateOptions.pattern
    if (this.templateOptions.value != '')  values['value'] = this.templateOptions.value
    if (this.templateOptions.required != false)  values['required'] = this.templateOptions.required
    if (this.templateOptions.multiple != false)  values['multiple'] = this.templateOptions.multiple
    if (this.templateOptions.selectAllOption != '')  values['selectAllOption'] = this.templateOptions.selectAllOption
    
    if (this.templateOptions.options.length === 1 && Object.keys(this.templateOptions.options[0]).length === 0){
      values['options'] = this.templateOptions.options
    };
    
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