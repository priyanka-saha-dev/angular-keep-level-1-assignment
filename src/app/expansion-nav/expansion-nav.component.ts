import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from '../note';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-expansion-nav',
  templateUrl: './expansion-nav.component.html',
  styleUrls: ['./expansion-nav.component.css']
})
export class ExpansionNavComponent implements OnInit {

  public note: Note;
  public listOfNotes: Array<Note>;

  noteForm: FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective
  constructor(
    private noteSvc: NotesService,
    private formBuilder: FormBuilder
  ) {
    console.log('Inside Note Component constructor');
    this.note = new Note();
    this.listOfNotes = [];

    //Error Validations
    this.noteForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    })
  }

  ngOnInit() {
    console.log('Initialising Note component - ngOnInit');
    this.noteSvc.getNotes().subscribe(
      response => this.listOfNotes = response,
      err => console.log('error occured in getNotes in Svc', err)
    )
  }

  addNote(noteForm: FormGroup) {
    console.log('Adding note : ', this.note);

    this.listOfNotes.push(this.note);

    this.noteSvc.addNote(this.note).subscribe(
      response => console.log('Note added'),
      err => console.log('error occured in addNotes in Svc', err)
    );
  }
}
