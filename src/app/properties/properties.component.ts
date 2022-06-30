import { Component } from '@angular/core';
import { FormComponent } from 'src/formComponents/formComponent';
import { Label2 } from 'src/formComponents/label2';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  collapse = true;
  isSelected = false;
  showOptionWindow = false

  propTitles = {'key': 'Key', 'defaultValue': 'Default value', 'label': 'Label', 
                'description': 'Description', 'placeholder':'Placeholder', 'pattern': 'Pattern', 
                'selectAllOption': 'Select all option text','required': 'Required', 'multiple' : 'Multiple', 
                'thumbLabel' : 'Thumb Label', 'rows': 'Rows','options': 'Options'}

  inputProps = ['key','defaultValue', 'label', 'description', 'placeholder', 'pattern', 'selectAllOption']
  checkBoxProps = ['required', 'multiple', 'thumbLabel']
  component!: FormComponent;
  properties: Array<{'title': string, "prop": string, "type": string, "value": any}> = [];

  constructor(){}

  toggleSidebar() {
    this.collapse = !this.collapse;
  }

  showProperties(formComponent: any){
    this.isSelected = formComponent.isSelected
    this.properties = []
    if (this.isSelected){
      this.component = formComponent.component
      if (this.component instanceof Label2){
        this.properties = []
      }else{
        this.component.getProperties().forEach(p => {
          
          type ObjectKey = keyof typeof this.propTitles;
          const key = p as ObjectKey;

          if(this.inputProps.indexOf(p) >= 0){
            this.properties.push({'title': this.propTitles[key], 'prop': p, "type": 'inp', 'value': this.component.get(p)})
          }
          else if(this.checkBoxProps.indexOf(p) >= 0){
            this.properties.push({'title': this.propTitles[key],'prop': p, "type": 'chk', 'value': this.component.get(p)})
          }
          else if(p === 'options'){
            this.properties.push({'title': this.propTitles[key],'prop': p, "type": 'opt', 'value': this.component.get(p)})
          }
          else if(p === 'rows'){
            this.properties.push({'title': this.propTitles[key],'prop': p, "type": 'num', 'value': this.component.get(p)})
          }
        });
      }
    }
  }

  changeProp(prop: {"prop": string, "type": string, "value": any}){
    this.component.changeProperty(prop.prop, prop.value)
  }

 
}
