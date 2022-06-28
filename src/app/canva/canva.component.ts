import { Component, ViewEncapsulation, ElementRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import formComponent from 'src/formComponents';

//Package to implement toastr notifications
import { ToastrService } from 'ngx-toastr';

//Package to Save files into the local system of the user
import FileSaver from 'file-saver';

@Component({
  selector: 'app-canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CanvaComponent{
  form = new FormGroup({});
  model = {};

  changed: boolean = true;

  fields: FormlyFieldConfig[] = [];
  


  constructor(private toastr: ToastrService, private el:ElementRef) {}

  //Method to show a toastr error notification
  private showError(message: string, title:string){
    this.toastr.error(message, title)
  }

  //Method to show a toastr success notification
  private showSuccess(message: string, title:string){
    this.toastr.success(message, title)
  }

  //Method to show a toastr info notification
  private showInfo(message: string, title:string){
    this.toastr.info(message, title)
  }

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }

  getDragValue(id:string){
    //variables to get button to drag over the canva
    let element = document.getElementById(id), newElement;
    newElement = element!.cloneNode(true) as HTMLElement;

    //adding button to canva 
    document.body.appendChild(newElement);
    newElement!.style.zIndex = '10';
    newElement!.style.position = 'absolute';
    return newElement
  }

  clickOnCanva(clickX: number, clickY: number){
    let onCanva = false, xCheck: boolean, yCheck: boolean;
    let width: number, height: number;

    //start positions of canva
    const {x, y} = this.el.nativeElement.getBoundingClientRect();

    //size of canva
    width = this.el.nativeElement.offsetWidth;
    height = this.el.nativeElement.offsetHeight;
    
    //booleans for XY click position condition
    xCheck = x <= clickX && clickX <= x+width
    yCheck = y <= clickY && clickY <= y+height

    if(xCheck && yCheck){
      //condition to check click was on canva 
      onCanva = true;
    } 

    return onCanva;
  }

  clickOnComponent(){
    return new Promise((resolve, reject) => {
      let formlyForm = document.getElementsByTagName("formly-form").item(0);

      if (formlyForm){
        let fieldGroups = formlyForm.children;

        for (let i = 0; i < fieldGroups.length; i++) {
          //add click listener to all form component items in screen 

          let items = fieldGroups[i].children.item(0)!.children;

          for (let j = 0; j < items.length; j++) {
            items[j].addEventListener('click', ()=>{
              //resolve promise if some component is clicked
              resolve([i,j]);
            });
          }    

        }
      }
    
      //reject promise if not resolved 
      setTimeout(() => {  
        reject();
      }, 100);
     
    })
  }
  
  onChange(id:string, insertMode:string){  
    //Creating the new component specified by button chosen
    type ObjectKey = keyof typeof formComponent;
    const requiredKey = id as ObjectKey;
    let newComponent = new formComponent[requiredKey]('key'+Math.random() as string & object[],'flex-1');
    let newFieldGroup = new formComponent['Field Group']([newComponent]);

    //getting the button to drag
    let dragValue: any = this.getDragValue(id);  

    //Mouse events 
    
    document.onmouseup = (e) => {   
      if (dragValue){
        document.body.removeChild(dragValue);
        dragValue = null;
          
        if (this.clickOnCanva(e.pageX, e.pageY)){ 
          //Rendering new form in canva when a valid position is selected  
    
          //adding one field group always to the end of canva
          this.fields = [ ...this.fields, newFieldGroup ]; 
 
          this.clickOnComponent().then( ([i,j]:any)=>{
            //if promise resolved, add new component to selected field group

            //creating fields to render, with the new component
            let newFields:FormlyFieldConfig[] = [];
            let newFieldGroup = new formComponent['Field Group']([]); 
      
            newFieldGroup.fieldGroup = [ ...this.fields[i].fieldGroup!]; 

            //index where to splice depending in the insert mode 
            if (insertMode === "Right")
              j++;
            //insert component in the index specified
            newFieldGroup.fieldGroup.splice(j, 0, newComponent);

            newFields = [ ...this.fields];  
            newFields[i] = newFieldGroup;    
            //removing previously added field group     
            newFields.splice(newFields.length-1, 1);
  

            //updating fields in screen
            this.fields = [ ...newFields];
            
          }).catch(r=>{});

        } 
      }      
    }
    
    document.onmousemove = (e) =>{
      //dragging element
      let x = e.pageX;
      let y = e.pageY;

      if(dragValue){
        dragValue.style.top = y  + 'px';
        dragValue.style.left = x  + 'px';
      }  
    }  


    this.changed = true
  }

  onDelete(){
    document.onmouseup = (e) =>{
      if (this.clickOnCanva(e.pageX, e.pageY)){

        this.clickOnComponent().then( ([i,j]:any)=>{
          //if promise resolved, delete selected component 
    
          //creating fields to render, without the component
          let newFields:FormlyFieldConfig[] = [];
          let newFieldGroup = new formComponent['Field Group']([]); 
    
          newFieldGroup.fieldGroup = [ ...this.fields[i].fieldGroup!]; 
    
          //delete component in the index specified
          newFieldGroup.fieldGroup.splice(j, 1);
    
          newFields = [ ...this.fields];  
          newFields[i] = newFieldGroup;    
 
          //updating fields in screen
          this.fields = [ ...newFields];
          
        }).catch(r=>{});

      }
    }  
 
  }

  onMove(){
    document.onmouseup = (e) =>{
      if (this.clickOnCanva(e.pageX, e.pageY)){

        

      }
    }  
 
  }
 
  // Method use to filter the key and values of the formly field using the JSON.stringify method
  private replacer(key: string, value: any) {
    //Arrays of data to ignore in the json
    let undefinedValues = ["", false, null, undefined]
    
    let acceptedKeys = ['','fieldGroupClassName', 'fieldGroup','key','className', 'type', 'defaultValue', 
                        'templateOptions', 'label', 'description','placeholder', 'pattern', 'value', 
                        'required', 'multiple', 'selectAllOption', 'options', 'validation', 'messages', 'template']

    //Data to ignore
    if (undefinedValues.indexOf(value) > -1) return undefined;
    
    //innecesary types
    if (key === 'type' && (value === 'formly-template' || value === 'formly-group')) return undefined

    //If object is empty
    if (typeof value === 'object'){
      let len = Object.keys(value).length
      if (len === 0) return undefined;

      if (value instanceof formComponent['Field Group']) return value
      if (value instanceof formComponent['Checkbox']) return value.returnObject()
      if (value instanceof formComponent['Date Picker']) return value.returnObject()
      if (value instanceof formComponent['Input']) return value.returnObject()
      if (value instanceof formComponent['Label']) return value.returnObject()
      if (value instanceof formComponent['Radiobutton']) return value.returnObject()
      if (value instanceof formComponent['Select']) return value.returnObject()
      if (value instanceof formComponent['Slider']) return value.returnObject()
      if (value instanceof formComponent['Text Area']) return value.returnObject()
      if (value instanceof formComponent['Toggle']) return value.returnObject()
      
      if (value instanceof formComponent['Test']){

        return value.returnObject()
      } 
    }
    
    if (acceptedKeys.indexOf(key) === -1){
      if (isNaN(+key)) return undefined;
    };
   
    

    return value;
  }

  //Stringify the data of the fields of the formly and changes the datepicker class to an object
  private stringifyData() : string{
     //Create a duplicate of the fields
    const data  = [...this.fields]
    let finalJson = "[]"
    if (data.length !== 0){
      //The stringify method is applied twice, because, some data inside objects is deleted in the first one,
      //and these objects can be empty, the second time is to delete these objects from the json
      let firstJson = JSON.stringify(data, this.replacer)
      finalJson = JSON.stringify(JSON.parse(firstJson, this.replacer), undefined, 4)
    }
    
    return finalJson
  }


  onSave(filename: string){
    try {
      let data = this.stringifyData()
      
      //Check if theres data to save
      if (!data.length){
        this.showInfo(`El formulario se encuentra vacío`,'Formulario vacío');
        return
      }
      //Use the package FileSaver to save to the local machine of the user
      var blob = new Blob([data], {type: "text/json;charset=utf-8"});
      FileSaver.saveAs(blob, filename+'.json');
      this.showSuccess(`Se descargó el archivo ${filename}.json con éxito`,'Archivo descargado');
    } catch (error) {
      this.showError(`Ocurrió un error inesperado al descargar el archivo`,'Error al descargar el archivo');
    }
  }

  onUpload(file : Blob, extension: string){
    //Supported data types
    let fileTypes = ['json', 'txt'];

    let success: boolean = true

    //Check extension of the file
    if (fileTypes.indexOf(extension) == -1){
      this.showError('Extensión del archivo incorrecta. Solo se admite json y txt.','Error al cargar el archivo');
      success = false
      return {success, "data": "[]"};
    }

    //Read the file, parse the data of the file and save it in the "fields" variable of the class
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload =  (evt) => {
      try {
        this.setData(String(evt.target?.result));
        
        this.showSuccess('Se cargó el archivo con éxito','');
      } catch (error) {
        this.showError(' ','Error al cargar el archivo');
        success = false
      }
    }
    reader.onerror = _ => {
      this.showError('No se logró leer el archivo ingresado','Error al cargar el archivo');
    }
    this.changed = true
    return {success, "data": this.stringifyData()};
  }

  setData(jsonData: string){
    //The data to read is always an array
    let data: Array<object> = []
    try {
      //Parse the data to json and assign it to the formly field
      data = JSON.parse(jsonData);
      this.fields = data 
    } catch (error) {
      this.showError('El JSON presenta errores en su estructura', 'Error al modificar el JSON');
    }
  }

  getJsonData(){
    //If the data has changed 
    let dataChanged = this.changed
    let data = ""

    if (this.changed){
      data = this.stringifyData()
    }
    this.changed = false
    return {dataChanged, "data": data}
  }
}


