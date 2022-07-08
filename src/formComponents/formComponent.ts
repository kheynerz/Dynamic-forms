
interface Template{
  label: string, description: string, placeholder: string, pattern: string, 
  type: string, value: string, selectAllOption: string, rows: any, min: any, max:any, 
  thumbLabel: any, required: any, multiple: any, options: Array<object>, dynamicOptions: any
}

/*This class is a base for all the components that can be created with Formly*/
export class FormComponent{
  /*Formly doesnt implement style property but is posible to add a class with the custom css to the component*/
  styles: object = {};//Custom CSS styles that can be applied to the Component
  stylesClass: string = '';//Name of the class with the custom CSS

  //Formly principal properties
  className : string = '';
  key : any = '';
  type: string = '';

  
  #availableProperties: Array<string> = [''] //Properties of the component that can be modified 
  defaultValue: any = ''; //Some components can define a default Value 
  flexPosition: number = 1; //For the visual positioning of the Component we use flex positioning
  
  //Properties of the component
  templateOptions: Template = {
    label: '',
    description: '',
    placeholder: '',
    pattern: '',
    type: '',
    value: '',
    selectAllOption: 'Select All',
    rows: 1,
    min: '',
    max: '',
    thumbLabel: false,
    required: false,      
    multiple: false,
    options : [ ],
    dynamicOptions: {}
  } 

  validators = {} //Validators of the input files

  constructor(key: string, flexPosition : string, type: string, availableProperties: Array<string>){
    this.#availableProperties = ['key', 'className', ...availableProperties]
    this.key = key;
    this.className= flexPosition;
    this.type = type;
    
    //Parse the flexPosition string to get the number
    try {
      this.flexPosition = Number(flexPosition[flexPosition.length -1]);
    } catch (error) {
      console.log("Error while parsing the flex position");
    }
  }

  //If the data is imported this function is used to set the data to the respective properties
  setData(templateOptions: Template, validators: any = {}, defaultValue:any = null){
    this.validators = validators
    this.defaultValue = defaultValue
    //Iterate the received properties and set the value to the templateOptions
    for (const prop in templateOptions) {
      type ObjectKey = keyof typeof this.templateOptions;
      const key = prop as ObjectKey;
      this.templateOptions[key] = templateOptions[key]
    }
  }



  /*Function that validate and change the property of a component*/
  private changeProps(property: string, newValue: string | boolean | number | Date ): boolean{
    //In formly defaultValue, key and className are separated from the template properties
    if (property === "defaultValue"){
      this.defaultValue = newValue 
      return true
      
    }else if (property === 'key'){
      this.key = newValue
      return true
      
    }else if(property === 'className'){
      this.className = `flex-${newValue}`
      this.flexPosition = Number(newValue)
      return true
    }else{
      try {
        //Create an ObjectKey to dynamically access the template options
        type ObjectKey = keyof typeof this.templateOptions;
        const key = property as ObjectKey;
        
        //Keys of the properties and his data type
        const booleanKeys = ['required', 'multiple', 'thumbLabel']
        const stringKeys = ['label', 'type', 'description','placeholder','pattern', 'value','selectAllOption']
        const numberKeys = ['rows', 'min','max']

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

      } catch (_) {console.log("Error while accessing to a property");
       }
    }
    return false
  }

