import { Component, ViewEncapsulation } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import formComponent from 'src/formComponents';

@Component({
  selector: 'app-canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CanvaComponent{
  
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

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

  onUpload(){
    this.fields = [new formComponent["Input"]('newKey','flex-1')]
    console.log(this.fields);
  }
  
  onSave(){

  }

}


