import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavouriteJobsComponent } from './user-favourite-jobs.component';

describe('UserFavouriteJobsComponent', () => {
  let component: UserFavouriteJobsComponent;
  let fixture: ComponentFixture<UserFavouriteJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavouriteJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavouriteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
