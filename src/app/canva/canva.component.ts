import { Component, ViewEncapsulation, ElementRef, EventEmitter, Output, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
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
export class CanvaComponent implements AfterContentChecked{
 
  //Click mode (Normal, Delete, Move)
  clickMode: string = 'Normal'

  //Variable to avoid re rendering the fields in the json code Tab
  //If changes are made, the code tab must render the new data
  changed: boolean = true;

  //Available Validators
  validators: Array<string> = ['email','IDCR'] 

  //Count of components in the fields
  componentCount = 1

  //Formly
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model = {};

  //Event emitter to send a signal to show the properties
  @Output() selectedComponent = new EventEmitter<any>();

  constructor(
    private toastr: ToastrService, //Send messages to the user
    private el:ElementRef, 
    private cd: ChangeDetectorRef //Detect changes to avoid ExpressionChangedAfterItHasBeenCheckedError
    ){}

  //Hook to avoid ExpressionChangedAfterItHasBeenCheckedError 
  ngAfterContentChecked() {
    this.cd.detectChanges();
  }
  
  //Update the Fields, 
  public update(changes: any){
      if (changes.success){
        //The changes in the component were made but they are not render in the screen
        //Create a copy of the field group where is the component 
        let fieldGroup = this.fields[changes.i].fieldGroup!
        if (fieldGroup){
          //Erase the component and reassign it 
          fieldGroup[changes.j] = {}
          //If setTimeout is not used the changes are not rendered
          setTimeout(()=>{
              this.form = new FormGroup({});//Re assign the form to update validators
              fieldGroup[changes.j] = changes.component//Re assign the component
              this.changed = true //Changes were made in the canva
          },10)
        }
    }
  }
  
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

  changeClickMode(newMode: string){
    this.clickMode = newMode
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
      let fieldGroups = document.querySelector("#form1")!.children;

      for (let i = 0; i < fieldGroups.length; i++) {
        //add click listener to all form component items in screen 
        
        let items  = fieldGroups[i].children.item(0)!.children;

        for (let j = 0; j < items.length; j++){
          items[j].addEventListener('click', ()=>{
            //resolve promise if some component is clicked
            resolve([i,j]);
          });
        } 
      }
  
      //reject promise if not resolved 
      setTimeout(() => {  
        reject();
      }, 10);
     
    })
  }

  dragAddComponent(id:string, insertMode:string, newComponent : Object){
    let endFieldGroup = new formComponent['FieldGroup']([newComponent]);

    //getting the button to drag
    let dragValue: any = this.getDragValue(id);  

    //Mouse events 
    
    document.onmouseup = async(e) => {   
      if (dragValue){
        document.body.removeChild(dragValue);
        dragValue = null;
          
        if (this.clickOnCanva(e.pageX, e.pageY)){ 
          //Rendering new form in canva when a valid position is selected  
    
          this.clickOnComponent().then( ([i,j]:any)=>{
            //if promise resolved, add new component to selected field group

            //creating fields to render, with the new component
            let newFields:FormlyFieldConfig[] = [];
            let newFieldGroup = new formComponent['FieldGroup']([]); 

            newFieldGroup.fieldGroup = [ ...this.fields[i].fieldGroup!]; 

            //index where to splice depending in the insert mode 
            insertMode === "Right" ? j++ : null;         

            //insert component in the index specified
            newFieldGroup.fieldGroup.splice(j, 0, newComponent);

            if (newFieldGroup.fieldGroup.length <= 6){
              //field group maximum components

              newFields = [ ...this.fields];  
              newFields[i] = newFieldGroup;    
  
              //updating fields in screen
              this.fields = [ ...newFields];
            }

          }).catch(r=>{
            //adding one field group to the end of canva
            this.fields = [ ...this.fields, endFieldGroup ]; 
          });

        } 
      } 
      
      if (this.clickMode === 'Normal'){
        this.onNormalClick()
      }
    }
    
    let inThrottle:boolean;
    document.onmousemove = (e) =>{
      if (!inThrottle) {
        //dragging element with refresh timeout  
        let x = e.pageX;
        let y = e.pageY;

        if(dragValue){
          dragValue.style.top = y  + 'px';
          dragValue.style.left = x  + 'px';
        }  
        inThrottle = true;
        setTimeout(() => inThrottle = false, 25);
      }
    }  


  }

  removeComponent(i: number, j : number){ 

    //creating fields to render, without the component
    let newFields:FormlyFieldConfig[] = [];
    let newFieldGroup = new formComponent['FieldGroup']([]); 
    newFieldGroup.fieldGroup = [ ...this.fields[i].fieldGroup!]; 

    //delete component in the index specified and save it for return
    let removed = newFieldGroup.fieldGroup.splice(j, 1);

    newFields = [ ...this.fields]; 
    
    //if new field group has items, update it, else remove it 
    newFieldGroup.fieldGroup.length === 0 ? newFields.splice(i, 1) : newFields[i] = newFieldGroup;

    //updating fields in screen
    this.fields = [ ...newFields];

    return removed;
  }
   
  onInsert(id:string, insertMode:string){  
    //Creating the new component specified by button chosen
    type ObjectKey = keyof typeof formComponent;
    const requiredKey = id as ObjectKey;
    let newComponent = new formComponent[requiredKey](requiredKey+this.componentCount as string & object[],'flex-1');
    this.componentCount++
    //drag and add the selected component
    this.dragAddComponent(id, insertMode, newComponent);

    this.changed = true;
  }

  onDelete(){
    document.onmouseup = (e) =>{
      if (this.clickOnCanva(e.pageX, e.pageY)){

        this.clickOnComponent().then( ([i,j]:any)=>{
          //if promise resolved, delete selected component 
          
          this.removeComponent(i,j);
          
        }).catch(r=>{});

        this.changed = true;
    
      }
    }  
   
  }

  onMove(insertMode:string){
    
    document.onmouseup = (e) =>{
      if (this.clickOnCanva(e.pageX, e.pageY)){

        this.clickOnComponent().then( ([i,j]:any)=>{
          //if promise resolved, remove selected component and save it   
          let removedItem = this.removeComponent(i,j)[0]

          //class name of object removed to create draggable button
          let removedID = removedItem.constructor.name;
          
          //In case the component has a different class
          type ObjectKey = keyof typeof removedItem;
          const key = 'type' as ObjectKey;      
          if (removedID === "Object"){
            //getting type of component to drag 
            removedID = removedItem[key]
            removedID = removedID.charAt(0).toUpperCase() + removedID.slice(1)
          }       
          
          //drag and add the selected component
          this.dragAddComponent(removedID, insertMode, removedItem)
          
        }).catch(r=>{});

        this.changed = true;
        
      }
    }  
  }

  onMoveFieldGroup(up:boolean){

    document.onmouseup = (e) =>{
      if (this.clickOnCanva(e.pageX, e.pageY)){

        this.clickOnComponent().then( ([i,j]:any)=>{
          //if promise resolved, remove selected field group and save it 
          let moved = this.fields[i];    
          
          //do nothing if component is the first and action is move up
          up && i==0 ? null : this.fields.splice(i,1);

          up ? --i : ++i;
          
          if(i>=0){
            //if valid index
            this.fields.splice(i,0,moved);
          }
   
        }).catch(r=>{});

        this.changed = true;

      }
    }  
  }
 

  onNormalClick(){
    document.onmouseup = (e) =>{
      if (this.clickOnCanva(e.pageX, e.pageY)){

        this.clickOnComponent().then( ([i,j]:any)=>{
          //if promise resolved, Show properties of selected component 
          this.selectedComponent.emit({"isSelected" : true, "component": this.fields[i].fieldGroup![j], i,j})
        }).catch(_=>{this.selectedComponent.emit({"isSelected": false})});

      }
    }  
  }

  // Method use to filter the key and values of the formly field using the JSON.stringify method
  public replacer(key: string, value: any) {
    //Arrays of data to ignore in the json
    let undefinedValues = ["", false, null, undefined]
    
    let acceptedKeys = ['','fieldGroupClassName', 'fieldGroup','key','className', 'type', 'defaultValue', 'min','max',
                        'templateOptions', 'label', 'description','placeholder', 'pattern', 'value', 'disabled','selectAllOption', 
                        'thumbLabel', 'required', 'multiple', 'rows', 'options', 'validators', 'strMessage','regularExpression', 
                        'expression', 'message', 'template']

    if (this.validators){
      acceptedKeys = Array.from(new Set([...acceptedKeys, ...this.validators]));
    }

    //Data to ignore
    if (undefinedValues.indexOf(value) > -1) return undefined;
    
    //innecesary types
    if (key === 'type' && (value === 'formly-template' || value === 'formly-group')) return undefined

    //If object is empty
    if (typeof value === 'object'){
      let len = Object.keys(value).length
      if (len === 0) return undefined;

      if (value instanceof formComponent['FieldGroup']) return value
      if (value instanceof formComponent['Checkbox']) return value.returnObject()
      if (value instanceof formComponent['Datepicker']) return value.returnObject()
      if (value instanceof formComponent['Input']) return value.returnObject()
      if (value instanceof formComponent['Label']) return value.returnObject()
      if (value instanceof formComponent['Radio']) return value.returnObject()
      if (value instanceof formComponent['Select']) return value.returnObject()
      if (value instanceof formComponent['Slider']) return value.returnObject()
      if (value instanceof formComponent['Textarea']) return value.returnObject()
      if (value instanceof formComponent['Toggle']) return value.returnObject()
    }
    
    if (typeof value === 'function'){
      return `${value}`      
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
      //console.log(data);
      
      let firstJson = JSON.stringify(data, (key:string, value:any) => {
        return this.replacer(key,value)
      })
      finalJson = JSON.stringify(JSON.parse(firstJson, (key:string, value:any) => {
        return this.replacer(key,value)  
      }), undefined, 4)
    }
    
    return finalJson
  }

  onSave(filename: string){
    if (filename === ""){
      this.showInfo(`Por favor ingrese el nombre del archivo`,'Archivo sin nombre');
      return
    }

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

  private reviver(key:string , value: any){
    if (key  === 'expression' || key === 'message'){
      console.log(value);
      return eval(value)
    }
    return value
  }

  private transformData(data: Array<any>){
    //HAcer esto en funciones >:(
    let fields: FormlyFieldConfig[] = [];

    data.forEach(field => {
      try {
        let newFieldGroup = new formComponent['FieldGroup']([])
        if (field.fieldGroup){
          field.fieldGroup.forEach((element:any) => {
            if (element.type){
              let component = element.type.charAt(0).toUpperCase() + element.type.slice(1);
              
              type ObjectKey = keyof typeof formComponent;
              const key = component as ObjectKey;      

              let newComponent = new formComponent[key](element.key,element.className ? element.className : 'flex-1');
              this.componentCount++
             
              if ((!(newComponent instanceof formComponent['Label'])) && (!(newComponent instanceof formComponent['FieldGroup']))){
                newComponent.setData(element.templateOptions, element.validators, element.defaultValue)
              }
              newFieldGroup.fieldGroup.push(newComponent)
            }else if (element.template){
              let newComponent = new formComponent['Label'](element.key,element.className);
              newComponent.setData(element.template)
              newFieldGroup.fieldGroup.push(newComponent)
            }
          })
          fields.push(newFieldGroup)
        }else{
          if (field.type){
            let component = field.type.charAt(0).toUpperCase() + field.type.slice(1);
            
            type ObjectKey = keyof typeof formComponent;
            const key = component as ObjectKey;      
            
            let newComponent = new formComponent[key](field.key,field.className ? field.className : 'flex-1');
            this.componentCount++
           
            if ((!(newComponent instanceof formComponent['Label'])) && (!(newComponent instanceof formComponent['FieldGroup']))){
              newComponent.setData(field.templateOptions, field.validators, field.defaultValue)
            }
            newFieldGroup.fieldGroup.push(newComponent)
          }else if (field.template){
            let newComponent = new formComponent['Label'](field.key,field.className);
            newComponent.setData(field.template)
            newFieldGroup.fieldGroup.push(newComponent)
          }
          fields.push(newFieldGroup)
        }
        
      } catch (error) {
        console.log(error);
      }
    })

    return fields
  }

  setData(jsonData: string){
    let success = true
    //The data to read is always an array
    let data: Array<object> = []
    try {
      //Parse the data to json and assign it to the formly field
      data = JSON.parse(jsonData, this.reviver);
      
      this.fields = this.transformData(data) 
    } catch (error) {
      success = false
      this.showError('El JSON presenta errores en su estructura', 'Error al modificar el JSON');
    }
    return success
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


