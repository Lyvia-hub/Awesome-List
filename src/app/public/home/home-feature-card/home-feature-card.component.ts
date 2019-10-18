import { Component, Input } from '@angular/core';

@Component({
  selector: 'al-home-feature-card',
  templateUrl: './home-feature-card.component.html',
  styles: []
})
export class HomeFeatureCardComponent {
  // 3 new properties
  // @Input -> définition des propriétés attendues par le composant sans les récupérer lui-même
  // Injection int he parent component
  @Input() description: string;
  @Input() icon: string;
  @Input() title: string;

  constructor() { }


}
