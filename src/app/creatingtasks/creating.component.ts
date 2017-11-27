import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component(
  {
    selector: 'app-creating-comp',
    template: `
      {{advancedTaskArray.length}}
      <div class="w3-container">
        <div>
          <select class="w3-select" [(ngModel)] = "taskMode">
            <option [ngValue]="0" [selected] = "0">basic task creator</option>
            <option [ngValue]="1">advanced task creator</option>
          </select>
        </div>
        <div *ngIf="taskMode === 0">
          <div class="w3-bar">
            <input class="w3-input w3-border w3-bar-item" type="text" style="width: 40%"
                   placeholder="Word" [(ngModel)]="word">
            <input class="w3-input w3-border w3-bar-item" type="text" style="width: 40%"
                   placeholder="Translation" [(ngModel)]="translation">
            <button class="w3-button w3-bar-item w3-teal" style="width: 8%" (click)="addWord()">Add</button>
            <button class="w3-button w3-right w3-green" style="width: 10%" (click)="submit()">Submit</button>
          </div>
          <div class="list-group">
            <ul id="grouplist" class="list-group">
            <span class="list-group-item" style="width: 80%" *ngFor="let card of basicTaskArray; let i = index">
              <div class="row">
                <div class="w3-col s6 w3-center">{{card.word}}</div>
                <div class="w3-col s6 w3-center">{{card.translation}}
                  <span class="w3-button w3-transparent w3-display-right" (click)="removeWord(i)">&times;</span></div>
              </div>
            </span>
            </ul>
          </div>
        </div>
        <div *ngIf="taskMode === 1">
          <div class="w3-bar">
            <input class="w3-input w3-border w3-bar-item" type="text" style="width: 40%"
                   placeholder="Word" [(ngModel)]="word">
            <input class="w3-input w3-border w3-bar-item" type="text" style="width: 40%"
                     placeholder="Translation" [(ngModel)]="translation">
            <input class="w3-input w3-border w3-bar-item" type="text" style="width: 40%;"
                     placeholder="Translation" [(ngModel)]="translation1">
            <input class="w3-input w3-border w3-bar-item" type="text" style="width: 40%;"
                     placeholder="Translation" [(ngModel)]="translation2">
            <input class="w3-input w3-border w3-bar-item" type="text" style="width: 40%;"
                     placeholder="Translation" [(ngModel)]="translation3">
            <button class="w3-button w3-bar-item w3-teal" style="width: 8%" (click)="addWord()">Add</button>
            <button class="w3-button w3-right w3-green" style="width: 10%" (click)="submit()">Submit</button>
          </div>
          <div class="list-group">
            <ul id="grouplist" class="list-group">
            <span class="list-group-item" style="width: 80%" *ngFor="let card of advancedTaskArray; let i = index">
              <span class="row" *ngFor="let t of card.translations; let j = index">
                <div class="w3-col s6 w3-center" *ngIf="j == 0; else elseBlock">{{card.word}}</div>
                <ng-template #elseBlock>
                  <div class="w3-col s6 w3-center">---</div></ng-template>
                <div class="w3-col s6 w3-center">{{t}}
                  <span class="w3-button w3-transparent w3-display-right" (click)="removeWord(i)">&times;</span></div>
              </span>
            </span>
            </ul>
          </div>
        </div>
      </div>
    `,
    styleUrls: ['./style.css']
  })


export class CreatingComponent {
  BASIC_TYPE = '/create/basic';
  ADVANCED_TYPE = 'CHOOSING_WITH_TRANSLATION';
  POST_URL = 'http://localhost:8080/choosing-translation/';
  taskMode: number;
  word: string = null;
  translation: string = null;
  basicTaskArray: Card[] = [];
  advancedTaskArray: CardWithTranslations[] = [];
  translation1: string = null;
  translation2: string = null;
  translation3: string = null;
  constructor(private http: HttpClient) {
  }

  addWord() {
    if (this.taskMode === 0) {
      if (this.word === null || this.translation === null) return;
      this.basicTaskArray.push(new Card(this.word, this.translation));
    }
    if (this.taskMode === 1) {
      if (this.word === null ||
          this.translation === null ||
          this.translation1 === null ||
          this.translation2 === null ||
          this.translation3 === null) return;
      this.advancedTaskArray.push(new CardWithTranslations(this.word,
                                  [this.translation, this.translation1, this.translation2, this.translation3]));
    }

    this.word = null;
    this.translation = null;
    this.translation1 = null;
    this.translation2 = null;
    this.translation3 = null;
  }

  removeWord(id: number) {
    if (this.taskMode === 0) {
      this.basicTaskArray.splice(id, 1);
    }else if (this.taskMode === 1) {
      this.advancedTaskArray.splice(id, 1);
    }
  }

  submit() {
    if (this.taskMode === 0) {
      // basic task
      const task = new BasicTask(this.basicTaskArray);
      this.http.post(this.POST_URL + this.BASIC_TYPE, task).subscribe();
      this.basicTaskArray.splice(0);
    } else if (this.taskMode === 1) {
      // advanced task
      const task = new AdvancedTask(this.advancedTaskArray);
      this.http.post(this.POST_URL + this.BASIC_TYPE, task).subscribe();
      this.advancedTaskArray.splice(0);
    }
  }
}

export class Card {
  constructor(public word: string, public translation: string) {
  }
}

export class BasicTask {
  constructor(public array: Card[]) {
  }
}

export class CardWithTranslations {
  constructor(public word: string, public translations: string[]) {
  }
}

export class AdvancedTask {
  constructor(public array: CardWithTranslations[]) {
  }
}
