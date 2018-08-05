var myApp = angular.module('myApp', ['LocalStorageModule'])

function MyCtrl($scope) {


	$scope.storedOutputs = JSON.parse(localStorage.getItem("outs"));
	console.log("$scope.storedOutputs ==== ", $scope.storedOutputs);

	$scope.full = [];
	$scope.output = "0";
	$scope.output1 = "0";

	$scope.inOperation = false;

	$scope.num1 = 0;

	$scope.updateOutput = function (btn) {
		if ($scope.newNumber) {
			$scope.output = 0;
		}
		if ($scope.output == "0" || $scope.newNumber) {
			$scope.output = btn;
			$scope.newNumber = false;
		} else {
			$scope.output += String(btn);
			console.log("output of updated ===== ", $scope.output);
			$scope.operation = $scope.output;
		}
	};

	$scope.operate = function (op) {
		if ($scope.output && !$scope.inOperation) {
			$scope.num1 = $scope.output;
			$scope.output += op;
			$scope.inOperation = true;
			//		console.log("output ===== ", $scope.output);
		} else if ($scope.output.length > $scope.num1.length + 1) {
			$scope.output = eval($scope.output);
			$scope.output += op;

		}
	};

	$scope.equal = function () {

		if ($scope.output.length > $scope.num1.length + 1) {

			$scope.output1 = eval($scope.output);
			$scope.num1 = $scope.output1;
			$scope.inOperation = false;
			console.log("output2 ==== ", $scope.output);
			console.log("operation ==== ", $scope.operation);
			console.log("output1 ==== ", $scope.output1);

			//STORING OF THE LOCAL DATA

			$scope.storage = [];


			$scope.outs = [];

			var str = new Date();
			var a = parseFloat(str)
			var d = new Date(a);
			var s1 = d.toLocaleDateString();
			var s2 = d.toLocaleTimeString();
			//		console.log("s1=====", s1);

			var monthNames = [
				"Jan", "Feb", "Mar",
				"Apr", "May", "June", "July",
				"Aug", "Sept", "Oct",
				"Nov", "Dec"
			];

			var day = str.getDate();
			var monthIndex = str.getMonth();
			var year = str.getFullYear();

			var date = day + ' ' + monthNames[monthIndex] + ' ' + year;

		//	console.log(date);

			var formbody5 = {

				"output": $scope.output1,
				"operation": $scope.operation,
				"date": date


			}

			$scope.full.push(formbody5);

			console.log("$scope.full==== ", $scope.full);


			//console.log("i====", i);
			localStorage.setItem("outs", JSON.stringify($scope.full));

			$scope.storedOutputs = JSON.parse(localStorage.getItem("outs"));
	//		console.log("$scope.storedOutputs ==== ", $scope.storedOutputs);




		} else {
			$scope.output1 = $scope.num1;
			$scope.inOperation = false;
		}
	};

}


myApp.controller('MyCtrl', MyCtrl);