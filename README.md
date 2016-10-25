# Angular 2 Workshop for Abakus
### 26.okt.2016 hos Kantega

## Mål for workshopen

I denne workshoppen skal vi lage en applikasjon for å håndtere et bibliotek av bøker. Du kommer til å lære om:

- bulletpoint
- bulletpoint
- bulletpoint

Vi fokuserer primært på Angular og TypeScript. Likevel er det mange andre ting som må være på plass for å få en moderne web-app til å fungere. Det er mange "buzzwords" (node, webpack, transpilering, sass, ++) å lære seg, men vi dekker ikke disse i denne workshopen. Hvis man likevel skulle være nysgjerrig kan man ta en titt på [vårt oppsett av Webpack](https://angular.io/docs/ts/latest/guide/webpack.html).

### Ferdig løsning
LINK TIL FERDIG LØSNING ...

## Før du begynner
### Sørg for at du har Git installert
[Her kan du installere Git](https://git-scm.com/downloads)

### Sørg for at du har Node.js og NPM installert
[Her kan du installere Node](https://nodejs.org/en/download/)

### Lag en klone av repository
Åpne en terminal og naviger til den stien der du ønsker å legge prosjektet. Kopier så inn følgende kommando: 
```
git clone git@github.com:johanhar/abakus-angular2-workshop.git
```

### Installer avhengigheter
I samme terminalvindu (og under samme sti) som du la prosjektet kan du kopiere inn følgende kommando for å installere avhengigheter som appen vår trenger:

```
npm install
```

### Slå av automatisk transpilering
Hvis din IDE spør om du ønsker å ha automatisk transpilering av TypeScript til JavaScript hver gang du lagrer en fil, så si "Nei, takk" til denne funksjonen. Spør oss gjerne om hjelp hvis du trenger å få dette slått av men ikke finner instillingen. Dette gjelder særlig WebStorm og IDEA.

## Verktøy/IDE
Du kan bruke den IDE eller editor som du selv ønsker.
Vi anbefaler en IDE/editor som har god støtte/plugins for TypeScript.

* [WebStorm/IDEA](https://www.jetbrains.com/idea/) (koster penger for å få TypeScript-støtte / 30 dager trial)
* [Visual Studio Code](https://code.visualstudio.com) (gratis)

## Oppgave 1 - Vår første Component

Vi kjenner alle til innebygde HTML elementer som `<select>` og `<form>`. Med Angular har du mulighet til å lage dine egne elementer med Component. I korte trekk er en Angular-app et tre av Components.

### Definisjonen på en Component
Man kan si at en Component består av tre deler:
 1. Decorator
 2. Et View
 3. En Controller

Her er et eksempel på en enkel Component:
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'hello-world',
    'template': `<h1>Hello world</h1>`
})
export class HelloWorld {}
```

Denne komponenten vil man kunne bruke i en HTML-fil slik:
```html
<body>
  <hello-world></hello-world>
</body>
```

Angular vil ta innholdet fra `template` og plassere det i `<hello-world>` slik at det ferdige resultatet vil se slik ut:

```html
<body>
  <h1>Hello world</h1>
</body>
```

#### Decorator
Med såkalte annotations binder vi metadata til komponenten. En annotation starter med `@` tegnet. For å lage en decorator for komponenter bruker vi annotasjonen `@Component` .

Selve metadataen kommer i form av JSON. Vi kan si at vi konfigurer vår Component gjennom en decorator.

I eksempelet ovenfor konfigurer vi to ting for vår komponent:
1. selector
2. template

#### View
Også kalt Template, det er her vi legger vår HTML. 

Vi valgte å putte HTML direkte i vår metadata, men vi kan velge å plassere HTML i en egen fil/url:

```javascript
@Component({
    'selector': 'hello-world',
    'templateUrl': 'hello-world.html'
})
```

Her har vi valgt å definere Component sitt view (template) i en egen fil med navnet hello-world.html...

#### Controller
Selve logikken til en Component legger vi i klassen, kalt kontrolleren. Her kan vi ha variabler og funksjoner som blir tilgjengelige for vårt View (template). Dette gjør at appen vår blir interaktiv for brukeren. Det som for eksempel skal skje når brukeren trykker på en knapp i Component sitt View kan man legge i klassen. Mer om dette senere.

### 1.1 Gå riktig branch før du starter oppgaven
Du står sannsynligvis i `master` branchen til prosjektet nå, det kan du sjekke med å skrive `git status`. Før du setter i gang med oppgave 1 så må du hoppe over til en egen branch som gir deg riktig utgangspunkt for å sette i gang med oppgavene.


Åpne en terminal og gå til roten av prosjektmappen.

```
git checkout -f start
```
Det er viktig at du bruker **-f opsjonen** i kommandoen!

### 1.2 Opprett rot-komponent
Angular er som sagt et tre av komponenter, vi starter med å opprette selve roten som igjen vil bruke andre komponenter og danne et tre av komponenter.

La oss kalle den noe så enkelt som `BookApp`.

**Opprett en fil: /src/book-app/book-app.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'book-app',
    'template': `<h1>Book app</h1>`
})
export class BookApp {}
```

Vi er ikke helt klar til å bygge og kjøre appen enda, først må vi lage vår første modul.

### 1.3 Opprett en modul
Angular hjelper oss å organisere koden med såkalte moduler. I motsetning til Angular 1 hvor alle komponenter er praktisk talt globale, så har man i Angular 2 mulighet til å avgrense tilgjengelighet med moduler. Dette gjør appen mer vedlikeholdbar og skalerbar. For de som er kjent med Java så kan man sammenligne dette med pakker som igjen består av klasser. Dette gir oss noen fordeler:

- Enkelt å se hvilke komponenter som hører sammen (de er lagt sammen i en modul)
- Enkelt å se hvor komponenter kommer fra (du må eksplisitt importere modulen)
- Man får et tydelig grensesnitt/API på et litt høyere nivå

**Opprett en fil: /src/book-app/book-app.module.ts**
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { BookApp } from './book-app.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        BookApp
    ],
    bootstrap: [
        BookApp
    ]
})
export class BookAppModule {}
```

#### Imports
En modul har mulighet til å bruke andre moduler, her må vi importere `BrowserModule` (som kommer fra Angular) fordi det er en app som skal kjøre i nettleseren.

#### Declarations
Akkurat nå har vi bare en komponent å deklarere. Senere vil modulen bestå av flere andre komponenter, da vil vi måtte legge dem inn her for å si at de også er en del av denne modulen.

#### Bootstrap
Her legger vi inn rot-komponenten, top-level komponenten som vi skal "bootstrappe".

### 1.4 Bootstrap appen
Når vi setter opp en Angular applikasjon så må vi definere en fil hvor vi starter appen fra. Dette har vi allerede gjort for deg, så dette trenger du ikke å tenke på. Man kan se på det som Java sin main-metode, selve utgangspunktet for hvor appen starter å kjøre. Vi har valgt å starte appen fra `src/main.ts`. 

Vi sier at vi bootstrapper appen. Når vi bootstrapper en app så gir vi Angular den modulen som inneholder vår rot-komponent, fra her vil Angular gå gjennom hele treet av komponenter og sørge for at våre nye komponenter kan brukes.

**Rediger /src/main.ts**
```javascript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { BookAppModule } from './book-app/book-app.module';
if (process.env.ENV === 'production') {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(BookAppModule);
```

TODO:
`platformBrowserDynamic` er en funksjon som gjør seg kjent med hvilken nettleser vi kjører appen i og vet hvordan appen vår app kan kjøre ... hmm kommer ikke på en god forklaring her

Nå kan vi ta i bruk `<book-app>` i vår `index.html`.

**Rediger /src/index.html**
```html
...
<body>
  <book-app></book-app>
</body>
...
```

Man kan nå prøve å kjøre appen og se om alt stemmer så langt. Åpne en terminal og kjør følgende:

```
npm start
```

Gå så til [http://localhost:8080](http://localhost:8080).

Vi har satt det opp for deg slik at hvis du nå endrer templaten til `BookApp` så vil nettleseren din automatisk refreshes etter du har lagret (etter noen få sekunder).

## Oppgave 2 - Navigasjonsbar
La oss fortsette med å lage en enkel komponent for navigasjon. Hensikten med denne oppgaven er å vise hvordan en komponent kan bygges opp av andre komponenter. 

### 2.1 Opprett en ny fil for navbar komponenten
**Opprett filen /src/book-app/navbar.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'navbar',
    'template': `
        <nav class="nav">
            <ul class="nav__links">
                <li><a class="nav__link">Books</a></li>
                <li><a class="nav__link">About</a></li>
                <li><a class="nav__link">Contact</a></li>
            </ul>
            <span class="nav__title">Book app</span>
        </nav>
    `
})
export class Navbar {}
```

### 2.2 Ta i bruk vår nye komponent fra rot-komponenten
**Editer /src/book-app/book-app.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'book-app',
    'template': `
        <div class="main-container">
        
            <navbar></navbar>

            <div class="container">              
               
            </div>
        </div>
    `
})
export class BookApp {}
```

### 2.3 Deklarer vår nye komponent i modulen
Legg merke til at vi har elementet `<navbar>` i vår template fra oppgave 2.2. Det vil ikke fungere å ta i bruk nye elementer (selectors) uten at én av følgende stemmer:

1. Modulen vår importerer den modulen som igjen deklarer komponenten (selectoren) vi ønsker å bruke
2. Komponenten (selectoren) vi ønsker å bruke ligger i samme modul

**Editer /src/book-app/book-app.module.ts**

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { BookApp } from './book-app.component';
import { Navbar } from './navbar.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        BookApp,
        Navbar
    ],
    bootstrap: [
        BookApp
    ]
})
export class BookAppModule {}
```



