import { TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CommunicationService],
      imports: [MaterialModule]
    })
  );

  it('should be created', () => {
    const service: CommunicationService = TestBed.inject(CommunicationService);
    expect(service).toBeTruthy();
  });
});
