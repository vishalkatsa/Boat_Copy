import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCard1Component } from './shopping-card-1.component';

describe('ShoppingCard1Component', () => {
  let component: ShoppingCard1Component;
  let fixture: ComponentFixture<ShoppingCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCard1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