Nå deklareres både `BookApp` og `Navbar` av `BookAppModule`, som gjør at elementet `<navbar>` kan brukes i `BookApp` sin template.

Nå kan du ta en titt i nettleseren etter alle endringer er lagret. Du trenger ikke å kjøre `npm start` om igjen, [http://localhost:8080](http://localhost:8080) oppdateres automatisk ved endringer.

## Oppgave 3 - Routing
Du har kanskje hørt uttrykket "Single Page Application". Angular sin router gjør det mulig å endre nettleseren sin URL uten at man gjør et nytt "page load" / request. Vi kan tenke oss at vi deler skjermbildet i nettleseren opp i ulike områder som vi bytter ut for ulike ruter.

```
💡 Rute, router, hæ?

Vi har oversatt det engelske ordet "route" til "rute" - men det passer kanskje ikke så godt på norsk. I tillegg så har vi ikke oversatt "router" (ruter kan tolkes som et flertall av rute), så det blir en god blanding av norsk og engelsk ... 🙄

Rute: tenk deg at man har en sti/vei/retning (altså en rute) som tar deg til en destinasjon.
Router: har et sett av regler som bestemmer når vi befinner oss på en rute. Routeren gjør selve rutingen (endrer nåværende rute basert på en regel)
```

For å bruke routing i Angular må man forholde seg til tre konsept:
1. Routes
2. RouterOutlet
3. RouterLink

#### Routes
Brukes til å beskrive appens ruter, for eksempel:

```javascript
//
// Dette er bare et eksempel og ikke en del av oppgaven
//
const routes: Routes = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactus', redirectTo: 'contact' },
];
```

Vi ser altså at det er en sammenheng mellom URL (path) og komponent. Når vi befinner oss på http://localhost:8080/about så er det `AboutComponent` som skal vises.

#### RouterOutlet
Fungerer som en placeholder for innholdet til en rute, for eksempel:

```javascript
//
// Dette er bare et eksempel og ikke en del av oppgaven
//
@Component({
  selector: 'router-app',
  template: `
  <div>
    <nav>
      <a>Navigation:</a>
      <ul>
        <li><a [routerLink]="['home']">Home</a></li>
        <li><a [routerLink]="['about']">About</a></li>
        <li><a [routerLink]="['contact']">Contact us</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  </div>
  `
})
class RoutesDemoApp {
}
```

Her vil `<router-outlet>` bli fyllt med riktig komponent for den ruten man befinner seg på.

#### RouterLink
Et såkalt direktiv brukt til å linke til ruter.

```html
<li><a [routerLink]="['home']">Home</a></li>
```

Syntaksen er kanskje ikke så enkel å forstå her. Vi kommer mer inn på dette senere. 
Det man trenger å forstå foreløpig er at routerLink er et direktiv som gjør at man istedenfor å skrive:

```html
<a href="hardkodet url til rute">
```

Heller skriver:

```html
<a [routerLink]="['path definert i Routes']">
```

#### Directive
Hvis du kommer fra Angular 1 har du sikkert hørt om Directive (direktiv på norsk). 

Angular 2 bruker fortsatt begrepet direktiv, det er nemlig sånn at Component er en subtype av Directive. 

Det finnes tre typer direktiv, hvor Component er en av typene. "Structural directives" og "Attribute directives" er de to andre. Du kan lese mer om dette [her](https://angular.io/docs/ts/latest/guide/architecture.html#!#directives).

Dette er ikke så viktig å forstå akkurat nå, man kan trygt gå videre med oppgavene uten å føle at man forstår dette konseptet om direktiv.

### 3.1 - Opprett komponenter for rutene
Før vi lager selve rutene oppretter vi noen foreløpig tomme komponenter.

Legg merke til at vi her velger å legge hver komponent i en egen mappe under rot komponenten.

Foreløpig har vi bare én TypeScript fil i hver komponent-mappe, senere når appen vokser kan det fort hende at man ønsker å ha mer:
- et spec (for enhetstester tilknyttet komponenten)
- stilsett/css tilknyttet komponenten
- template/html i egen fil (istedenfor å definere templaten direkte i annotation)
- flere (under)komponenter

**Dette er bare et eksempel som ikke nødvendigvis har noe fasitsvar.** 
```
/src
  /book-app
    /books
      books.component.ts
      books.template.html
      books.spec.ts
      books.styles.css
      books.e2e.ts

      /book-row
        etc ...

      /book-detail
        etc... 
```


**Opprett en fil: /src/book-app/books/books.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'books',
    'template': `<h1>Look at all these books!</h1>`
})
export class Books {}
```

**Opprett en fil: /src/book-app/contact/contact.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'contact',
    'template': `<p>We only take fax: 22225555</p>`
})
export class Contact {}
```

