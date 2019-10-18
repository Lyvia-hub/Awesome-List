import { Component, EventEmitter, Input, Output, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: []
})
export class PlanningWorkdayItemComponent implements OnChanges {

  @Input() dueDate: string;
  @Input() doneTasks: number | string;
  @Input() remainingTasks: number | string;
  @Output() workdayRemoved = new EventEmitter<string>();

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // tslint:disable-next-line: forin
    for (const propName in changes) {
      this.update(propName, changes[propName].currentValue);
    }
  }

  update(propName, propValue) {

    switch (propName) {
      case 'dueDate': {
        if ('Monday' === propValue) { this.dueDate += ' (Today)'; }
        break;
      }
      case 'doneTasks': {
        if (0 === propValue) { this.doneTasks = 'No task done.'; }
        break;
      }
      case 'remainingTasks': {
        if (0 === propValue) { this.remainingTasks = 'Workday over !'; }
        break;
      }
      default: {
        break;
      }
    }
  }

  removeWorkday(dueDate: string) {
    this.workdayRemoved.emit(dueDate);
  }
}
