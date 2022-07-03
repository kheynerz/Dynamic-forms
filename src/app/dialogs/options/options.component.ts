import {Component, Inject} from  '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsComponent{
  displayedColumns: string[] = ['Position','Label', 'Value', 'Disabled', 'Action'];
  dataSource: Array<{'label':string, 'value': string, 'disabled': boolean}> = []
  changes: boolean = false
  newData: {'label': string, "value": any, "disabled": boolean} = {"label": '', 'value':'', "disabled":false}
  
  constructor(private  dialogRef:  MatDialogRef<OptionsComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
    this.dataSource = data.options
  }
   
  public close() {
    this.dialogRef.close();
  }

  addOption():void{
    this.changes = true
    let {label, value, disabled} = this.newData
    if (label !== '' && value !== ''){
      this.newData.label = this.newData.value = ""
      this.newData.disabled = false
  
      this.dataSource.push({label,value,disabled})
      this.dataSource = [...this.dataSource];
    }
  }

  deleteRow(index: number){
    this.dataSource.splice(index, 1)
    this.dataSource = [...this.dataSource];
  }

}
