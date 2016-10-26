import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from './book.model';
import  { BOOK_DATA } from './books.data';

@Component({
    'selector': 'book-details',
    'template': `
        <a [routerLink]="['/books']">Back</a>
        <article *ngIf="book" >
            <header><h3>{{book.title}}</h3></header>
            <h4>{{book.author}}</h4>
            <figure class="imageContainer"><img src="assets/img/{{book.id}}.png"></figure>
            <p>
                {{book.description}}
            </p>
            <footer>{{book.isbn}}</footer>
        </article>
        <p *ngIf="!book">Fant ikke boken du ser etter ...</p>
    `
})
export class BookDetails implements OnInit {
    book: Book;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id: number = +params['id']; // (+) konverterer string 'id' til et number

            let filteredBooks: Book[] = BOOK_DATA.filter((book: Book) => {
               return book.id == id;
            });

            this.book = filteredBooks[0];
        });
    }
}