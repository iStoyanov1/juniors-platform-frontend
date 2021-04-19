import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdministrativeInfoComponent } from './company-administrative-info.component';

describe('CompanyAdministrativeInfoComponent', () => {
  let component: CompanyAdministrativeInfoComponent;
  let fixture: ComponentFixture<CompanyAdministrativeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAdministrativeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAdministrativeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
