import { Component, OnInit, ViewEncapsulation, ElementRef} from '@angular/core';
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
  newComponent: Object= {};

  constructor(private toastr: ToastrService, private el:ElementRef) {}

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

  insertWithListener(){
    let formlyForm = document.getElementsByTagName("formly-form").item(0);
    
    if (formlyForm){

      for (let i = 0; i < formlyForm.children.length; i++) {
        //add click listener to all field groups in screen 
        const clickListener = (e: Event) => { 
          
        
          e.stopImmediatePropagation();        

          //creating fields to render, with the new component
          let newFields:FormlyFieldConfig[] = [];
          let newFieldGroup = new formComponent['Field Group']([]); 

          
          newFieldGroup.fieldGroup = [ ...this.fields[i].fieldGroup!, this.newComponent ];  
          newFields = [ ...this.fields];  
          newFields[i] = newFieldGroup;         
          newFields.splice(newFields.length-1, 1);

          //updating fields in screen
          this.fields = [ ...newFields];
   
          
        };

        formlyForm.children[i].addEventListener('click', clickListener);

        
      }
    }
 

  }
  
  onChange(id:string){
    
    //Creating the new component specified by button chosen
    type ObjectKey = keyof typeof formComponent;
    const requiredKey = id as ObjectKey;
    this.newComponent = new formComponent[requiredKey]('key'+Math.random() as string & object[],'flex-1');
    let newFieldGroup = new formComponent['Field Group']([this.newComponent]);

    //getting the button to drag
    let dragValue: any = this.getDragValue(id);  

    //Mouse events 
    
    document.onmouseup = (e) => {   
      if (dragValue){
        document.body.removeChild(dragValue);
        
        let x = e.pageX;
        let y = e.pageY;
          
        if (this.clickOnCanva(x, y)){ 
          //Rendering new form in canva when a valid position is selected  
    
          this.fields = [ ...this.fields, newFieldGroup ]; 
          this.insertWithListener();
          
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


