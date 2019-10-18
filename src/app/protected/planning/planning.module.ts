import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanningComponent } from './planning/planning.component';

import { PlanningWorkdayItemComponent } from './planning-workday-item/planning-workday-item.component';
import { PlanningWorkdayListComponent } from './planning-workday-list/planning-workday-list.component';

import { PlanningRoutingModule } from './planning-routing.module';

@NgModule({
  declarations: [PlanningComponent, PlanningWorkdayItemComponent, PlanningWorkdayListComponent],
  imports: [
    SharedModule,
    PlanningRoutingModule
  ]
})
export class PlanningModule { }
