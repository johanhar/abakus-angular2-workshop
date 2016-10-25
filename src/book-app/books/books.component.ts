import { Component } from '@angular/core';
import { BOOK_DATA } from './books.data';
import { Book } from './book.model';
import { Router } from '@angular/router';

@Component({
    'selector': 'books',
    'template': `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let book of books" [book-row]="book" (click)="bookSelected(book)"></tr>
            </tbody>
        </table>
    `
})
export class Books {
    books: [Book] = BOOK_DATA;

    constructor(private router: Router) {}

    bookSelected(book: Book) {
        this.router.navigate(['bookdetails', book.id]);
    }
}