**Opprett en fil: /src/book-app/about/about.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'about',
    'template': `<p>We collect information about books ...</p>`
})
export class About {}
```

Nå har vi fått på plass noen komponenter som vi kan rute til.
Fortsett med neste oppgave, det er ikke mye nytt å se i [http://localhost:8080](http://localhost:8080) enda.

### 3.2 - Definer ruter til hver komponent
**Editer /src/main.ts**
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { BookApp } from './book-app.component';
import { Navbar } from './navbar.component';
import { About } from './about/about.component';
import { Books } from './books/books.component';
import { Contact } from './contact/contact.component';

import {
    RouterModule,
    Routes
} from '@angular/router';

// 1
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
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes) // 2
    ],
    declarations: [ // 3
        BookApp,
        Navbar,
        About,
        Books,
        Contact
    ],
    bootstrap: [
        BookApp
    ]
})
export class BookAppModule {}
```

Oj, her har det skjedd mye :) La oss gå gjennom disse endringene steg for steg, i koden er det lagt igjen kommentarer med hvert sitt nummer:

1. Vi definerer rutene for modulen. `pathMatch: 'full'` betyr kort sagt at vi alltid omdirigeres til `''` for en ugyldig URL.
2. `RouterModule.forRoot(routes)` er en funksjon som tar våre ruter, konfigurer dem og returnerer en liste av avhengigheter vi må importere i vår modul som er nødvendig for å få rutene til å fungere.
3. Nå som vi har laget mange nye komponenter så må vi deklarere disse også.

