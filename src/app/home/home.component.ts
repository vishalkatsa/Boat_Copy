import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ShoppingCard1Component } from '../pages/shopping-card-1/shopping-card-1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageSliderComponent,ShoppingCard1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images = [
    'https://www.boat-lifestyle.com/cdn/shop/files/RS_Banner_WEB_2_1440x.png?v=1707810457',
    'https://www.boat-lifestyle.com/cdn/shop/files/Ultima_Select_Banner_WEB_1440x.jpg?v=1707460925',
    'https://www.boat-lifestyle.com/cdn/shop/files/LUNAR_Link_Banner_WEB_2_1440x.jpg?v=1707809481',
    'https://www.boat-lifestyle.com/cdn/shop/files/Ultima_Select_Banner_WEB_1440x.jpg?v=1707460925',
    'https://www.boat-lifestyle.com/cdn/shop/files/RS_Banner_WEB_1_1440x.jpg?v=1706770352'
  ];
}
