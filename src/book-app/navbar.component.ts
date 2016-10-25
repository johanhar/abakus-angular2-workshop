import { Component } from '@angular/core';

@Component({
    'selector': 'navbar',
    'template': `
        <nav class="nav">
            <ul class="nav__links">
                <li><a class="nav__link" [routerLink]="['books']" [routerLinkActive]="['nav__link--active']">Books</a></li>
                <li><a class="nav__link" [routerLink]="['about']" [routerLinkActive]="['nav__link--active']">About</a></li>
                <li><a class="nav__link" [routerLink]="['contact']" [routerLinkActive]="['nav__link--active']">Contact</a></li>
            </ul>
            <span class="nav__title">Book app</span>
        </nav>
    `
})
export class Navbar {}