app.factory('InputsFactory', function($q, $http) {
    var cacheInputs = [];

    return {
        inputs: function() {
            var deferred = $q.defer();

            if (cacheInputs.length) {
                deferred.resolve(cacheInputs);
            } else {
                $http.get('./dataInputs.json').then(function(responseData) {
                    deferred.resolve(responseData.data);
                    cacheInputs = responseData.data;
                });
            }

            return deferred.promise;
        },
        mathInputs: function() {
            var deferred = $q.defer();

            if (cacheInputs.length) {
                deferred.resolve(cacheInputs);
            } else {
                $http.get('./dataMathInputs.json').then(function(responseData) {
                    deferred.resolve(responseData.data);
                    cacheInputs = responseData.data;
                });
            }

            return deferred.promise;
        }
    };
});