Hvis vi tar en titt i consolen til nettleseren vår nå finner vi sikkert flere feil.
Dette skyldes at rot komponenten ikke har tatt i bruk `RouterOutlet`, dette skal vi fikse nå.

### 3.3 - Ta i bruk RouterOutlet
**Editer /src/book-app/book-app.component.ts**
```javascript
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
```

### 3.4 - Ta i bruk RouterLink
**Editer /src/book-app/navbar.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'navbar',
    'template': `
        <nav class="nav">
            <ul class="nav__links">
                <li><a class="nav__link" [routerLink]="['books']">Books</a></li>
                <li><a class="nav__link" [routerLink]="['about']">About</a></li>
                <li><a class="nav__link" [routerLink]="['contact']">Contact</a></li>
            </ul>
            <span class="nav__title">Book app</span>
        </nav>
    `
})
export class Navbar {}
```

Nå burde det være mulig å navigere seg mellom komponenter i appen. Som forklart tidligere er det bare den delen av siden hvor man har plassert `<router-outlet>` at man bytter til en ny komponent for hver rute. Istedenfor å bruke `<a href="..">` så bruker vi `<a [routerLink]="['rute']">` til å linke mellom ruter. 

### 3.5 - Bonusoppgave

Akkurat nå ser alle tabs like ut i `<navbar>`. Selv når vi navigerer til en ny tab så er det ingen indikator på hvilken tab som er aktiv.

Det finnes et direktiv som heter [RouterLinkActive](https://angular.io/docs/ts/latest/guide/router.html#!#router-link-active). Klarer du å få den aktive tabben til å endre utseende? 

```
💡 Tips

Det finnes en ferdig CSS-klasse som heter "nav__link--active"
```

## Oppgave 4 - Template bindings

Så hvordan kan vi gjøre appen vår litt mer "dynamisk" og interaktiv?

Ta en titt på følgende eksempel:

```javascript
@Component({
  selector: 'my-component',
  template: `<h1>{{ someValue }}</h1>`
})
class MyComponent {
  someValue: String = "I'm a value you can display in the template...";
}
```

Syntaksen **{{...}}** kalles for template binding. Vi henter `someValue` fra MyComponent klassen og viser den i templaten.
Koden du finner på innsiden av **{{...}}** er en expression, det betyr at man kan gjøre forskjellige ting som:

```javascript
{{ count + 1 }}
```

```javascript
{{ myFunction(myArguments) }}
```

La oss teste dette med et enkelt eksempel i vår egen app..
### 4.1 - Vis antall bøker i About komponenten
**Endre koden i filen: /src/book-app/about/about.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'about',
    'template': `
        <p>We collect information about books ...</p>
        <p>Currently we have as many as {{ numberOfBooks }} books</p>
    `
})
export class About {
    numberOfBooks: Number = 2;
}
```

Du kan nå navigere i appen til "About" og se endringene.

#### Hvor ble det av $scope?
For de som har jobbet med Angular 1 så legger man kanskje merke til at `$scope` er borte.
Alle funksjoner og variabler i klassen `About` vil være synlige for templaten.

### 4.2 - Lag en liste av bøker med NgFor
#### NgFor
Videre skal vi vise data med bruk av en for-løkke, her kommer litt teori om `NgFor`.

Angular har et innebygd direktiv for å lage for-løkker, det heter `NgFor`.
Syktaksen er litt spesiell, men er enkel å forstå når man først skjønner tanken bak.

```
<li *ngFor="let item of items"> {{ item.someValue }} </li>
```

Her lager vi en ny `<li>` for hver iterasjon av `items` (som kommer fra klassen til viewet).
Stjerne i `*ngFor` betyr at vi har med et direktiv å gjøre som går under kategorien [Structural Directives](https://angular.io/docs/ts/latest/guide/structural-directives.html).
Disse type direktiv vil legge til eller fjerne deler av vårt view ved rendring.

Et godt eksempel er `*ngIf`:
```html
<p *ngIf="condition">
  vises bare hvis condition er true
</p>
```

Vi kan lage våre egne direktiv som viser eller skjuler deler av vårt view basert på en tilstand eller data, og disse vil da bruke stjerne-syntaksen. Men dette skal vi ikke gjøre i denne workshopen, vi fokusere kun på innebygde direktiv for nå.

La oss teste NgFor i vår egen app.

**Legg til koden i filen: /src/book-app/books/books.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'books',
    'template': `
        <h1>Look at all these books!</h1>
        <ul>
            <li *ngFor="let book of books">{{book}}</li>
        </ul>
    `
})
export class Books {
    books: [String] = ['Steelheart', 'Enders game', 'The Name of the Wind']
}
```

Ta en titt under http://localhost:8080/#/books så har vi nå ganske enkelt laget en liste av bøker med `*ngFor`.

### 4.3 - En egen klasse for Bok
Istedenfor å bruke et array av strings, så kan vi lage en klasse i TypeScript som representerer en bok.

**Opprett en fil: /src/book-app/books/book.model.ts**
```javascript
export class Book {
    constructor(
        public id: Number,
        public title: String,
        public author: String,
        public isbn: String,
        public description: String) {}
}
```

Bruken av `.model.ts` her har ingenting å si, det er konvensjon vi lager for oss selv, på lik linje med `.component.ts`, eller `.template.html`.

#### Tom constructor?
Det stemmer ...
Vi ønsker ikke at det skal være mulig å lage en bok uten å ha alle felter.
Hvert argument i constructor vil automatisk bli en property til klassen, og hver property vil bli assigned.

Mer eksplesitt kunne vi har skrevet:
```javascript
//
// Dette er bare et eksempel og ikke en del av koden som skal inn i prosjektet
//
class Book {
    id: Number
    title: String;
    author: String;
    isbn: Number;
    description: String;

