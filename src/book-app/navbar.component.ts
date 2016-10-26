import { Component } from '@angular/core';

@Component({
    'selector': 'navbar',
    'template': `
        <nav class="nav">
            <ul class="nav__links">
                <li><a class="nav__link" [routerLink]="['/books']" [routerLinkActive]="['active']">Books</a></li>
                <li><a class="nav__link" [routerLink]="['/about']" [routerLinkActive]="['active']">About</a></li>
                <li><a class="nav__link" [routerLink]="['/contact']" [routerLinkActive]="['active']">Contact</a></li>
            </ul>
            <span class="nav__title">Book app</span>
        </nav>
    `
})
export class Navbar {}