import { NgModule } from '@angular/core';

//External modules
import { ToastrModule } from 'ngx-toastr';

//Extra angular features 
import { ExtraAngularModules } from './modules/extra-angular.module'
//Angular Material Module
import { MaterialModule } from './modules/material.module';
//Extra formly add-ons
import { NGXFormlyModule } from './modules/ngx-formly.module';

//NGX-Formly and Material for Formly
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

//Declaration of Components
import { declarations } from './modules/declarations';
import { AppComponent } from './app.component';


@NgModule({
  declarations,
  imports: [ 
    ExtraAngularModules,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ],
    }),
    MaterialModule,
    NGXFormlyModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
