import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TDTipoBolsaTranslatorComponent } from './td-tipo-bolsa-translator.component';

describe('TDTipoBolsaTranslatorComponent', () => {
  let component: TDTipoBolsaTranslatorComponent;
  let fixture: ComponentFixture<TDTipoBolsaTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TDTipoBolsaTranslatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TDTipoBolsaTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
