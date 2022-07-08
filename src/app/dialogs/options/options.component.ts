import {Component, Inject} from  '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';

interface Option {
  label:string,
  value:any,
  disabled?: boolean
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsDialog{
  //Columns to be displayed in the Mat table
  displayedColumns: string[] = ['Position','Label', 'Value', 'Disabled', 'Action'];
  //Data of the table
  dataSource: Array<Option> = []
  
  options: Array<Option> = []

  //Variable to avoid update the data in the fields when is not necessary
  changes: boolean = false

  //When the user wants to add a new option, the data is saved in this object
  newData: Option = {"label": '', 'value':'', "disabled":false}
  newDataCleaned: boolean = true

  //If the user wants to load options from a webservice
  webServiceUrl: string = '';
  //Replace the options in the table when loading from a webservice
  replace: boolean = false;



  constructor(private  dialogRef:  MatDialogRef<OptionsDialog>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
    this.dataSource = data.options
    
    //Add the disabled key to the options in case they don't have it 
    data.options.forEach((option:any)=>{
      if (!option.disabled){
        option.disabled = false
      }
    })
  }
   
  //Close the Options Dialog
  public close() {
    this.dialogRef.close();
  }

  public apply(){
    this.dataSource.forEach((option: Option) => {
      if (option.label !== '' && option.value !== ''){
        this.options.push(option)
      }
    })
  }


  addOption():void{
    this.changes = true
    this.newDataCleaned = false
    //Get the data and check is not empty
    let {label, value, disabled} = this.newData
    if (label !== '' && value !== ''){
      //Clean the data
      this.newData.label = this.newData.value = ""
      this.newDataCleaned = true
      this.newData.disabled = false
      //Add the data to the array
      this.dataSource.push({label,value,disabled})
      this.dataSource = [...this.dataSource];
    }
  }

  deleteRow(index: number){
    //Delete a option
    this.changes = true
    this.dataSource.splice(index, 1)
    this.dataSource = [...this.dataSource];
  }

}
