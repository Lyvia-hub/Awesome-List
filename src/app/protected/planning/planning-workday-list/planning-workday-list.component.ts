import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs'; // create an Observable from any variable
import { delay } from 'rxjs/operators'; // delay value diffusion

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: []
})
export class PlanningWorkdayListComponent implements OnInit {

  public workdays$; // Observable workday
  public workdays;

  ngOnInit() {
    this.workdays = [
      { dueDate: 'Monday', doneTasks: 1, remainingTasks: 0 },
      { dueDate: 'Tuesday', doneTasks: 0, remainingTasks: 2 },
      { dueDate: 'Wednesday', doneTasks: 0, remainingTasks: 1 }
    ];
    this.workdays$ = of(this.workdays).pipe(delay(1000));
  }
  onWorkdayRemoved(dueDate: string) {
    this.workdays = this.workdays.filter(workday =>
      !dueDate.includes(workday.dueDate)
    );
    this.workdays$ = of(this.workdays);
  }

}
