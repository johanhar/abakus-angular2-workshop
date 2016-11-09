# Angular 2 Workshop for Abakus
### 26.okt.2016 hos Kantega

## Mål for workshopen

I denne workshoppen skal vi lage en applikasjon for å håndtere et bibliotek av bøker. Du kommer til å lære om:

- Component
- Routing
- Templating
- Dependency Injection
- Angular sine Lifecycle Hooks
- Skjema og validering

### Ferdig løsning
[https://fathomless-sands-93928.herokuapp.com](https://fathomless-sands-93928.herokuapp.com)

## Før du begynner
### Sørg for at du har Git installert
[Her kan du installere Git](https://git-scm.com/downloads)

### Sørg for at du har Node.js og NPM installert
[Her kan du installere Node](https://nodejs.org/en/download/)

### Lag en klone av repository
Åpne en terminal og naviger til den stien der du ønsker å legge prosjektet. Kopier så inn følgende kommando: 
```
git clone https://github.com/johanhar/abakus-angular2-workshop.git
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

Vi sier at vi bootstrapper appen. Når vi bootstrapper en app så gir vi Angular den modulen som inneholder vår rot-komponent og fra her vil Angular gå gjennom hele treet av komponenter og sette opp alt som er nødvendig for at appen kan kjøre.

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

`platformBrowserDynamic` er en funksjon som gjør seg kjent med hvilken nettleser som brukes og bootstrapper appen for den nettleseren.

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
**Editer /src/book-app/book-app.module.ts**
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
                <li><a class="nav__link" [routerLink]="['/books']">Books</a></li>
                <li><a class="nav__link" [routerLink]="['/about']">About</a></li>
                <li><a class="nav__link" [routerLink]="['/contact']">Contact</a></li>
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

**Rediger: /src/book-app/books/books.component.ts**
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

Ta en titt under http://localhost:8080/books så har vi nå ganske enkelt laget en liste av bøker med `*ngFor`.

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

Mer eksplisitt kunne vi har skrevet:
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
Akkurat nå er alle bøker like... Hvordan kan vi gi en forskjellige modell av `Book` til hver `BookRow`? La oss se nærmere på dette.

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

### 5.1 - Liste av forskjellige bøker
La oss late som at Books henter en liste av bøker fra en server. Denne listen er ganske stor, derfor har vi lagt den i en egen gist.

**Opprett en ny fil: /src/book-app/books/books.data.ts**
[Filens innhold ligger her](https://gist.github.com/johanhar/010ba1b81d67226b4fa9a830a71ca52c)

### 5.2 - Endre BookRow til å ta imot Book med @Input
**Rediger filen: /src/book-app/books/book-row.component**
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

Nå er BookRow en ganske enkel komponent, den tar en bok og viser dataen uten noe mer enn det. Ser du i nettleseren nå får du sikkert opp noen feil eller et tomt view, bare fortsett til neste oppgave, det som mangler er at vi ikke gir BookRow noen Book enda.

### 5.2 - Gi hver BookRow sin egen Book
**Rediger filen: /src/book-app/books/books.component**
```javascript
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
```

Ta en titt i nettleseren din, det bør nå fungere igjen.

### 5.3 - Bonusoppgave
Under tabben/fanen til `/about` så står det at vi har bare 2 bøker i biblioteket. Klarer du å vise samme antall som til en hver tid vises i tabellen under `/books`?

## Oppgave 6 - Output
Nå har vi sett på input. Hvordan kan en komponent sende output til sin parent og fortelle om events og lignende?

#### Syntaks for output: (parentes)
Syntaksen for at en parent (foreldre-komponent) kan ta imot output er slik:
```html
<products-list (onProductSelected)="productWasSelected($event)">
```

Metoden `productWasSelected` er noe vi må definere selv, en metode vi ønsker å binde i vår komponent med `onProductSelected` sitt output. Altså når komponent X bruker `<products-list>` så må X lage metoden vi binder til `(onProductSelected)`.

For at ProductsList skal kunne sende fra seg outputs må den si fra om dette med annotation `@Output`:
```javascript
class ProductsList {
    @Output() onProductSelected: EventEmitter<Product>;
}
```

### 6.1 - Gjør hver rad klikkbar
Vi skal ikke se nærmere på `EventEmitter` og `@Output` med det første. Dette har bare vært en kort innføring for nå. Til å begynne med bruker vi Angular sitt innebygde direktiv `Click`.

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

Consolen i nettleseren din skal nå printe ut boken du klikker på.

### 6.2 - Lag en side som viser detaljer for boken
**Opprett filen: src/book-app/books/book-details.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'book-details',
    'template': `
        <a [routerLink]="['/books']">Back</a>
        <p>Currently not so many details to be found, come back later</p>
    `
})
export class BookDetails {}
```

**Opprett en rute for detalje-siden: src/book-app/book-app.module.ts**
```javascript
{
  path: 'bookdetails/:id',
  component: BookDetails
}
```

**❗️ Husk å deklarere BookDetails i BookAppModule**

### 6.3 - Naviger til detalje-siden fra listen av bøker
**Rediger filen: src/book-app/books/books.component.ts**
```javascript
//
// La gamle imports stå
//
import { Router } from '@angular/router';

//
// La @Component stå som før
//
@Component(...)
export class Books {
    books: [Book] = BOOK_DATA;

    constructor(private router: Router) {}

    bookSelected(book: Book) {
        this.router.navigate(['bookdetails', book.id]);
    }
}
```

Legg merke til at vi aldri sier `new Router()` noe sted ... Er ikke det litt pussig? 

Husk at det er Angular som lager en instans av `Books` komponenten for oss. Når Angular kaller constructoren til `Books` gjenkjenner den argumentet som krever en `Router` og sørger for å gi en ferdig initialisert instans, klar for bruk. Dette er en del av det som kalles for Dependency Injection (DI). Angular er bygd rundt DI. 

For at dette er mulig så må vi først registrere `Router` som en mulig avhengighet, altså noe som kan injectes. Dette er allerede gjort for oss (det er en standard komponent som følger med Angular, vi har ikke skrevet den selv).

Vi har allerede sagt til DI-systemet at vi vil kunne være avhengig av `Router` som ligger i modulen  `RouterModule`, dette gjorde vi da vi skrev følgende kode i vår `BookAppModule`:
```javascript
@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ]
    ...
```

Så når vi da krever et argument av typen `Router` i constructor til en komponent deklarert i `BookAppModule` - så vil Angular automatisk sørge for å gi den komponenten en ferdig initialisert `Router`.

```
          
          OPPRETTER INSTANS AV B
+-----+                         +-----+
|     +-----------------------> |     |
|  A  |                         |  B  |
|     +-----------------------> |     |
+-----+                         +-----+
          GJØR SEG AVHENGIG TIL B


+-----+                         +-----+
|     |                         |     |
|  A  |                         |  B  |
|     |   INJECTER B            |     |
+--+--+ <-------------+         +--+--+
   |                  |            |
   |                  |            | REGISTRER SEG
   |               +--+--+         |
   |               |     |         |
   +-------------> | DI  | <-------+
 "JEG TRENGER B"   |     |
                   +-----+
                   
```

### 6.4 - Bonusoppgave
Det er ikke så vanlig å binde en metode til `(click)`som igjen kaller `this.router.navigate(['bookdetails', book.id]);`. Men for eksemplets skyld gjorde vi det denne gang - slik at vi kunne gi en innføring i DI og output.

Se om du kan få til samme navigasjon med `[routerLink]` direktivet.

## Oppgave 7 - Lifecycle Hooks

Alle komponenter har en lifecycle som Angular håndterer for oss. Når vi har komponenter som får andre komponenter og services injected bør vi forholde oss til såkalte hooks. 

E.g.:

```javascript
export class Books {
    books: [Book] = BOOK_DATA;

    constructor(private router: Router) {
      this.router.doSomething();
    }
}
```

Det er ikke sikkert at appens tilstand i det tidspunkt vi befinner oss i constructoren er klar for å kalle metoder på avhengigheter, derfor vil kanskje `this.router.doSomething()` feile.

Dette løses med såkalte hooks:
- ngOnOnit
- ngOnDestroy

Det finnes flere hooks, men vi skal kun fokusere på `ngOnInit`.

### 7.1 - Ferdigstill BookDetails
**Editer filen: src/book-app/books/book-details.component.ts**
```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from './book.model';
import { BOOK_DATA } from './books.data';

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
```

Hva skjer om vi legger inn et lite delay når vi henter riktig bok basert på id? La oss si at vi heller hentet data fra en server med mye delay...
```javascript
setTimeout(() => {
	this.book = filteredBooks[0];
}, 3000);
```

Angular trenger ikke å få beskjed om når `book` i controlleren har endret seg, templaten/viewet blir automatisk re-rendret!

### 7.2 - Bonusoppgave
Denne oppgaven er kun relevant hvis du gjorde bonusoppgave 3.5...

Når du navigerer deg inn på en bok ( `/bookdetails` ) forsvinner CSS-klassen som gjør "Books" tabben aktiv. Klarer du markere "Books"-tabben som aktiv i navigasjonsbaren selv når vi er inne på `/bookdetails` ?

Her er noen mulige hint (det finnes nok flere ulike løsninger, man må ikke løse det med følgende hint):

- [NgClass](https://angular.io/docs/ts/latest/api/common/index/NgClass-directive.html)
- [ActivatedRoute](https://angular.io/docs/ts/latest/api/router/index/ActivatedRoute-interface.html)

## Oppgave 8 - Forms / skjema
Det er kanskje ikke så mange som bruker fax i dag. La oss lage et kontaktskjema under `/contact` istedenfor å be om fax.

Før vi setter i gang tar vi en kjapp runde på teori og gjør deg kjent med de komponenter vi skal bruke.

#### FormControl
En FormControl representerer et felt i et skjema. For eksempel `<input>` eller `<select>`.

#### FormGroup
En FormGroup er en samling av FormControls.

Vi må altså opprette en `FormControl` i vår kontroller/klasse og binde denne opp et element i templaten - for alle elementer.

### 8.1 - Lag et tomt skjema
**Editer filen: src/book-app/contact/contact.component.ts**
```javascript
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

Dette er utgangspunktet for skjemaet som vi skal bygge videre på. Ta en titt i nettleseren at alt ser greit ut så langt..

### 8.2 - Opprett FormControls og en FormGroup
**Editer filen: src/book-app/contact/contact.component.ts**
```javascript
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

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
export class Contact {
    contactForm: FormGroup;
    nameControl: AbstractControl;
    emailControl: AbstractControl;
    messageControl: AbstractControl;

    constructor(formBuilder: FormBuilder) {
        this.contactForm = formBuilder.group({
            'email': [''],
            'name': [''],
            'message': ['']
        });
        this.nameControl = this.contactForm.controls['name'];
        this.emailControl = this.contactForm.controls['email'];
        this.messageControl = this.contactForm.controls['message'];
    }
}
```

**Importer nye moduler: src/book-app/book-app.module.ts**
```javascript
import { FormsModule, ReactiveFormsModule
} from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    ...
```
Dette er nødvendige avhengigheter vi kommer til å få når vi skal jobbe med forms og validering.

Ingenting nytt å se i nettleseren, gå videre til neste oppgave.

### 8.3 - Bind FormControls til elementer i templaten
**Rediger deler av filen: src/book-app/contact/contact.component.ts**
```html
<input type="text" 
       name="name" 
       placeholder="Name *"
       [formControl]="nameControl">
```

Gjør det samme for epost- og meldingsfelt.

Ingenting nytt å se i nettleseren, gå videre til neste oppgave.

### 8.4 - Bind FormGroup til formen i templaten
**Rediger deler av filen: src/book-app/contact/contact.component.ts**
```html
<form [formGroup]="contactForm" (ngSubmit)="onSubmit(contactForm.value)">
```

Her har vi også tatt i bruk det innebygde direktivet `(ngSubmit)`. Det fungerer på lik måte som `(click)`. Funksjonen vi binder til må vi også lage:

**Rediger deler av filen: src/book-app/contact/contact.component.ts**
```javascript
onSubmit(value: string): void {
	console.log('you submitted value: ', value);
}
```

Nå er det endelig mulig å se endringer i nettleseren. Åpne consolen og sjekk om alle felter i skjemaet logges ved innsending.

### 8.5 - Feedback ved innsending
Det er kanskje litt kjedelig å bare logge til console, la oss gjøre appen litt mer "ekte" med å gi en tilbakemelding.

**Rediger deler av filen: src/book-app/contact/contact.component.ts**
```javascript
//
// Dette er ikke hele filen
// Bare det som du skal legge inn ekstra på riktige steder
// Du skal ikke fjerne/erstatte eksisterende kode
//

// Legg til en melding i templaten
@Component({
    'template': `
        <p class="center" *ngIf="submitted">Thank you for contacting us!</p>
    `
})

export class Contact {
	// Legg til en ny property (brukes av *ngIf)
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

Du vil nå få opp en melding i nettleseren ved innsending av skjemaet.

Som vi har snakket om før så vil `<p *ngIf="submitted">` sitt innhold vises/skjules når `submitted` endres. Angular tar seg av endringer i viewet, man trenger bare å endre `submitted` og så vil resten skje automatisk.

### 8.6 - Slå av HTML5 validering
Som du kan se har vi prøvd å merke navn og melding som obligatorisk med å bruke stjerne, 
en typisk måte å si til brukeren at dette feltet må være med (`placeholder="Name *"`). Vi har også et felt for epost, som nå valideres av nettleseren din (HTML5).

Ofte ønsker vi kontrollen på feilmeldinger selv, så la oss starte med å slå av HTML5 validering.

**Rediger: /src/book-app/contact/contact.component.ts**
```html
<form [formGroup]="contactForm" 
    (ngSubmit)="onSubmit(contactForm.value)" 
    novalidate>

<input type="email" 
    name="email" 
    placeholder="Email"
    [formControl]="emailControl" 
    novalidate>
```

Det er ikke så mye nytt å se i nettleseren enda, gå videre til neste oppgave.

### 8.7 - Legg til feilmeldinger
Det er mange måter å vise feilmeldinger på, vi gjør det enkelt (og ikke nødvendigvis best) med å vise alle type feil i toppen av skjema i en samlet `<div>`.

**Rediger: /src/book-app/contact/contact.component.ts**
```html
<div class="center">
  <p *ngIf="!nameControl.valid && nameControl.touched">Name is required</p>
  <p *ngIf="!emailControl.valid && emailControl.touched">Email is invalid</p>
  <p *ngIf="!messageControl.valid && messageControl.touched">Message is required</p>
</div>
```

Det er ikke så mye nytt å se i nettleseren enda, gå videre til neste oppgave.

### 8.8 - Legg på validering
```javascript
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
```
Husk å importere `Validators` fra '@angular/forms'.

Nå kan du prøve å sende formen og se om valideringen fungerer!

### 8.9 - Bonusoppgave
Se om du klarer å gjøre `<button type="submit">` disabled (grået ut og ikke klikkbar) når skjemaet ikke er gyldig.

Hint: det finnes et `[disabled]` direktiv.

## Takk for deltakelse 👍

Workshopen denne gang hadde litt begrenset med tid, håper du likevel fikk en god smakebit på hva Angular 2 og TypeScript har å tilby.

Har du tid til overs er det bare å rekke opp en hånd, vi har noen bonusoppgaver på lur ;)

Ønsker du å lære mer på egenhånd anbefaler vi [angular.io](http://angular.io) sine egne tutorials og spesielt denne boken [her](https://www.ng-book.com/2/).

Det kan også være verdt å ta en titt på workshopen sitt [oppsett av Webpack](https://angular.io/docs/ts/latest/guide/webpack.html). 
