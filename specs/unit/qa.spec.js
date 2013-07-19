describe('qa', function() {
  var scope, ctrl;

  beforeEach(module('qa'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('qaCtrl', {$scope: scope});
  }));

  it('should have scope.runs true', function() {
    expect(scope.runs).toBe(true);
  });
});
