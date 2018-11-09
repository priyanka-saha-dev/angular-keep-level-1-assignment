import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  errMessage: string;

  onError(msg : string) {
    console.log('Recieved msg : ', msg);
    this.errMessage = msg;
  }
}
