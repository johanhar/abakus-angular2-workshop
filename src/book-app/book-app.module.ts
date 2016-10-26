import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule
} from '@angular/forms';

import { BookApp } from './book-app.component';
import { Navbar } from './navbar.component';
import { About } from './about/about.component';
import { Books } from './books/books.component';
import { Contact } from './contact/contact.component';
import { BookRow } from './books/book-row.component';
import { BookDetails } from './books/book-details.component';

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
    },
    {
        path: 'bookdetails/:id',
        component: BookDetails
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        BookApp,
        Navbar,
        About,
        Books,
        Contact,
        BookRow,
        BookDetails
    ],
    bootstrap: [
        BookApp
    ]
})
export class BookAppModule {}