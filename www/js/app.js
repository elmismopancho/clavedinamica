angular.module('ClaveDinamica', ['ionic'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('login', {
		url: '/login',
			views: {
			'main': {
				templateUrl: 'templates/login.html'
			}
		}
	})

	.state('home', {
		url: '/home',
			views: {
			'main': {
				templateUrl: 'templates/home.html'
			}
		}
	})

	$urlRouterProvider.otherwise('/login');
})

.controller('LoginCtrl', function($state, $scope, $ionicHistory) {
	var ctrl = this;
	this.password = "";

	$scope.$parent.$on('$ionicView.beforeEnter', function() {
		ctrl.password = "";
	});

	$scope.$parent.$on('$ionicView.afterEnter', function() {
		$ionicHistory.clearHistory();
	});

	this.onIngresar = function() {
		var now = new Date();
		/********************************
		 * #1: Acá inventar un password
		 ********************************/
		if (this.password == "MI_PASSWORD") {
			$state.go('home');
		}
	};
})
.controller('HomeCtrl', function($scope, $timeout, $ionicHistory, $state) {

	this.c = ["", "", ""];
	this.r = ["", "", ""];

	$scope.$parent.$on('$ionicView.afterEnter', function() {
		$timeout(function(){
			$ionicHistory.goBack();
		}, 5*60*1000);
	});

	/****************************************************
	 * #2: Acá copiar los valores de la tarjeta dinámica
	 ****************************************************/
	this.card = {
		A: ["", "", "", "", ""],
		B: ["", "", "", "", ""],
		C: ["", "", "", "", ""],
		D: ["", "", "", "", ""],
		E: ["", "", "", "", ""],
		F: ["", "", "", "", ""],
		G: ["", "", "", "", ""],
		H: ["", "", "", "", ""],
		I: ["", "", "", "", ""],
		J: ["", "", "", "", ""]
	}

	this.onCalcular = function() {
		for (var idx = 0; idx <= 2; idx++) {
			var key = this.c[idx];
			if (key.length != 2) {
				continue;
			}
			var letter = key.charAt(0).toUpperCase();
			if (typeof this.card[letter] === "undefined") {
				continue;
			}

			var number = key.charAt(1) - 1;
			if (typeof this.card[letter][number] === "undefined") {
				continue;
			}

			this.r[idx] = this.card[letter][number];
		}
	};

})
