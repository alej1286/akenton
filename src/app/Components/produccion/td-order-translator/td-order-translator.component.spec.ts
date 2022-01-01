import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdOrderTranslatorComponent } from './td-order-translator.component';

describe('TdOrderTranslatorComponent', () => {
  let component: TdOrderTranslatorComponent;
  let fixture: ComponentFixture<TdOrderTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdOrderTranslatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdOrderTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
