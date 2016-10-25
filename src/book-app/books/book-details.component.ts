import { Component } from '@angular/core';

@Component({
    'selector': 'book-details',
    'template': `
        <a [routerLink]="['books']">Take me back</a>
        <p>Currently not so many details to be found, come back later</p>
    `
})
export class BookDetails {}