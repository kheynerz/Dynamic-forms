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
  fields: FormlyFieldConfig[] = [];

  constructor(private toastr: ToastrService) {}

  //Method to show a toastr error notification
  showError(message: string, title:string){
    this.toastr.error(message, title)
  }

  //Method to show a toastr success notification
  showSuccess(message: string, title:string){
    this.toastr.success(message, title)
  }

  //Method to show a toastr info notification
  showInfo(message: string, title:string){
    this.toastr.info(message, title)
  }

  ngOnInit(){
   
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

  onChange(id:string){

    //Creating the new component specified by button chosen
    type ObjectKey = keyof typeof formComponent;
    const requiredKey = id as ObjectKey;
    let newComponent = new formComponent[requiredKey]('key'+Math.random() as string & object[],'flex-1');

    //Add component to fieldgroup
    let newFieldGroup = new formComponent['Field Group']([newComponent])

    //getting the button to drag
    let dragValue : any = this.getDragValue(id);
    

    //events 
    
    document.onmouseup = () => {
      if (dragValue){
        document.body.removeChild(dragValue);
        dragValue = null; 
          
        this.fields = [ ...this.fields, newFieldGroup ];
      }     
    }

    
    document.onmousemove = (e) =>{
      let x = e.pageX;
      let y = e.pageY;

      if(dragValue){
        dragValue.style.top = y  + 'px';
        dragValue.style.left = x  + 'px';
      }  
    } 

    
    //Rendering new form in canva when position is selected
    //this.fields = [ ...this.fields, newFieldGroup ];

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

  onSave(filename: string){
    try {
      //Check if theres data to save
      if (!this.fields.length){
        this.showInfo(`El formulario se encuentra vacío`,'Formulario vacío');
        return;
      }

      //Stringify the data and use the package FileSaver to save to the local machine of the user
      let data = JSON.stringify(this.fields)
      var blob = new Blob([data], {type: "text/json;charset=utf-8"});
      FileSaver.saveAs(blob, filename+'.json');
      this.showSuccess(`Se descargó el archivo ${filename}.json con éxito`,'Archivo descargado');
    } catch (error) {
      this.showError(`Ocurrió un error inesperado al descargar el archivo`,'Error al descargar el archivo');
    }
  }
}


