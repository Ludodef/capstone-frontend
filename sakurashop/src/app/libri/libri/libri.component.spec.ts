import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibriComponent } from './libri.component';

describe('LibriComponent', () => {
  let component: LibriComponent;
  let fixture: ComponentFixture<LibriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