    constructor(id: Number, title: String, author: String, isbn: Number, description: String) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
    }
}
```

Det er kanskje enklere å forstå, mange vil foretrekke denne versjonen.

Det mest vanlige med TypeScript å bruke vårt første eksempel:
* hver property blir definert i constructor, de trengs ikke å defineres på forhånd
* hver property vil bli assigned automatisk, vi trenger ikke å gjøre det selv med `this.property = argument`

**NB:** For at de to punktene ovenfor skal bli oppfyllt må argumentet være `public`.

### 4.4 - En tabell av bøker
La oss gjøre om listen av bøker med å bruke en `<table>` istedenfor `<ul>`. 
For hver rad i tabellen ønsker vi å ha en egen komponent.
Til å starte med er hver rad lik, den samme hardkodet boken.
Senere vil vi kunne utvide med data fra en server.

**Opprett en fil: /src/book-app/books/book-row.component.ts**
```javascript
import { Component } from '@angular/core';
import { Book } from './book.model';

@Component({
    'selector': 'tr[book-row]',
    'template': `
        <td>{{book.title}}</td>
        <td>{{book.author}}</td>
        <td>{{book.isbn}}</td>
    `
})
export class BookRow {
    book = new Book(1, 'The book title', 'The author', 'ISBN 123', 'Some description');
}
```

Akkurat nå er det ikke vits å se etter endringer i nettleseren, vi har ikke tatt i bruk den nye komponenten enda.

### 4.5 - Deklarer den nye komponenten i BookAppModule
Åpne `src/book-app/book-app.module.ts` og deklarer den nye komponenten vi nettopp lagde.

### 4.6 - Ta i bruk den nye komponenten i tabellen
**Rediger: /src/book-app/books/books.component.ts**
```javascript
import { Component } from '@angular/core';

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
                <!-- snart lager vi en NgFor her istedenfor -->
                <tr book-row></tr>
                <tr book-row></tr>
                <tr book-row></tr>
                <tr book-row></tr>
            </tbody>
        </table>
    `
})
export class Books {}
```

Ta en titt i nettleseren din nå, listen du hadde av bøker er byttet ut med en tabell som er bygget opp av flere `<book-row>`.

Syntaksen i `BookRow` sin selector er litt annerledes. Vi sier at man skal kun bruke komponenten som en attributt på et html element, og det må være en `<tr>`. Dette gjør vi for å slippe at Angular rendrer følgende:

```html
<tbody>
    <book-row> <!-- Ikke gyldig html i tbody, browseren vil ikke vise dette. -->
        <tr>
            <td>...</td>
        </tr>
    </book-row>
</tbody>
```

men heller ... :
```html
<tbody>
    <tr>
        <td>...</td>
    </tr>
</tbody>
```

## Oppgave 5 - Input
Akkurat nå er alle bøker like... 
Hvordan kan vi gi en liste av BookRow hver sin Book model?

#### Syntaks for input: [squareBrackets]
Syntaksen for å gi en komponent input er med "square brackets":
```html
<some-component [someValue]="theValue"></some-component>
```

For at `<some-component>` skal kunne ta imot input må den si hvilke properties i klassen som skal kunne assignes fra utsiden:
```javascript
@Component({
    'selector': 'some-component',
    'inputs': ['someValue'],
    'template': `...`
})
export class SomeComponent {
    someValue: String;
}
```

Et alternativ og mer populær måte å gjøre det på er å binde propertien i klassen med annotation `@Input`.

```javascript
@Component({
    'selector': 'some-component',
    'template': `...`
})
export class SomeComponent {
    @Input() someValue: String;
}
```

Her har man mulighet til å gi et alias til propertien:
```javascript
export class SomeComponent {
    @Input('value') someValue: String;
}
```

La oss late som at Books henter en liste av bøker fra en server (dette kommer vi mer inn på senere).
Når du skiftet branch i starten av oppgaven (`git checkout -f oppgave3`) fikk du med en fil som vi har laget for deg (/src/book-app/books/book.data.ts.tmp)
### Endre navnet til filen book.data.ts.tmp til book.data.ts (altså fjern .tmp fra navnet)

### Endre BookRow til å ta imot Book med @Input
**/src/book-app/books/book-row.component**
```javascript
import { Component, Input } from '@angular/core';
import { Book } from './book.model';

@Component({
    'selector': 'tr[book-row]',
    'template': `
        <td>{{book.title}}</td>
        <td>{{book.author}}</td>
        <td>{{book.isbn}}</td>
    `
})
export class BookRow {
    @Input('book-row') book: Book;
}
```

