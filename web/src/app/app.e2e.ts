import {browser} from "protractor";
describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'VG';
    expect(subject).toEqual(result);
  });

});
