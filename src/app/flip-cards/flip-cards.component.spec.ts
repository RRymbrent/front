import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipCardsComponent } from './flip-cards.component';

describe('FlipCardsComponent', () => {
  let component: FlipCardsComponent;
  let fixture: ComponentFixture<FlipCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlipCardsComponent]
    });
    fixture = TestBed.createComponent(FlipCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
