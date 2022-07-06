import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';

let modules = [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule
]

@NgModule({
    imports: modules,
    exports: modules,
})
export class ExtraAngularModules { }