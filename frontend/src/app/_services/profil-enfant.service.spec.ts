import { TestBed } from '@angular/core/testing';

import { ProfilEnfantService } from './profil-enfant.service';

describe('ProfilEnfantService', () => {
  let service: ProfilEnfantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilEnfantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
