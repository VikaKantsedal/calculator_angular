app.controller('mathCtrl', function($scope, InputsFactory) {

	$scope.InputsFactory = InputsFactory;

	$scope.mathInputs = [
		{
			value: 'sin'
		},
		{
			value: 'cos'
		},
		{
			value: '1/x'
		},
		{
			value: 'x2'
		}
	];

	function getValue(event) {
		var elem = event.target;
		var value = elem.getAttribute("value");
		return value;

	}

	$scope.math = function(){
		if(getValue(event) == "sin") {
			InputsFactory.rowValue = (Math.sin(InputsFactory.rowValue)).toString();
		} else if(getValue(event) == "cos") {
			InputsFactory.rowValue = (Math.cos(InputsFactory.rowValue)).toString();
		} else if(getValue(event) == "x2") {
			InputsFactory.rowValue = (InputsFactory.rowValue * InputsFactory.rowValue).toString();
		} else if(getValue(event) == "1/x" && InputsFactory.rowValue !== 0) {
			InputsFactory.rowValue = (1 / InputsFactory.rowValue).toString();
		} else {
			return "Cannot divide by zero";
		}
	};

	InputsFactory.show = false;

});