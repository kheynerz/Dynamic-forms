import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import components from 'src/formComponents';


@Component({
  selector: 'app-canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CanvaComponent implements OnInit{
  form = new FormGroup({});
  model = {};
  input = new components['Input']('1','flex-1')
  group = new components['FieldGroup']([this.input, new components['Input']('2','flex-1')])
  fields: FormlyFieldConfig[] = [this.group]

  ngOnInit(){
    this.input.templateOptions.label = ''
  }

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }

  onChange(id:string){
    let dragValue:any;
    let element = document.getElementById('submit'); 

    if (element){  
      element.style.position = 'absolute';
      dragValue = element;
    } 

    document.onmouseup = function(){
      console.log("Dropped "+id)
      dragValue = null;
    }
    document.onmousemove = function(e){
      let x = e.pageX;
      let y = e.pageY;

      if(dragValue){
        console.log("Dragging "+id)
        dragValue.style.top = y-50  + 'px';
        dragValue.style.left = x-175  + 'px';
      }  
    } 
  }

  onUpload(file : Blob){
    const reader = new FileReader();
    let data: Array<any>;
    reader.readAsText(file, "UTF-8");
    reader.onload =  (evt) => {
      try {
        data = JSON.parse(String(evt.target?.result));
        this.fields = data 
      } catch (error) {
        console.log("error reading file");
      }
    }
    reader.onerror = _ => {
        console.log("error reading file");
    }
  }
  onSave(){
    let data = JSON.stringify(this.fields)
    return data
  }
  
}


