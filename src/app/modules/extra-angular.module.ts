import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';

let modules = [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule
]

@NgModule({
    imports: modules,
    exports: modules,
})
export class ExtraAngularModules { }