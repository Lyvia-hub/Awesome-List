import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: []
})
export class WorkdayFormComponent implements OnInit {

  workdayForm: FormGroup;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit() {
    this.workdayForm = this.createWorkdayForm();
  }

  get dueDate() { return this.workdayForm.get('dueDate'); }
  get notes() { return this.workdayForm.get('notes'); }
  get tasks() { return this.workdayForm.get('tasks') as FormArray; }

  createWorkdayForm(): FormGroup {
    return this.fb.group({
      dueDate: '',
      tasks: this.fb.array([]), // FormArray instance ==> like an extensible field
      notes: '',
    });
  }

  submit(): void {
    // tslint:disable-next-line: no-console
    console.info(this.workdayForm.value);
  }

}
