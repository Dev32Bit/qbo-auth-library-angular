import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QboAuthLibComponent } from './qbo-auth-lib.component';

describe('QboAuthLibComponent', () => {
  let component: QboAuthLibComponent;
  let fixture: ComponentFixture<QboAuthLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QboAuthLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QboAuthLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
