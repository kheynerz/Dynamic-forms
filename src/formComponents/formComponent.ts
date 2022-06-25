/*This class is a base for all the components that can be created with Formly*/
export class FormComponent {
  /*Formly doesnt implement style property but is posible to add a class with the custom css to the component*/
  styles: object = {};//Custom CSS styles that can be applied to the Component
  stylesClass: string = '';//Name of the class with the custom CSS

  //Formly principal properties
  className : string = '';
  key : string = '';
  type: string = '';

  defaultValue: any = ''; //Some components 
  flexPosition: string = '';
  #availableProperties: Array<string> = ['']
  
  templateOptions:  { label: string, description: string, placeholder: string, pattern: string, 
                      value: string, selectAllOption: string, rows: any, thumbLabel: any,
                      required: any, multiple: any, options: Array<object>} = {
    label: '',
    description: '',
    placeholder: '',
    pattern: '',
    value: '',
    selectAllOption: '',
    rows: 1,
    thumbLabel: false,
    required: false,      
    multiple: false,
    options : []
  } 
  validation = {
    messages: {
      pattern: '',
    },
  }

  constructor(key: string, className : string, type: string, availableProperties: Array<string>){
    this.#availableProperties = availableProperties
    this.key = key;
    this.className= className;
    this.type = type;
    this.flexPosition = className;
  }


  private changeProps(property: string, newValue: string | boolean | number | Date ): boolean{
    let success = false
    if (property === "defaultValue"){
      this.defaultValue = newValue
    }else{
      try {
        type ObjectKey = keyof typeof this.templateOptions;
        const myVar = property as ObjectKey;
        if (typeof newValue === 'string'){
          if ((property !== 'required') && (property !== 'multiple')){
            this.templateOptions[myVar] = newValue
            success = true
          }
        }else if (typeof newValue === 'boolean'){
          this.templateOptions[myVar] = newValue
          if (property === 'multiple'){
            if (newValue){
              this.templateOptions.selectAllOption = "Select All"
            }else{
              this.templateOptions.selectAllOption = ""
            }
          }

          success = true
        }else if (typeof newValue === 'number'){
          this.templateOptions[myVar] = newValue
        }


      } catch (_) { }
    }
    return success
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

  private changeStyle(newStyles: string){
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

  changeSize(newSize: Number){
    this.className = `flex-${newSize}` + ` ${this.stylesClass}`
    this.flexPosition = `flex-${newSize}`;
  }
 

  changeProperty(property: string, newValue: string | boolean | number | Date ){
    let result = false
    if (this.#availableProperties.indexOf(property) >= 0){
      result = this.changeProps(property, newValue)
    }
    return result
  }

  getProperties(): Array<string>{
    return this.#availableProperties
  }

  addOption(label: string, value: any, disable: boolean){
    let success = false
    if (this.#availableProperties.indexOf("options") !== -1){
      this.templateOptions.options.push({label, value, disable})
      success = true
    }
    return success

  }

  removeOption(index: number){
    let success = false
    if (this.#availableProperties.indexOf("options") !== -1){
      if (index > -1) {
        if (this.templateOptions.options.splice(index, 1).length !== 0) {
          success = true
        }
      }
    }
    return success
  }

}