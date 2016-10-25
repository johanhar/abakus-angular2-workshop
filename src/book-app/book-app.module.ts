import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { BookApp } from './book-app.component';
import { Navbar } from './navbar.component';
import { About } from './about/about.component';
import { Books } from './books/books.component';
import { Contact } from './contact/contact.component';
import { BookRow } from './books/book-row.component';

import {
    RouterModule,
    Routes
} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'books',
        component: Books
    },
    {
        path: 'contact',
        component: Contact
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        BookApp,
        Navbar,
        About,
        Books,
        Contact,
        BookRow
    ],
    bootstrap: [
        BookApp
    ]
})
export class BookAppModule {}