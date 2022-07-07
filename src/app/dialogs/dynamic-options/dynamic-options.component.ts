import {Component, Inject} from  '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';


interface DynamicOption{
  basedOn?: string,
  //Url of the webservice
  url?: string,
  dataValue?: string,
  dataLabel?: string,
  queryParams?: Array<any>
}

@Component({
  selector: 'app-dynamic-options',
  templateUrl: './dynamic-options.component.html',
  styleUrls: ['./dynamic-options.component.css']
})
export class DynamicOptionsDialog{
  //Variable to avoid update the data in the fields when is not necessary
  changes: boolean = false

  dynamicOptions: DynamicOption

  constructor(private  dialogRef:  MatDialogRef<DynamicOptionsDialog>, @Inject(MAT_DIALOG_DATA) 
    public  data:  { key: string,  dynamicOptions: DynamicOption }) {
      this.dynamicOptions = data.dynamicOptions
      console.log(this.dynamicOptions);
  }
   
  //Close the Options Dialog
  public close() {
    this.dialogRef.close();
  }
}
