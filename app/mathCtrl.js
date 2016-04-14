app.controller('mathCtrl', function($scope, RowValueFactory, InputsFactory) {

	$scope.RowValueFactory = RowValueFactory;

	InputsFactory.mathInputs().then(function(data) {
		$scope.mathInputs = data;
	});

	function getValue(event) {
		var elem = event.target;
		var value = elem.getAttribute("value");
		return value;
	}

	$scope.math = function(){
		if(getValue(event) == "sin") {
			RowValueFactory.rowValue = (Math.sin(RowValueFactory.rowValue)).toString();
		} else if(getValue(event) == "cos") {
			RowValueFactory.rowValue = (Math.cos(RowValueFactory.rowValue)).toString();
		} else if(getValue(event) == "x2") {
			RowValueFactory.rowValue = (RowValueFactory.rowValue * RowValueFactory.rowValue).toString();
		} else if(getValue(event) == "1/x" && RowValueFactory.rowValue !== 0) {
			RowValueFactory.rowValue = (1 / RowValueFactory.rowValue).toString();
		} else {
			return "Cannot divide by zero";
		}
	};

	RowValueFactory.show = false;
});