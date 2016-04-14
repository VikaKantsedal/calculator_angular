app.controller('baseCtrl', function ($scope, RowValueFactory, InputsFactory) {

    InputsFactory.inputs().then(function(data) {
        $scope.inputs = data;
    });

    $scope.RowValueFactory = RowValueFactory;

    $scope.field = document.getElementById("field");

    $scope.calc = (function () {
        return {
            add: function (a, b) {
                a = +a;
                b = +b;
                return (a + b);
            },

            sub: function (a, b) {
                return (a - b);
            },

            multy: function (a, b) {
                return (a * b);
            },

            div: function (a, b) {
                if (b != 0) {
                    return (a / b);
                } else {
                    return "Cannot divide by zero";
                }
            }
        }
    })();

    $scope.simpleCalc = function (str) {
        while (str.indexOf("+") != -1 || str.indexOf("-", 1) != -1 || str.indexOf("*") != -1 || str.indexOf("/") != -1) {

            for (var i = 1; i < str.length; i++) {

                if (str[i] === "+" || str[i] === "-" || str[i] === "*" || str[i] === "/") {
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
                if (str[i] != "+" && str[i] != "-" && str[i] != "*" && str[i] != "/") {
                    num2 = num2 + str[i];
                } else break;
            }

            str = str.slice(i, str.length);

            if (oper == "+") {
                str = $scope.calc.add(num1, num2) + str;
            } else if (oper == "-") {
                str = $scope.calc.sub(num1, num2) + str;
            } else if (oper == "*") {
                str = $scope.calc.multy(num1, num2) + str;
            } else if (oper == "/") {
                str = $scope.calc.div(num1, num2) + str;
            }
        }
        return str;
    };

    $scope.isErrorMessage = function (str) {
        return str.search(/\+|\-|\*|\/|\d/g) === -1
    };

    $scope.hasOperator = function (str) {
        return str.search(/\+|\-|\*|\//g) != -1
    };

    $scope.operators = ["*", "/", "+", "-"];

    $scope.calculate = function (inputValue) {

        if ($scope.isErrorMessage(RowValueFactory.rowValue)) {
            RowValueFactory.rowValue = "";
        }

        if ($scope.operators.indexOf(inputValue) !== -1) {

            if ($scope.hasOperator(RowValueFactory.rowValue)) {

                if ($scope.operators.indexOf(RowValueFactory.rowValue[RowValueFactory.rowValue.length - 1]) !== -1) {
                    RowValueFactory.rowValue = RowValueFactory.rowValue.slice(0, length - 1) + inputValue;
                } else {
                    RowValueFactory.rowValue = $scope.simpleCalc(RowValueFactory.rowValue) + inputValue;
                }
            } else if (RowValueFactory.rowValue.length != 0 || inputValue === "-") {
                RowValueFactory.rowValue += inputValue;
            } else {
                RowValueFactory.rowValue = "";
            }
        } else if (inputValue === "=") {

            RowValueFactory.rowValue = $scope.simpleCalc(RowValueFactory.rowValue);
        } else if (inputValue === "sqrt") {

            var calcValue = $scope.simpleCalc(RowValueFactory.rowValue);
            RowValueFactory.rowValue = Math.sqrt(calcValue).toString();

            if (calcValue[0] === "-") {
                RowValueFactory.rowValue = "Square of a negative number";
            } else {
                RowValueFactory.rowValue = Math.sqrt(calcValue).toString();
            }
        } else if (inputValue === "back") {
            RowValueFactory.rowValue = RowValueFactory.rowValue.slice(0, length - 1);
        } else {
            RowValueFactory.rowValue += inputValue;
        }
    };

    $scope.clear = function () {
        RowValueFactory.rowValue = "";
    };

    $scope.changeShow = function () {
        RowValueFactory.show = !RowValueFactory.show;
    }
});