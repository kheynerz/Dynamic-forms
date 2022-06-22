import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTabComponent } from './code-tab.component';

describe('CodeTabComponent', () => {
  let component: CodeTabComponent;
  let fixture: ComponentFixture<CodeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
