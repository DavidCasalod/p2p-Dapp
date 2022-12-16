 import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfContractsComponent } from './list-of-contracts.component';

describe('ListOfContractsComponent', () => {
  let component: ListOfContractsComponent;
  let fixture: ComponentFixture<ListOfContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
