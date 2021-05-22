import parsePeriod from '../src/parsePeriod';

const OriginalDate = Date;

const toTimestamp = (date: Date) => {
  return date.getTime();
}

describe('parsePeriod testing', () => {
  beforeAll(() => {
    // @ts-ignore
    global.Date = class extends Date {
      constructor() {
        super();
        return new OriginalDate('2021-05-21T00:00:00');
      }
    }
  });

  afterAll(() => {
    global.Date = OriginalDate;
  });

  it('1d - one entry', () => {
    const t = toTimestamp(new OriginalDate('2021-05-22T00:00:00'))
    expect(toTimestamp(parsePeriod('1d'))).toBe(t);
  });

  it('1d 5h - two entries', () => {
    const t = toTimestamp(new OriginalDate('2021-05-22T05:00:00'))
    expect(toTimestamp(parsePeriod('1d 5h'))).toBe(t);
  });

  it('1w = 7d days', () => {
    expect(toTimestamp(parsePeriod('1w'))).toBe(toTimestamp(parsePeriod('7d')));
  });

  it('1d 1d - sum up the same', () => {
    const t = toTimestamp(new OriginalDate('2021-05-23T00:00:00'))
    expect(toTimestamp(parsePeriod('1d 1d'))).toBe(t);
  });

  it('1d 4e - ignore unknown', () => {
    const t = toTimestamp(new OriginalDate('2021-05-22T00:00:00'))
    expect(toTimestamp(parsePeriod('1d 4e'))).toBe(t);
  });

  it('438 95hj gq3 gwj43 45v v - unable to parse', () => {
    const t = toTimestamp(new OriginalDate('2021-05-21T00:00:00'))
    expect(toTimestamp(parsePeriod('438 95hj gq3 gwj43 45v v'))).toBe(t);
  });
});