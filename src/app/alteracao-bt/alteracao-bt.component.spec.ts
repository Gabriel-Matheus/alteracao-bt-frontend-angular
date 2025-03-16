import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoBtComponent } from './alteracao-bt.component';

describe('AlteracaoBtComponent', () => {
  let component: AlteracaoBtComponent;
  let fixture: ComponentFixture<AlteracaoBtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlteracaoBtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlteracaoBtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
