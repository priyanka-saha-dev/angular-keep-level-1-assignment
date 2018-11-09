import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;

  public note: Note;
  public listOfNotes: Array<Note>;


  constructor(private noteSvc: NotesService) {
    this.note = new Note();
    this.listOfNotes = [];
  }
  // onError(msg : string) {
  //   console.log('Recieved msg : ', msg);
  //   this.errMessage = msg;
  // }

  ngOnInit() {
    console.log('Initialising Note component - ngOnInit');

    this.noteSvc.getNotes().subscribe(
      resp => this.listOfNotes = resp,
      err => {
        console.log('error occured in Note Svc GET.', err.message);
        this.errMessage = err.message;
      }
    );
  }

  addNote() {
    console.log('Adding note : ', this.note);
    console.log('title : ', this.note.title);
    console.log('text : ', this.note.text);

    this.listOfNotes.push(this.note);

    if (!this.note.title || !this.note.text) {
      this.errMessage = 'Title and Text both are required fields';
    }
    this.noteSvc.addNote(this.note).subscribe(
      response => console.log('Note added', response),
      err => {
        console.log('error occured in addNotes in Svc', err);
        this.errMessage = err.message;
      }
    );
  }
}
