import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';


/*Form components*/
import { MatButtonModule } from '@angular/material/button';

//Slider
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';

//Toggle
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

//DatePicker
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CanvaComponent } from './canva/canva.component';
import { CodeTabComponent } from './code-tab/code-tab.component';

import { LabelWrapperComponent } from './labelWrapper';
import { FormlyFieldLabel } from './labelType';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CanvaComponent,
    CodeTabComponent,
    LabelWrapperComponent,
    FormlyFieldLabel
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ],
      wrappers: [
        { name: 'label-wrapper', component: LabelWrapperComponent },
      ],
      types: [
        {
          name: 'label',
          component: FormlyFieldLabel,
          wrappers: ['label-wrapper']
        },
      ]
    }),
    FormlyMaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
      //Form Components
    FormlyMatSliderModule,
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [
    {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: appearance
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
