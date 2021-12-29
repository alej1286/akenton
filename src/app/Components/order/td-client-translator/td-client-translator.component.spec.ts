import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdClientTranslatorComponent } from './td-client-translator.component';

describe('TdClientTranslatorComponent', () => {
  let component: TdClientTranslatorComponent;
  let fixture: ComponentFixture<TdClientTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdClientTranslatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdClientTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
