import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

@Component({
    'selector': 'contact',
    'template': `
        <div class="center">
            <p *ngIf="!nameControl.valid && nameControl.touched">Name is required</p>
            <p *ngIf="!emailControl.valid && emailControl.touched">Email is invalid</p>
            <p *ngIf="!messageControl.valid && messageControl.touched">Message is required</p>
        </div>
        <form [formGroup]="contactForm" 
            (ngSubmit)="onSubmit(contactForm.value)" 
            novalidate>
            <input type="text" 
                name="name" 
                placeholder="Name *"
                [formControl]="nameControl">
                
            <input type="email" 
                name="email" 
                placeholder="Email"
                [formControl]="emailControl" 
                novalidate>
            
            <textarea placeholder="Message *" 
                name="message" 
                [formControl]="messageControl">
            </textarea>
            
            <button type="submit" [disabled]="!contactForm.valid">Contact us</button>
        </form>
        <p class="center" *ngIf="submitted">Thank you for contacting us!</p>
    `
})
export class Contact {
    contactForm: FormGroup;
    nameControl: AbstractControl;
    emailControl: AbstractControl;
    messageControl: AbstractControl;

    submitted: boolean = false;

    constructor(formBuilder: FormBuilder) {
        this.contactForm = formBuilder.group({
            'email': ['', Validators.pattern('^[^ ]+@[^ ]+\\.[^ ]+$')],
            'name': ['', Validators.required],
            'message': ['', Validators.required]
        });
        this.nameControl = this.contactForm.controls['name'];
        this.emailControl = this.contactForm.controls['email'];
        this.messageControl = this.contactForm.controls['message'];
    }

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
        this.contactForm.reset();
        this.submitted = true;

        setTimeout(() => {
            this.submitted = false;
        }, 2000);
    }
}