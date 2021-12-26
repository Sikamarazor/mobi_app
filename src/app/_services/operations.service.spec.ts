import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OperationsService } from './operations.service';

describe('OperationsService', () => {
  let service: OperationsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [OperationsService]
    });
    service = TestBed.inject(OperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return value', () => {
    service.getListOfSeasons().subscribe(value => {
      expect(value).toBe('observable value');
    });
  });
  it('should return value', () => {
    service.getRaceWinner("2021", "1").subscribe(value => {
      expect(value).toBe('observable value');
    });
  });
  it('should return value', () => {
    service.getSeasonWinner("2021").subscribe(value => {
      expect(value).toBe('observable value');
    });
  });
  it('should return value', () => {
    service.getRaceRounds("2021").subscribe(value => {
      expect(value).toBe('observable value');
    });
  });
});