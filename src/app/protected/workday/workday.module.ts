import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkdayComponent } from './workday/workday.component';
import { WorkdayRoutingModule } from './workday-routing.module';
import { WorkdayFormComponent } from './workday-form/workday-form.component';
import { WorkdayFormDateComponent } from './workday-form-date/workday-form-date.component';
import { WorkdayFormTasksComponent } from './workday-form-tasks/workday-form-tasks.component';
import { WorkdayFormTasksItemComponent } from './workday-form-tasks-item/workday-form-tasks-item.component';
import { WorkdayFormTasksNotesComponent } from './workday-form-tasks-notes/workday-form-tasks-notes.component';



@NgModule({
  declarations: [WorkdayComponent, WorkdayFormComponent, WorkdayFormDateComponent, WorkdayFormTasksComponent, WorkdayFormTasksItemComponent, WorkdayFormTasksNotesComponent],
  imports: [
    SharedModule,
    WorkdayRoutingModule
  ]
})
export class WorkdayModule { }
