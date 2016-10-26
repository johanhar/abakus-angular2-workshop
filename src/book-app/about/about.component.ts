import { Component } from '@angular/core';
import { BOOK_DATA } from '../books/books.data';

@Component({
    'selector': 'about',
    'template': `
        <p>We collect information about books ...</p>
        <p>Currently we have as many as {{ numberOfBooks }} books</p>
    `
})
export class About {
    numberOfBooks: Number = BOOK_DATA.length;
}