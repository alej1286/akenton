import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdEstadoTranslatorComponent } from './td-estado-translator.component';

describe('TdEstadoTranslatorComponent', () => {
  let component: TdEstadoTranslatorComponent;
  let fixture: ComponentFixture<TdEstadoTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdEstadoTranslatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdEstadoTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
