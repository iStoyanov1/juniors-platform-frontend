import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileContactsComponent } from './company-profile-contacts.component';

describe('CompanyProfileContactsComponent', () => {
  let component: CompanyProfileContactsComponent;
  let fixture: ComponentFixture<CompanyProfileContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyProfileContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfileContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
