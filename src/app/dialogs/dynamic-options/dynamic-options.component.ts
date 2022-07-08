import {Component, Inject} from  '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';


interface QueryParam{
  key: string,
  value: any,
  action: boolean
}

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
  dynamicOptions: DynamicOption

  //Columns to be displayed in the Mat table for the Query Params
  displayedColumns: string[] = ['key','value', 'action'];

  //Variable to avoid update the data in the fields when is not necessary
  changes: boolean = false

  //Select Component Keys
  selects: string[] = []
  selected: string = ''
  basedOnIndex: number = -1

  newQueryParam: QueryParam = {key:'', value: '', action: true}
  dataSource : Array<QueryParam>= []

  constructor(private  dialogRef:  MatDialogRef<DynamicOptionsDialog>, @Inject(MAT_DIALOG_DATA) 
    public  data:  { key: string, selects: string[], dynamicOptions: DynamicOption }) {
      this.dynamicOptions = data.dynamicOptions
      this.selects = ['None',...data.selects]
      
      const index = this.selects.indexOf(data.key);
      if (index > -1) { 
        this.selects.splice(index, 1);
      }

      if (!this.dynamicOptions.basedOn) this.dynamicOptions.basedOn = 'None'

      if (data.dynamicOptions.queryParams){
        data.dynamicOptions.queryParams.forEach((param,index) => {
          for (const key in param){
            let action = true
            if (param[key]===':selectedValue'){
              this.basedOnIndex = index
              action = false
            }
            this.dataSource.push({key: key, value: param[key], action})
          }
        })
       

      }
  }
   
  //Close the Options Dialog  
  public close() {
    this.dialogRef.close();
  }


 
  public apply(){
    if (!this.changes){
      return
    }

    if(this.basedOnIndex >= 0){
      let key = this.dataSource[this.basedOnIndex].key
      if (key === '') return
      
    }

    let queryParams: Array<any> = []
    this.dataSource.forEach(({key, value}: QueryParam)=>{
      if(key !== '' && value !== ''){
        queryParams.push({[key]: value})

      }
    })

    if (this.dynamicOptions.basedOn === 'None') this.dynamicOptions.basedOn = ''

    this.dynamicOptions.queryParams = queryParams
  }


  deleteRow(index: number){
    //Delete a option
    this.changes = true
    this.dataSource.splice(index, 1)
    this.dataSource = [...this.dataSource];
  }

  selectionChange(matSelect:any ){
    this.changes = true
    if(matSelect.value === 'None'){
      this.dynamicOptions.basedOn = undefined
      
      if (this.basedOnIndex >= 0){
        this.deleteRow(this.basedOnIndex)
      }
      
      this.basedOnIndex = -1

    }else{
      if (this.basedOnIndex > 0){
        this.deleteRow(this.basedOnIndex)
      }
      this.basedOnIndex = this.dataSource.length
      this.dataSource.push({key:'basedOn',value:':selectedValue', action:false})
      this.dataSource = [...this.dataSource]
      this.dynamicOptions.basedOn = matSelect.value
    }
  }

  public changeState(){
    this.changes = true
  }

  public addQueryParam(){
    let {key, value, action} = this.newQueryParam
    if (key !== '' && value !== ''){
      this.newQueryParam = {key: '', value: '', action: true}
      this.changes = true
      this.dataSource.push({key,value, action})
      this.dataSource = [...this.dataSource]
    }
  }

}
