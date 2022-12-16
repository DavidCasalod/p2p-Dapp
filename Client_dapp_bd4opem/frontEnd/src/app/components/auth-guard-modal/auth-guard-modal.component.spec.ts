import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuardModalComponent } from './auth-guard-modal.component';

describe('AuthGuardModalComponent', () => {
  let component: AuthGuardModalComponent;
  let fixture: ComponentFixture<AuthGuardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthGuardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGuardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
