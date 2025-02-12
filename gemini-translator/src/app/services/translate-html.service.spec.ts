import { TestBed } from '@angular/core/testing';

import { TranslateHtmlService } from './translate-html.service';

describe('TranslateHtmlService', () => {
  let service: TranslateHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateHtmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
