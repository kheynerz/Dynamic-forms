/*This class is a base for all the components that can be created with Formly*/
export class FormComponent {
  /*Formly doesnt implement style property but is posible to add a class with the custom css to the component*/
  styles: object = {};//Custom CSS styles that can be applied to the Component
  stylesClass: string = '';//Name of the class with the custom CSS

  //Formly principal properties
  className : string = '';
  key : string = '';
  type: string = '';

  
  #availableProperties: Array<string> = [''] //Properties of the component that can be modified 
  defaultValue: any = ''; //Some components can define a default Value 
  flexPosition: string = ''; //For the visual positioning of the Component we use flex positioning
  
  //Properties of the component
  templateOptions:  { label: string, description: string, placeholder: string, pattern: string, 
                      value: string, selectAllOption: string, rows: any, thumbLabel: any,
                      required: any, multiple: any, options: Array<object>} = {
    label: '',
    description: '',
    placeholder: '',
    pattern: '',
    value: '',
    selectAllOption: 'Select All',
    rows: 1,
    thumbLabel: false,
    required: false,      
    multiple: false,
    options : []
  } 


  constructor(key: string, flexPosition : string, type: string, availableProperties: Array<string>){
    this.#availableProperties = availableProperties
    this.key = key;
    this.className= flexPosition;
    this.type = type;
    this.flexPosition = flexPosition;
  }

  /*Function that validate and change the property of a component*/
  private changeProps(property: string, newValue: string | boolean | number | Date ): boolean{
    //In formly defaultValue is separated from the template properties
    if (property === "defaultValue"){
      this.defaultValue = newValue
    }else{
      try {
        //Create an ObjectKey to dynamically access the template options
        type ObjectKey = keyof typeof this.templateOptions;
        const key = property as ObjectKey;
        
        //Keys of the properties and his data type
        const booleanKeys = ['required', 'multiple', 'thumbLabel']
        const stringKeys = ['label', 'description','placeholder','pattern', 'value','selectAllOption']
        const numberKeys = ['rows']

        //Check for the datatypes of the newValue 
        if (typeof newValue === 'boolean'){
          //Check if the property accepts booleans
          if (booleanKeys.indexOf(property) !== -1){
            this.templateOptions[key] = newValue
            return true
          }
          return false
        }

        if (typeof newValue === 'string'){
          //Check if the property accepts strings
          if (stringKeys.indexOf(property) !== -1){
            this.templateOptions[key] = newValue
            return true
          }
          return false
        }


        if (typeof newValue === 'number'){
          //Check if the property accepts numbers
          if (numberKeys.indexOf(property) !== -1){
            this.templateOptions[key] = newValue
            return true
          }
          return false
        }

      } catch (_) { }
    }
    return false
  }

  //This function only returns the properties with values not empty or false
  returnObject(){
    //This values must be always returned
    let values: any = {"key": this.key, "className" : this.flexPosition, "type": this.type}

    //If the values are not empty add them to the object
    let templateOptions: any = {}
    if (this.templateOptions.label != '') templateOptions['label'] = this.templateOptions.label
    if (this.templateOptions.description != '')  templateOptions['description'] = this.templateOptions.description
    if (this.templateOptions.placeholder != '')  templateOptions['placeholder'] = this.templateOptions.placeholder
    if (this.templateOptions.pattern != '')  templateOptions['pattern'] = this.templateOptions.pattern
    if (this.templateOptions.value != '')  templateOptions['value'] = this.templateOptions.value
    
    if (this.templateOptions.rows != 1)  templateOptions['rows'] = this.templateOptions.rows
    if (this.templateOptions.thumbLabel != false)  templateOptions['thumbLabel'] = this.templateOptions.thumbLabel
   
    if (this.templateOptions.required != false)  templateOptions['required'] = this.templateOptions.required
    if (this.templateOptions.multiple != false)  templateOptions['multiple'] = this.templateOptions.multiple
    
    //If its a select add and the multiple option its enable add the Select All Option
    if (this.type === "select" && this.templateOptions.multiple) templateOptions['selectAllOption'] = this.templateOptions.selectAllOption
    
    if (this.templateOptions.options.length !== 0) templateOptions['options'] = this.templateOptions.options
   
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

  addOption(label: string, value: any, disable: boolean = false){
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