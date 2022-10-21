import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayViewComponent } from './pay-view.component';

describe('PayViewComponent', () => {
  let component: PayViewComponent;
  let fixture: ComponentFixture<PayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
