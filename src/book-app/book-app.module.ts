import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { BookApp } from './book-app.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        BookApp
    ],
    bootstrap: [
        BookApp
    ]
})
export class BookAppModule {}