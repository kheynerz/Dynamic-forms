import { Component, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';



interface Validators{
  [name:string]: {expression: Function, message: Function}
}


@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent{
  email = {
    expression: (c:any) => /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/.test(c.value),
    message: (_: any, field: FormlyFieldConfig) => `"${field.formControl!.value}" is not a valid Email Address`,
  }
  idCR = {
    expression: (c:any) => /^[1-9]-\d{4}-\d{4}$/.test(c.value),
    message: (_: any, field: FormlyFieldConfig) => `"${field.formControl!.value}" is not a valid Costa Rican ID`,
  }

  availableValidators: Validators = {
    email : this.email,
    idCR : this.idCR
  }

  componentValidators: Validators = {}
  customValidators: Array<{name: string, regex: string}> = []

  //newValidator = {name: '', regex: '', message: ''}
  changes: boolean = false

  displayedColumns = ['validator', 'regex', 'activated']

  dataSource: Array<{name: string, regex: RegExp, checked: boolean, action: boolean}> = [
    {name:'email', regex: /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/, checked: false, action: false},
    {name:'idCR', regex: /^[1-9]-\d{4}-\d{4}$/, checked: false, action: false},
  ]

  constructor( private  dialogRef:  MatDialogRef<ValidatorsComponent>, 
    @Inject(MAT_DIALOG_DATA) public  data:  {key:string, validators:any} ){

    this.dataSource.forEach(e => {
      if (Object.keys(data.validators).indexOf(e.name) >= 0){
        e.checked = true
      }
    })

    this.componentValidators = data.validators
  }
  
  public close() {
    this.dialogRef.close();
  }

  public changeCheckBox(element: any){
    element.checked = !element.checked; 
    if (element.checked){
      this.componentValidators[element.name] = this.availableValidators[element.name]
      this.changes = true
    }else{
      delete this.componentValidators[element.name]
      this.changes = true
    }
  }

  /*
  public addValidator(){
    let {name, regex, message} = this.newValidator

    if (name === '' && regex === ''){
      return
    }
    let repeatedName = false
    this.dataSource.forEach(validator =>{
      if (validator.name === name){
        console.log("Nombre repetido: Mostrar al usuario");
        repeatedName = true
      }
    })

    if (repeatedName) return

    this.changes = true

    let exp = regex.replace(/\//g, '')
    let regularExpression = new RegExp(exp);

    let validator = {
      expression: (c:any) => regularExpression.test(c.value),
      message: (_: any, field: FormlyFieldConfig) => `"${field.formControl!.value}" ${message}`,
    }

    this.availableValidators[name] = validator
    this.customValidators.push({name, regex: exp})
    this.dataSource.push({name, regex: regularExpression, checked: false, action: true})
    this.dataSource = [...this.dataSource]
  }*/
}
