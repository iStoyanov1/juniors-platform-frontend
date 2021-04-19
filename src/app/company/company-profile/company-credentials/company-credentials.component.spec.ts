import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCredentialsComponent } from './company-credentials.component';

describe('CompanyCredentialsComponent', () => {
  let component: CompanyCredentialsComponent;
  let fixture: ComponentFixture<CompanyCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
