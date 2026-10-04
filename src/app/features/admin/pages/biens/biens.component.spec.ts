import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensComponent } from './biens.component';

describe('BiensComponent', () => {
  let component: BiensComponent;
  let fixture: ComponentFixture<BiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiensComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
