import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
export class CanvaComponent implements OnInit{
  form = new FormGroup({});
  model = {};
  input = new formComponent['Input']('input1', 'flex-1');
  input2 = new formComponent['Input']('input2', 'flex-1');
  datepicker = new formComponent['Date Picker']('datepicker', 'flex-1')
  group = new formComponent['Field Group']([this.input, this.input2, this.datepicker])
  fields: FormlyFieldConfig[] = [this.group];

  constructor(private toastr: ToastrService) {}

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

  ngOnInit(){
   
  }

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }

  onChange(id:string){

    let dragValue : any;
    
    type ObjectKey = keyof typeof formComponent;
    const requiredKey = id as ObjectKey;
    let newComponent = new formComponent[requiredKey]('key'+Math.random() as string & object[],'flex-1');

    let newFieldGroup = new formComponent['Field Group']([newComponent])

    this.fields = [ ...this.fields, newFieldGroup ];
    console.log(this.fields);


    let element = document.getElementById('reset')//this.fields; //////////////////


    if (element){  
      
      element.style.position = 'absolute';
      dragValue = element;
    } 

    document.onmouseup = function(){
      console.log("Dropped "+id);
      

      dragValue = null;
    }

    document.onmousemove = function(e){
      let x = e.pageX;
      let y = e.pageY;

      if(dragValue){
        console.log("Dragging "+id);
        dragValue.style.top = y-50  + 'px';
        dragValue.style.left = x-175  + 'px';
      }  
    } 

  }



  // Method use to filter the key and values of the formly field 
  private replacer(key: string, value: any) {
    
    let undefinedValues = ["", false]

    let ignoredKeys = ['_keyPath', 'id', 'hooks', 'modelOptions', 'wrappers', '_flatOptions'   ]

    let otherIgnores = ['hideFieldUnderline', 'indeterminate', 'floatLabel', 'hideLabel', 'align', 'color', 'tabindex']


    if (undefinedValues.indexOf(value) > -1)return undefined;

    if (ignoredKeys.indexOf(key) > -1) return undefined;
    
    if (otherIgnores.indexOf(key) > -1) return undefined;

    if (key === 'type' && (value === 'formly-template' || value === 'formly-group')) return undefined

    //If object is empty
    if (typeof value === 'object'){
      let len = Object.keys(value).length
      if (len === 0) return undefined;
    }

    //If options is empty
    if (key === 'options' && value.length === 1 && Object.keys(value[0]).length === 0) return undefined;

    return value;
  }

  //Stringify the data of the fields of the formly and changes the datepicker class to an object
  private stringifyData() : string{
     //Create a duplicate of the fields
    const data  = [...this.fields]

    //Looping the data and change the Datepickers to an object with his properties 
    //This has to be done because the Formly Datepicker generates a circular structure in the json
    data.forEach((element, i) => {
      if (element instanceof formComponent['Field Group']){
        element.fieldGroup.forEach((component, j) => {
          if (component instanceof formComponent['Date Picker']){
            element.fieldGroup[j] = component.returnObject()
          }
        });
      }else{
        if (element instanceof formComponent['Date Picker']){
          data[i] = element.returnObject()
        }
      }
    });

    //The stringify method is applied twice, because, some data inside objects is deleted in the first one,
    //and these objects can be empty, the second time is to delete these objects from the json
    let firstStringify = JSON.stringify(data, this.replacer)
    
    return JSON.stringify(JSON.parse(firstStringify, this.replacer))
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
    } catch (_) {
      this.showError(`Ocurrió un error inesperado al descargar el archivo`,'Error al descargar el archivo');
    }
  }

  onUpload(file : Blob, extension: string){
    //Supported data types
    let fileTypes = ['json', 'txt'];

    //Check extension of the file
    if (fileTypes.indexOf(extension) == -1){
      this.showError('Extensión del archivo incorrecta. Solo se admite json y txt.','Error al cargar el archivo');
      return;
    }
    
    //The data to read is always an array
    let data: Array<any>;

    //Read the file, parse the data of the file and save it in the "fields" variable of the class
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload =  (evt) => {
      try {
        data = JSON.parse(String(evt.target?.result));
        this.fields = data 
        this.showSuccess('Se cargó el archivo con éxito','');
      } catch (error) {
        this.showError(' ','Error al cargar el archivo');
      }
    }
    reader.onerror = _ => {
      this.showError('No se logró leer el archivo ingresado','Error al cargar el archivo');
    }
  }


}


