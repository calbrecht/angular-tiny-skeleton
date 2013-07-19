describe('qa', function() {
  beforeEach(function() {
    browser().navigateTo('qa.html');
  });

  it('should load qa.js and have scope.runs true', function() {
    expect(element('body').attr('data-runs')).toBe("true");
  });
});
