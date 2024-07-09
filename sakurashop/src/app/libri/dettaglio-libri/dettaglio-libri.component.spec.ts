import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioLibriComponent } from './dettaglio-libri.component';

describe('DettaglioLibriComponent', () => {
  let component: DettaglioLibriComponent;
  let fixture: ComponentFixture<DettaglioLibriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DettaglioLibriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DettaglioLibriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
