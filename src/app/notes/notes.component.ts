import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editing = false;
  creating = false;
  formSubmitted = false;
  nextID: number = 4;

  model:any = {}
  notes = [
    {id: 1, date: '2021-11-23', weight: 240, bloodPressure: '130/73', exercise: 'Walked 1 mile', symptoms: 'Very slight head pressure'},
    {id: 2, date: '2021-11-24', weight: 240, bloodPressure: '135/73', exercise: 'Chest workout with resistance bands', symptoms: 'No head pressure at all'},
    {id: 3, date: '2021-11-25', weight: 239, bloodPressure: '125/70', exercise: 'Back workout with resistance bands', symptoms: 'Slightly noticeable head pressure'}
  ]

  
  editNote(note: any) {
    //Update this.editing
    this.editing = true;
    //Set model equal to note that is being updated
    this.model = {...note};
  }

  createNote() {
    //Create note object
    const note = {
      id: this.nextID,
      ...this.model
    }

    //Update nextID variable
    this.nextID++;

    //Add new note to notes array
    this.notes.push(note);
  }

  resetForm(form: any) {
    //Reset model
    this.model = {};

    //Update editing and creating flags to false 
    this.editing = false;
    this.creating = false;

    //Update formSubmitted variable 
    this.formSubmitted = false;

    //Reset form validations
    form.markAsPristine();
    form.markAsUntouched();
  }

  submitForm(form: any) {
    //Set form submitted variable to true
    this.formSubmitted = true;

    //Check if form is valid
    if (form.valid) {
      if (this.editing) {
        //Get note to update
        const note: any = this.notes.find(n => n.id === this.model.id);
   
        //Update note 
        note.date = this.model.date;
        note.weight = this.model.weight;
        note.bloodPressure = this.model.bloodPressure;
        note.exercise = this.model.exercise;
        note.symptoms = this.model.symptoms
      } else {
        //Create note
        this.createNote();
      }

      //Reset form 
      this.resetForm(form.form);
    }
   
  }
}
