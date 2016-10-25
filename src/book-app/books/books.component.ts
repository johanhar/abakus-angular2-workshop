import { Component } from '@angular/core';
import { BOOK_DATA } from './books.data';
import { Book } from './book.model';

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
                <tr *ngFor="let book of books" [book-row]="book"></tr>
            </tbody>
        </table>
    `
})
export class Books {
    books: [Book] = BOOK_DATA
}