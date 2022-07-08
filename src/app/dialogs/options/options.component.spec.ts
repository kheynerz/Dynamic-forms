import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsDialog } from './options.component';

describe('OptionsDialog', () => {
  let component: OptionsDialog;
  let fixture: ComponentFixture<OptionsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
