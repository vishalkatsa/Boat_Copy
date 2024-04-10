import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCard2Component } from './shopping-card-2.component';

describe('ShoppingCard2Component', () => {
  let component: ShoppingCard2Component;
  let fixture: ComponentFixture<ShoppingCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCard2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