Nå er BookRow en ganske enkel komponent, den tar en bok og viser dataen uten noe mer enn det.
Ser du i nettleseren nå får du sikkert opp noen feil eller et tomt view, bare fortsett til neste oppgave,
det som mangler er at vi ikke gir BookRow noen Book enda.

### Gi hver BookRow sin egen Book
**/src/book-app/books/books.component**
```javascript
import { Component } from '@angular/core';
import { BookRow } from './book-row.component';
import { BOOK_DATA } from './book.data';
import { Book } from './book.model';

@Component({
    'selector': 'books',
    'directives': [BookRow],
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
```

Ta en titt i nettleseren din, det bør nå fungere igjen.

## Oppgave 3.5 - Output
Nå har vi sett på input. Hvordan kan en komponent sende output til sin parent og fortelle om events og lignende?

#### Syntaks for output: (parentes)
Syntaksen for at en parent (foreldre-komponent) kan ta imot output er slik:
```html
<products-list (onProductSelected)="productWasSelected($event)">
```

Metoden `productWasSelected` er noe vi må definere selv, en metode vi ønsker å binde i vår komponent med `onProductSelected` sitt output.

For at ProductsList skal kunne sende fra seg outputs må den si fra om dette med annotation `@Output`:
```javascript
class ProductsList {
    @Output() onProductSelected: EventEmitter<Product>;
}
```

### Gjør hver rad klikkbar
Vi skal ikke se nærmere på `EventEmitter` og `@Output` med det første.
Dette har bare vært en kort innføring for nå.
Til å begynne med bruker vi Angular sitt innebygde direktiv Click.

**Endre filen: /src/book-app/books/books.component.ts**
Endre koden i template:
```javascript
<tr *ngFor="let book of books" [book-row]="book" (click)="bookSelected(book)"></tr>
```
Legg til en metode i Books-klasse.
```javascript
bookSelected(book: Book) {
    console.log(book);
}
```

Consolen din skal nå printe ut boken du klikker på.

Før vi navigerer videre fra tabellen til et eget view med mer detaljer for boken må vi ta en innføring i DI (Dependency Injection).
Vi må nemlig ha tak i `Router` i vår komponent slik at vi kan gjøre noe lignende:
```javascript
bookSelected(book: Book) {
    this.router.navigate(['/books', book.id]);
}
```
Mer om dette senere.

## Oppgave 4 - Forms

### Skift til riktig branch
```
git checkout -f oppgave4
```
Det er viktig at du bruker **-f opsjonen** i kommandoen!

### Lag et kontakt oss skjema
**Endre koden i filen: /src/book-app/contact/contact.component.ts**
```html
import { Component } from '@angular/core';

@Component({
    'selector': 'contact',
    'template': `
        <form>
            <input type="text" name="name" placeholder="Name *">
            <input type="email" name="email" placeholder="Email">
            <textarea placeholder="Message *" name="message"></textarea>
            <button type="submit">Contact us</button>
        </form>
    `
})
export class Contact {}
```

Dette er utgangspunktet for skjemaet som vi skal bygge videre på.
Ta en titt i nettleseren at alt ser greit ut så langt..

## Oppgave 4.1 - FormControl og FormGroup
En FormControl representerer et felt i et skjema.
En FormGroup er en samling av én eller flere FormControl.

Skjemaet vi har startet på har tre felter, vi vil altså trenge tre FormControl og én FormGroup i vår komponent sin klasse.
Vi kommer altså til å binde hvert `<input>` og `<textarea>` til en FormControl i klassen, samt binde `<form>` til en FormGroup.

### Bind <input> til hver sin FormControl
Nedenfor ser du koden for å knytte sammen et `<input>` til en FormControl fra klassen/komponenten.
Her er da `contactForm` en property vi ikke enda har skrevet (det gjør vi snart), som igjen har et sett av FormControls. 

**Endre koden i filen: /src/book-app/contact/contact.component.ts**
```html
<input type="text" 
    name="name" 
    placeholder="Name *"
    [formControl]="contactForm.controls['name']">
```
Gjør det samme for epost og meldingsfeltet.

### Bind skjema til FormGroup
**Endre koden i filen: /src/book-app/contact/contact.component.ts**
```html
<form [formGroup]="contactForm" (ngSubmit)="onSubmit(contactForm.value)">
```

Vi skal snart sette opp `contactForm` og metoden `onSubmit(value: string)` i klassen.

## Oppgave 4.2 - FormBuilder
Koden du har skrevet til nå kjører ikke særlig bra, vi trenger å sette ting sammen i klassen.

### Importer nødvendige direktiv
Før du kan sette i gang å bruke forms i Angular trenger komponenten din en rekke komponenter og direktiv.

**Endre koden i filen: /src/book-app/contact/contact.component.ts**
```javascript
...
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
    'selector': 'contact',
    'directives': [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
...
```

Det er fortsatt litt arbeid som skal til før vi kan kjøre appen uten feil, fortsett med oppgavene under.

### Ta i bruk FormBuilder for å lage FormGroup
La oss se nærmere på det som må gjøres i klassen, nå som vi har gjort ferdig view biten.
Det første vi må gjøre er å lage vår FormGroup med FormBuilder.

**/src/book-app/contact/contact.component.ts**
```javascript
export class Contact {
    contactForm: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.contactForm = formBuilder.group({
            'email': [''],
            'name': [''],
            'message': ['']
        })
    }

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
    }
}
```

Nå burde du kunne se at det logges i console ved submit.

