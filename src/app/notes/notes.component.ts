import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public note: Note;
  public listOfNotes: Array<Note>;
  public noteForm: FormGroup;

  // @Input('errMessage') errMessage: string;
  @Output() msg = new EventEmitter<string>();

  @ViewChild(FormGroupDirective) formDir: FormGroupDirective;
  constructor(private noteSvc: NotesService, private fromBuilder: FormBuilder) {
    this.note = new Note();
    this.listOfNotes = [];

    this.noteForm = fromBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      text: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });

  }

  ngOnInit() {
    console.log('Initialising Note component - ngOnInit');

    this.noteSvc.getNotes().subscribe(
      resp => this.listOfNotes = resp,
      err => {
        console.log('error occured in Note Svc GET.', err.message);
        this.msg.emit(err.message);
      }
    );
  }

  addNote(noteForm: FormGroup) {
    console.log('Adding note : ', this.note);
    this.note = noteForm.value;
    this.listOfNotes.push(this.note);

    this.noteSvc.addNote(this.note).subscribe(
      response => {
        console.log('Note added');
      },
      err => {
        console.log('error occured in addNotes in Svc', err);
        this.msg.emit(err.message);
      }
    );
  }
}
