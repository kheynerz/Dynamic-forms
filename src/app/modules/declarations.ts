//Declarations of components
import { AppComponent } from '../app.component';
import { MainComponent } from '../main/main.component';
import { CanvaComponent } from '../canva/canva.component';
import { CodeTabComponent } from '../code-tab/code-tab.component';
import { PropertiesComponent } from '../properties/properties.component';
//Dialog Components
import { OptionsDialog } from '../dialogs/options/options.component';
import { ValidatorsDialog } from '../dialogs/validators/validators.component';
import { DynamicOptionsDialog } from '../dialogs/dynamic-options/dynamic-options.component';

export let declarations = [
    DynamicOptionsDialog,
    AppComponent,
    MainComponent,
    CanvaComponent,
    CodeTabComponent,
    PropertiesComponent,
    OptionsDialog,
    ValidatorsDialog
]
