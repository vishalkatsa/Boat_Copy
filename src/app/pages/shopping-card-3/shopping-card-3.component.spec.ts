import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCard3Component } from './shopping-card-3.component';

describe('ShoppingCard3Component', () => {
  let component: ShoppingCard3Component;
  let fixture: ComponentFixture<ShoppingCard3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCard3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingCard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
