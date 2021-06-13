import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplicationsJobComponent } from './user-applications-job.component';

describe('UserApplicationsJobComponent', () => {
  let component: UserApplicationsJobComponent;
  let fixture: ComponentFixture<UserApplicationsJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApplicationsJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApplicationsJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
