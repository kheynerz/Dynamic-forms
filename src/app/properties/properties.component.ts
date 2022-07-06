import { Component, EventEmitter, Output } from '@angular/core';
import { FormComponent } from 'src/formComponents/formComponent';

import { MatDialog } from  '@angular/material/dialog';
//Dialogs
import { OptionsDialog } from '../dialogs/options/options.component';
import { ValidatorsDialog } from '../dialogs/validators/validators.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  //Event emitter to send the component to be updated in the formly fields
  @Output() updateChanges = new EventEmitter<any>();
  //Toggle to collapse the properties sidebar
  collapse = true;
  //If a component of the formly fields is selected
  isSelected = false;
  //Block the click while in a dialog
  blockClickInCanva = false;
  //Lock the sidebar when it is in json code tab
  locked = false;
  //Selected value of the combo box
  selectedValue: string = ''

  //The selected component
  component!: FormComponent;

  //Object to transform the keys into a more user friendly text
  propTitles = {'key': 'Key', 'className': 'Flex Size', 'defaultValue': 'Default value', 'label': 'Label', 'type': 'Type', 'min':'Min','max':'Max',
                'description': 'Description', 'placeholder':'Placeholder', 'pattern': 'Pattern', 
                'selectAllOption': 'Select all option text','required': 'Required', 'multiple' : 'Multiple', 
                'thumbLabel' : 'Thumb Label', 'rows': 'Rows','options': 'Options', 'text': 'Text', 
                'bold' : 'Bold', 'italic': 'Italic', 'under': 'Underlined', 'del': 'Cross Out', 'size': 'Size'
              }

  //The properties that can be updated and the respective type of form component they need
  inputProps = ['key', 'label', 'description', 'placeholder', 'pattern', 'selectAllOption', 'text']
  checkBoxProps = ['required', 'multiple', 'thumbLabel', 'bold', 'italic','under','del']
  numberProps = ['min','max','rows']

  //Available types of input
  availableTypes = ['color','email','password','text','number','time']

  //Array of the properties of the selected component
  properties: Array<{'title': string, "prop": string, "type": string, "value": any}> = [];

  //Position of the component in the formly fields
  i = -1
  j = -1

  constructor(private  dialog:  MatDialog){}

  toggleSidebar() {
    if (!this.locked){
      this.collapse = !this.collapse;
    }
  }

  //Function to lock the properties sideBar and clean the data
  lockPropertiesBar(lock: boolean){
    if (lock){
      this.collapse = true;
      this.isSelected = false;
      this.blockClickInCanva = false;
      this.locked = true
      this.properties = []
    }else{
      this.locked = false
    }
  }
  showProperties(formComponent: any){
    //If is blocked dont change the properties
    if (this.blockClickInCanva){
      return
    }
    //Clean the properties and cords 
    this.properties = []
    this.j =  this.i =  -1

    this.isSelected = formComponent.isSelected
    if (this.isSelected){
      //Get the cords of the component
      this.i = formComponent.i
      this.j = formComponent.j
      //Get the component and iterate his properties to show them in the screen
      this.component = formComponent.component
      this.component.getProperties().forEach(p => {
        //Create and object key to access the propTitles dynamically
        type ObjectKey = keyof typeof this.propTitles;
        const key = p as ObjectKey;

        //Get the prop
        let prop = {title: this.propTitles[key], prop: p, type: '', value: this.component.get(p)}

        //Get the type of input 
        if(this.inputProps.indexOf(p) >= 0){
          prop.type = 'inp'
        }
        else if(this.checkBoxProps.indexOf(p) >= 0){
          prop.type = 'chk'
        }
        else if(this.numberProps.indexOf(p) >= 0){
          prop.type = 'num'
        }
        else{
          prop.type = p
        }

        this.properties.push(prop)
        
      });
    }
  }

  changeProp(prop: {"prop": string, "type": string, "value": any}){
    //Change the prop and if it is successful, send a Event to the parent to update the component in the formly fields
    let success = this.component.changeProperty(prop.prop, prop.value)
    if (success && (this.i != -1 && this.j != -1)){
      this.updateChanges.emit({'success': success, 'component': this.component, "i": this.i ,"j" : this.j})
    }
  }
  changeCombo(prop: {"prop": string, "type": string, "value": any}){
    //Change the prop and if is successful, send a Event to the parent to update the component in the formly fields
    let success = this.component.changeProperty(prop.prop, this.selectedValue)
    if (success && (this.i != -1 && this.j != -1)){
      this.updateChanges.emit({'success': success, 'component': this.component, "i": this.i ,"j" : this.j})
    }
  }

  private OpenDialog(dialogType: any, data: any){
    //Block the click in canva and open a mat dialog 
    this.blockClickInCanva = true
    const dialogRef = this.dialog.open(dialogType, {
      data,
      //Configuration of the dialog
      width: '65%',
      height: '65%',
      disableClose: true
    })
    return dialogRef
  }

  //Send and event to the parent to Update the changes in the formly field
  private update(success:boolean){
    if (success && (this.i != -1 && this.j != -1)){
      this.updateChanges.emit({'success': success, 'component': this.component, "i": this.i ,"j" : this.j})
    }
  }

  //Options Dialog
  public addOptionsDialog(){
    //Data of the options of the select component
    let data = {key:this.component.key, options:this.component.get('options')}
    //Open the dialog
    const dialogRef = this.OpenDialog(OptionsDialog, data)
    dialogRef.afterClosed().subscribe(result => {
      //Check if changes were done and update them
      if(result && result.changes){
        this.update(this.component.updateOptions(result.dataSource))
      }
      this.blockClickInCanva = false
    })
  }

  //Validator Dialog
  public validatorsDialog(){
    //Data of the component and the validators
    let  data = {"key":this.component.key, "validators": this.component.get('validators')}
    //Open the dialog
    const dialogRef = this.OpenDialog(ValidatorsDialog, data)
    dialogRef.afterClosed().subscribe(result => {
      //Check if changes were done and update them
      if(result && result.changes){
        this.update(this.component.updateValidator(result.dataSource))
      }
      this.blockClickInCanva = false
    })
  }
}
