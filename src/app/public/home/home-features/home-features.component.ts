import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'al-home-features',
  templateUrl: './home-features.component.html',
  styles: []
})
export class HomeFeaturesComponent implements OnInit {
  // initialize features
  // array containing data
  features;

  constructor() { }

  ngOnInit() {
    this.features = [
      {
        title: 'Plan your work',
        description: 'Visibility for the 7 coming days',
        icon: 'assets/img/calendar.svg'
      },
      {
        title: 'Reach objectives',
        description: 'Prioritization of tasks',
        icon: 'assets/img/award.svg'
      },
      {
        title: 'Analyse productivity',
        description: 'Visualise work done',
        icon: 'assets/img/diagram.svg'
      }
    ];
  }
}
