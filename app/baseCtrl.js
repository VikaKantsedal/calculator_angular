app.controller('baseCtrl', function($scope, InputsFactory) {

	$scope.InputsFactory = InputsFactory;

	$scope.field = document.getElementById("field");

	$scope.inputs = [
			{
				value: 'back'
			},
			{
				value: 'sqrt'
			},
			{
				value: '7'
			},
			{
				value: '8'
			},
			{
				value: '9'
			},
			{
				value: '+'
			},
			{
				value: '4'
			},
			{
				value: '5'
			},
			{
				value: '6'
			},
			{
				value: '-'
			},
			{
				value: '1'
			},
			{
				value: '2'
			},
			{
				value: '3'
			},
			{
				value: '*'
			},
			{
				value: '0'
			},
			{
				value: '.'
			},
			{
				value: '='
			},
			{
				value: '/'
			}
		];


	$scope.calc = (function() {

		return {
			add: function (a, b) {
				a = +a;
				b = +b;
				return(a + b);
			},

			sub: function (a, b) {
				return(a - b);
			},

			multy: function (a, b) {
				return(a * b);
			},

			div: function (a, b) {
				if (b != 0) {
					return(a / b);
				} else {
					return "Cannot divide by zero";
				}
			}
		}
	})();


	$scope.simpleCalc = function(str){
		while (str.indexOf("+") != -1 || str.indexOf("-", 1) != -1 || str.indexOf("*") != -1 ||str.indexOf("/") != -1) {

			for(var i = 1; i < str.length; i++) {

				if(str[i] === "+" || str[i] === "-" || str[i] === "*" ||str[i] === "/") {
					var oper = str[i];
					var operInd = i;
					break;
				}
			}

			var num1 = "";
			for (i = 0; i < operInd; i++) {
				num1 = num1 + str[i];
			}

			var num2 = "";
			for (i = operInd + 1; i < str.length; i++) {
				if(str[i] != "+" && str[i] != "-" && str[i] != "*" && str[i] != "/") {
					num2 = num2 + str[i];
				} else break;
			}

			str = str.slice(i , str.length);

			if(oper == "+") {
				str = $scope.calc.add(num1,num2) + str;
			} else if (oper == "-") {
				str = $scope.calc.sub(num1,num2) + str;
			} else if(oper == "*") {
				str = $scope.calc.multy(num1,num2) + str;
			} else if(oper == "/") {
				str = $scope.calc.div(num1,num2) + str;
			}
		}
		return str;
	};

	$scope.isErrorMessage = function(str) {
		return str.search(/\+|\-|\*|\/|\d/g) === -1
	};

	$scope.hasOperator = function(str) {
		return str.search(/\+|\-|\*|\//g) != -1
	};

	$scope.operators = ["*", "/", "+", "-"];


	$scope.calculate = function(inputValue) {

		if ($scope.isErrorMessage(InputsFactory.rowValue)) {
			InputsFactory.rowValue = "";
		}

		if ($scope.operators.indexOf(inputValue) !== -1) {

			if ($scope.hasOperator(InputsFactory.rowValue)) {

				if ($scope.operators.indexOf(InputsFactory.rowValue[InputsFactory.rowValue.length - 1]) !== -1) {
					InputsFactory.rowValue = InputsFactory.rowValue.slice(0, length -1) + inputValue;
				} else {
					InputsFactory.rowValue = $scope.simpleCalc(InputsFactory.rowValue) + inputValue;
				}
			} else if (InputsFactory.rowValue.length != 0 || inputValue === "-") {
				InputsFactory.rowValue += inputValue;
			} else {
				InputsFactory.rowValue = "";
			}
		} else if(inputValue === "=") {

			InputsFactory.rowValue = $scope.simpleCalc(InputsFactory.rowValue);
		} else if(inputValue === "sqrt") {

			var calcValue = $scope.simpleCalc(InputsFactory.rowValue);
			InputsFactory.rowValue = Math.sqrt(calcValue).toString();

			if (calcValue[0] === "-") {
				InputsFactory.rowValue = "Square of a negative number";
			} else {
				InputsFactory.rowValue = Math.sqrt(calcValue).toString();
			}
		} else if(inputValue === "back") {
			InputsFactory.rowValue = InputsFactory.rowValue.slice(0, length -1);
		} else {
			InputsFactory.rowValue += inputValue;
		}
	};

	$scope.clear = function() {
		InputsFactory.rowValue = "";
	};

	$scope.changeShow = function() {
		InputsFactory.show = !InputsFactory.show;
	}

});