  //This function only returns the properties with values not empty or false
  returnObject(){
    //This values must be always returned
    let values: any = {"key": this.key, "className" : this.className, "type": this.type}

    //If the values are not empty add them to the object
    let templateOptions: any = {}
    if (this.templateOptions.label != '') templateOptions['label'] = this.templateOptions.label
    if (this.templateOptions.description != '')  templateOptions['description'] = this.templateOptions.description
    if (this.templateOptions.placeholder != '')  templateOptions['placeholder'] = this.templateOptions.placeholder
    if (this.templateOptions.pattern != '')  templateOptions['pattern'] = this.templateOptions.pattern
    if (this.templateOptions.value != '')  templateOptions['value'] = this.templateOptions.value
    if (this.templateOptions.type != '')  templateOptions['type'] = this.templateOptions.type
    
    if (this.templateOptions.rows != 1)  templateOptions['rows'] = this.templateOptions.rows
    
    if (this.templateOptions.min != '')  templateOptions['min'] = this.templateOptions.min
    if (this.templateOptions.max != '')  templateOptions['max'] = this.templateOptions.max
    
    if (this.templateOptions.thumbLabel != false)  templateOptions['thumbLabel'] = this.templateOptions.thumbLabel
   
    if (this.templateOptions.required != false)  templateOptions['required'] = this.templateOptions.required
    if (this.templateOptions.multiple != false)  templateOptions['multiple'] = this.templateOptions.multiple
    
    //If its a select add and the multiple option its enable add the Select All Option
    if (this.type === "select" && this.templateOptions.multiple) templateOptions['selectAllOption'] = this.templateOptions.selectAllOption
    
    if (Object.keys(this.templateOptions.dynamicOptions).length !== 0) templateOptions['dynamicOptions'] = this.templateOptions.dynamicOptions
    
    if (this.templateOptions.options.length !== 0) templateOptions['options'] = this.templateOptions.options
    
    //If it is something in validators add them to the object
    //if (Object.keys(this.validators).length !== 0) values['validators'] = this.validators

    values['templateOptions'] = templateOptions
    
    return values
  }

  //Not implemented
  private changeStyle(newStyles: string){
    /*Creates a style tag for custom css for a form component*/

    //Remove the style tag if exists
    var child = document.getElementById(this.key+"styles");
    child?.parentNode?.removeChild(child)

    //Create a new style tag
    var style = document.createElement('style');
    style.setAttribute("id", this.key+"styles");
    style.innerHTML = `.${this.key}Styles {${newStyles}}`;
    document.getElementsByTagName('head')[0].appendChild(style);
    
    this.stylesClass = this.key + 'Styles'
    
    this.className = this.flexPosition + ` ${this.stylesClass}` 
  }

  //Not implemented
  changeStyleProperty(property: string, value: string){
    //Get the styles and change the value of the property
    const style = {
      ...this.styles,
      [property]: value,
    };
    
    //Transform the object of styles in a CSS String
    const styleString = (
      Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';')
    );

    //In case a property is in Camel Case transform it to snake-case
    let newStyles = styleString.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    
    this.changeStyle(newStyles)
  }

  changeSize(newSize: number){
    //Change the flex size of the component
    this.className = `flex-${newSize}` + ` ${this.stylesClass}`
    this.flexPosition = newSize;
  }
 

  changeProperty(property: string, newValue: string | boolean | number | Date ){
    //Public method to change a property of the component
    let result = false
    //Check if the property is available for the component
    if (this.#availableProperties.indexOf(property) >= 0){
      result = this.changeProps(property, newValue)//Change the property
    }
    
    return result
  }

  getProperties(): Array<string>{
    return this.#availableProperties
  }

  get(prop: string): any{
    //Function to get the value of a property
    if (prop === 'key'){
      return this.key
    }
    if (prop === 'defaultValue'){
      return this.defaultValue
    }

    if (prop === 'validators'){
      return this.validators
    }

    if (prop === 'className'){
      return this.flexPosition
    }
    //Create an ObjectKey to dynamically access the template options
    type ObjectKey = keyof typeof this.templateOptions;
    const key = prop as ObjectKey;
    return this.templateOptions[key]
  }

  
  updateValidator(newValidators: any) : boolean{
    let success = false
    //Check if the component can add validators, and update it
    if (this.#availableProperties.indexOf("validators") !== -1){
      this.validators = newValidators
      success = true
    }
    return success
  }

  updateOptions(newOptions: Array<{label: string, value: any, disabled: boolean}>){
    let success = false
    //Check if the component can add options, and update it
    if (this.#availableProperties.indexOf("options") !== -1){
      this.templateOptions.options = newOptions
      success = true
    }
    return success
  }

  updateDynamicOptions(newOptions: Array<{key: string, value: any}>){
    let success = false
    //Check if the component can add dynamic options, and update it
    if (this.#availableProperties.indexOf("dynamicOptions") !== -1){
      this.templateOptions.dynamicOptions = newOptions
      success = true
    }
    return success
  }
}