Hvor kommer FormBuilder fra? Dette forklarer vi nærmere senere når vi går gjennom Dependency Injection.
Prøv å submit skjema og se hva som blir logget i consolen.

## Opgpave 4.3 - Feedback ved submit
Det er kanskje litt kjedelig å bare logge til console, la oss prøve å gjøre appen litt mer "ekte" med å gi en tilbakemelding ved submit.

### Legg til følgende kode i Contact komponenten
**/src/book-app/contact/contact.component.ts**
```javascript
//
// Dette er ikke hele filen, bare det som du skal legge inn ekstra på riktige steder
// Du skal ikke fjerne/erstatte eksisterende kode
//
@Component({
    'template': `
        <p class="center" *ngIf="submitted">Thank you for contacting us!</p>
    `
})
export class Contact {
    contactForm: FormGroup;
    submitted: boolean = false;

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
        this.contactForm.reset();
        this.submitted = true;

        setTimeout(() => {
            this.submitted = false;
        }, 2000);
    }
}
```

Som vi har snakket om før så vil `<p *ngIf="submitted">` sitt innhold vises/skjules når `submitted` endres.
Angular tar seg av endringer i viewet, man trenger bare å endre `submitted` og så vil resten skje automatisk.

## Oppgave 4.4 - Validering
Som du kan se har vi prøvd å merke navn og melding som obligatorisk med å bruke stjerne, 
en typisk måte å si til brukeren at dette feltet må være med (`placeholder="Name *"`).
Vi har også et felt for epost, som nå valideres av nettleseren din (HTML5).

### Slå av HTML5 validering
Ofte ønsker vi kontrollen på feilmeldinger selv, så la oss starte med å slå av HTML5 validering.

**Rediger: /src/book-app/contact/contact.component.ts**
```html
<form [formGroup]="contactForm" 
    (ngSubmit)="onSubmit(contactForm.value)" 
    novalidate>

<input type="email" 
    name="email" 
    placeholder="Email"
    [formControl]="contactForm.controls['email']" 
    novalidate>
```

### Legg til feilmeldinger
Det er mange måter å vise feilmeldinger på, 
vi gjør det enkelt (og ikke nødvendigvis penest og best) med å vise alle type feil i bunnen av skjema i en samlet `<div>`.

**Rediger: /src/book-app/contact/contact.component.ts**
```html
<div class="center">
    <p *ngIf="!contactForm.controls['name'].valid && contactForm.controls['name'].touched">Name is required</p>
    <p *ngIf="!contactForm.controls['email'].valid && contactForm.controls['email'].touched">Email is invalid</p>
    <p *ngIf="!contactForm.controls['message'].valid && contactForm.controls['message'].touched">Message is required</p>
</div>
```

### Legg på validering
For at validering skal fungere må vi si til hver enkelt FormControl hva slags validering som gjelder for den.

**Rediger: /src/book-app/contact/contact.component.ts**
```javascript
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators // må også importeres når vi skal bruke validering 
} from '@angular/forms';

// Legg til validering for hvert felt
constructor(formBuilder: FormBuilder) {
    this.contactForm = formBuilder.group({
        'email': ['', Validators.pattern('^[^ ]+@[^ ]+\\.[^ ]+$')],
        'name': ['', Validators.required],
        'message': ['', Validators.required]
    })
}
```

### Gjør submit-knappen disabled når formen er ugyldig
Angular har et innebygd direktiv for å gjøre felter og knapper disabled. 

**Editer: /src/book-app/contact/contact.component.ts**
```html
<button type="submit" [disabled]="!contactForm.valid">Contact us</button>
```

Nå kan du prøve å sende formen og se om valideringen virkelig fungerer!

Dette er helt enkel validering.
Det er mye mer man kan gjøre med forms og validering, 
men for nå i denne workshopen ser vi oss ferdige og går videre til andre oppgaver.

## Oppgave 5 Services og DI (dependency injection)

### Skift til riktig branch
```
git checkout -f oppgave5-7
```

For å hente data til bøker, skal vi lage en service som komponenter
kan utnytte for å søke etter bøker. Vi må også fortelle til Angular at 
vår service er tilgjengelig for *dependency injection*, slik at komponenter
som vil ha servicen kan få tak i den.

## 5.1 Lage en service
Servicen vår mangler noen funksjonalitet som du må oppfylle.

**Se på filen *src/book-app/services/book.service.ts* og følg instruksjoner der.**

## 5.2 Gjør servicen tilgjengelig for DI
For at en komponent skal bli tilgjengelig for DI må du annotere den
med @Injectable() Husk å bruke parenteser, ellers får du mange rare feilmeldinger! 

**Legg til annotasjonen i filen: src/book-app/services/book.service.ts**

De komponentene som skal bruke vår @Injectable() service-klasse må:
* sette 'providers' i en @Component-annotasjonen 
* legge til parametre i constructor som skal injectes

F.eks. 
```javascript
@Component({
    'selector': 'about',
    'providers': [MyService]
    ....
})
class MyComponent {
    
    constructor(private myService: MyService) {
    }
    ....
}

```
**Legg til providers og constructor i src/book-app/books/books.component.ts** 

Hva er *provider* da ?
Provider er en klasse som vet hvordan man lager instanser av klasser
som skal bli injected. Provider kan være f.eks. være en factory-klasse, men 
som vanlig er den en klasse som skal bli injected selv. Altså i vår tilfelle BookService-klasse.

