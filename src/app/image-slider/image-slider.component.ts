import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [NgbCarouselModule,NgbModule,NgFor],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css'
})
export class ImageSliderComponent {
  images = [
    'https://www.boat-lifestyle.com/cdn/shop/files/RS_Banner_WEB_1_1440x.jpg?v=1706770352',
    'https://www.boat-lifestyle.com/cdn/shop/files/RS_Banner_WEB_1_1440x.jpg?v=1706770352',
    'https://www.boat-lifestyle.com/cdn/shop/files/RS_Banner_WEB_2_1440x.png?v=1707810457'
  ];
  
}
