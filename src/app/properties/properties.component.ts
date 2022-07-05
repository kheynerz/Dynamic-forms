import { Component, EventEmitter, Output } from '@angular/core';
import { FormComponent } from 'src/formComponents/formComponent';

import { MatDialog } from  '@angular/material/dialog';
import { OptionsComponent } from '../dialogs/options/options.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  @Output() updateChanges = new EventEmitter<any>();
  
  collapse = true;
  isSelected = false;
  showOptions = false;
  locked = false;
  selectedValue: string = ''

  propTitles = {'key': 'Key', 'defaultValue': 'Default value', 'label': 'Label', 'type': 'Type', 'min':'Min','max':'Max',
                'description': 'Description', 'placeholder':'Placeholder', 'pattern': 'Pattern', 
                'selectAllOption': 'Select all option text','required': 'Required', 'multiple' : 'Multiple', 
                'thumbLabel' : 'Thumb Label', 'rows': 'Rows','options': 'Options', 'text': 'Text', 
                'bold' : 'Bold', 'italic': 'Italic', 'under': 'Underlined', 'del': 'Cross Out', 'size': 'Size'
              }

  inputProps = ['key', 'label', 'description', 'placeholder', 'pattern', 'selectAllOption', 'text']
  checkBoxProps = ['required', 'multiple', 'thumbLabel', 'bold', 'italic','under','del']
  numberProps = ['min','max','rows']
  component!: FormComponent;
  properties: Array<{'title': string, "prop": string, "type": string, "value": any}> = [];
  i = -1
  j = -1
  constructor(private  dialog:  MatDialog){}

  toggleSidebar() {
    if (!this.locked){
      this.collapse = !this.collapse;
    }
  }

  lockPropertiesBar(lock: boolean){
    if (lock){
      this.collapse = true;
      this.isSelected = false;
      this.showOptions = false;
      this.locked = true
      this.properties = []
    }else{
      this.locked = false
    }
  }
  showProperties(formComponent: any){
    if (this.showOptions){
      return
    }

    this.isSelected = formComponent.isSelected
    this.properties = []
    this.j =  this.i =  -1
    if (this.isSelected){
      this.i = formComponent.i
      this.j = formComponent.j
      this.component = formComponent.component
      this.component.getProperties().forEach(p => {
        type ObjectKey = keyof typeof this.propTitles;
        const key = p as ObjectKey;
        if(this.inputProps.indexOf(p) >= 0){
          this.properties.push({'title': this.propTitles[key], 'prop': p, "type": 'inp', 'value': this.component.get(p)})
        }
        else if(this.checkBoxProps.indexOf(p) >= 0){
          this.properties.push({'title': this.propTitles[key],'prop': p, "type": 'chk', 'value': this.component.get(p)})
        }
        else if(this.numberProps.indexOf(p) >= 0){
          this.properties.push({'title': this.propTitles[key],'prop': p, "type": 'num', 'value': this.component.get(p)})
        }
        else if(p === 'type'){
          let value: Array<string> = []
          if (this.component.type === 'input' ){
            value = ['color','email','password','text','number','time']
          }
          this.properties.push({'title': this.propTitles[key],'prop': p, "type": 'sel', 'value': value})
        }
        else if (p === 'size'){
          this.properties.push({'title': this.propTitles[key],'prop': p, "type": 'size', 'value': this.component.get(p)})
        }
        else if(p === 'options'){
          this.properties.push({'title': this.propTitles[key],'prop': p, "type": 'opt', 'value': ''})
        }
        
      });
    }
  }

  changeProp(prop: {"prop": string, "type": string, "value": any}){
    let success = this.component.changeProperty(prop.prop, prop.value)
    
    if (success && (this.i != -1 && this.j != -1)){
      this.updateChanges.emit({'success': success, 'component': this.component, "i": this.i ,"j" : this.j})
    }
  }
  changeCombo(prop: {"prop": string, "type": string, "value": any}){
    let success = this.component.changeProperty(prop.prop, this.selectedValue)
    if (success && (this.i != -1 && this.j != -1)){
      this.updateChanges.emit({'success': success, 'component': this.component, "i": this.i ,"j" : this.j})
    }
  }

  public async addOptionsDialog(){
    this.showOptions = true
    const dialogRef = this.dialog.open(OptionsComponent, {
      data: {"key":this.component.key, "options":this.component.get('options')},
      width: '65%',
      height: '65%',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.changes){
        let success = this.component.updateOptions(result.dataSource)
        if (success && (this.i != -1 && this.j != -1)){
          this.updateChanges.emit({'success': success, 'component': this.component, "i": this.i ,"j" : this.j})
        }
      }
      this.showOptions = false
    })
  }
}