**Ta i bruk bookService i src/book-app/books/books.component.ts**
Linjen 
```javascript
// this.books = this.bookService.getAll();
```
er kommentert ut. Ta den i bruk.

Da kan du se en liste av bøker når du går til [http://localhost:8080](http://localhost:8080)!

## 5.3 En detaljert visning av hver bok
Nå som vi har sett litt på Dependency Injection så kan vi fortsette med listen av bøker.

### Naviger til en detaljert visning av valgt bok
Når brukeren trykker på en bok i tabellen av bøker, så skjer det ingenting akkurat nå, vi bare logger noe til console.
For at brukeren kan navigere til detaljert visning av en bok,
må du først injisere Router-service i constructor:

**Endre koden i src/book-app/books/books.component.ts**
```javascript
    constructor(private bookService: BookService, private router: Router) {
    }
```
La merke at vi trenger **ikke** å endre 'providers' i komponenten,
siden Angular tilbyr denne servicen automatisk til den scopen hvor vår komponent er.
Navigering til detaljer visning er ikke ferdig ennå.

**Endre koden i metoden bookSelected src/book-app/books/books.component.ts**

```javascript
this.router.navigate(['/books', book.id]);
```

Da kan du teste å navigere videre fra bok-listen!


## Oppgave 6 Lifecycle hooks

Angular har ansvaret for å håndtere dine komponenter og dette kommer med diverse hendelser.
Hver komponent som vi lager i Angular har en så kalt *lifecycle*.
Slike hendelser som inngår i komponenten sin lifecycle er oppretting av komponent, oppdatering og sletting.

Ved å implementer spesielle *interfaces* som Angular
tilbyr, kan vi knytte vår egen funksjonalitet til disse hendelser. 

De mest vanlige interfaces er:
* OnInit
* OnDestroy
* OnChanges

For eksempel:
```javascript
class MyComponent implements OnInit { 
    ngOnInit() { 
        console.log('ngOnInit - initializing component.'); 
    }
}
```

### Vis antall bøker på About siden
Ved hjelp av BookService-klassen skal du vise antall bøker i bibliotek.
Her må du bruke OnInit-interfacet.  Vi kunne selvsagt også bare kalle servicen i en constructor til klasse, men det er trygger og bedre å la constructoren bare initialisere attributer til klassen, og gjøre ting som krever mer jobb i ngOnInit-metoden.

**Endre koden etter instruksjoner i filen: src/book-app/about/about.component.ts**

Da kan du teste at antall bøker er riktig i 'about'-seksjonen.

## Oppgave 7 Binding til events

Vanlig Angular-applikasjon er et tree av komponenter, hvor data flyter nedover i tree 
oftest via property-binding ved hjelp av @Input-annotering. Når man har behov å 
passe data oppover i komponent-tree, bruker man vanligvis *event binding* med
kustom events. Dette er ikke den eneste måte å passe data oppover i komponentstruktur,
men når man har direkte parent-child relasjon, er dette en grei måte å gjøre det.

I vår applikasjon har vi parent-child relasjon mellom komponenter *Books* og 
*SearchComponent*. Siden Books inkluderer *\<search\>*-tag i sin template, er
 den parent-komponent, og SearchComponent er child-komponent.
 Når brukeren utfører søk og får resultater, må fi fortelle nå oppover i strukturen
 at vi har noe som vi ville vise til brukeren.
 Dette kan vi oppnå ved å lage vår egen *custome event* og reagere på den.

## 7.1 Lage en custom event for resultater

**Åpne filen src/book-app/search/search-component.ts**

Der skal vi ha vår custom-event som er av type *EventEmitter*.
I tillegg til det må vi annotere det slik at Angular kan registrer den.
Riktig annotasjon her er *@Output()*.

Et eksempel om custom-event:
```javascript
@Output() onMyEvent:EventEmitter<MyPayloadType> = new EventEmitter<MyPayloadType>
```

Siden vi retunerer instanser av Book-klasse fra BookService, er *payload* i dette
tilfelle *en array av bøker*.

## 7.2 Send events fra søkresultater
Når vi har vår egen EventEmitter på plass, må vi sende events på riktige tidspunkter
med den, slik at de komponentene som lytter på oss kan reager på dem.
Disse tidspunktene i vår tilfelle er når vi *har fått søkresultat* og når brukeren
har *skrivet i søkefelt mindre enn 2 tegn*.

**Endre koden etter instruksjoner i filen: src/book-app/search/search-component.ts**

## 7.3 Vis resultater ved events i template

Da er vår komponent klar til å sende events, og det som gjenstår, er å definere
hvordan vi reagerer på dem i parent-komponent. 
Med andre ord: vi skal *binde på event* i vår parent-komponents template.

F.eks.
```html
<mytag (onMyCustomEvent)='myMethodCall($event)'></mytag>
```
La merke hvordan man viderefører *payload* fra event til metode-kall ved å bruke '$event'-argument.

**Endre koden etter instruksjoner i filen: src/book-app/books/books.component.ts**

Da kan du søke bøker og se resultater i bok-lista med en gang vi har noenting å vise!

Dette var også siste oppgave, og din applikasjonen er ferdig nå.

**Takk for deltagelse!!**
