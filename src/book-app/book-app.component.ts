import { Component } from '@angular/core';

@Component({
    'selector': 'book-app',
    'template': `
        <div class="main-container">
        
            <navbar></navbar>

            <div class="container">              
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class BookApp {}