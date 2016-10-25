import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { BookApp } from './book-app.component';
import { Navbar } from './navbar.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        BookApp,
        Navbar
    ],
    bootstrap: [
        BookApp
    ]
})
export class BookAppModule {}