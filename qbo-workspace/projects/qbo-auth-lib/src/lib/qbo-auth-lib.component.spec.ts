import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QboAuthComponent } from './qbo-auth-lib.component';

describe('QboAuthLibComponent', () => {
  let component: QboAuthComponent;
  let fixture: ComponentFixture<QboAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QboAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QboAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
