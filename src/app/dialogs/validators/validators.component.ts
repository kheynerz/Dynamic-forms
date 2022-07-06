import { Component, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';

import {validators, dataSource} from './validators'

interface Validators{
  [name:string]: {expression: Function, message: Function}
}


@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsDialog{
  //Columns to be displayed in the Mat table
  displayedColumns = ['validator', 'regex', 'activated']
  //Variable to avoid updating data in the fields when is not necessary
  changes: boolean = false
  //Data of the table
  dataSource: Array<{name: string, regex: RegExp, checked: boolean}> = dataSource

  //Store the validators of the component
  componentValidators: Validators = {}

  constructor( private  dialogRef:  MatDialogRef<ValidatorsDialog>, 
    @Inject(MAT_DIALOG_DATA) public  data:  {key:string, validators:any} ){

    //Check the validators of the component
    this.dataSource.forEach(v => {
      if (Object.keys(data.validators).indexOf(v.name) >= 0){
        v.checked = true
      }
    })

    this.componentValidators = data.validators
  }
 
  //Close the Validators Dialog
  public close() {
    this.dialogRef.close();
  }

  //When a validator is checked
  public changeCheckBox(element: any){
    element.checked = !element.checked; 
    this.changes = true
    //Add the validator to the component or delete it 
    if (element.checked){
      this.componentValidators[element.name] = validators[element.name]
    }else{
      delete this.componentValidators[element.name]
    }
  }
}
