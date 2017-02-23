var app = angular.module("login", ["ngRoute", "ngDraggable"])
    .config(function ($routeProvider) {
        $routeProvider
          .when("/", {
              templateUrl: "login.html",
              controller: "loginctrl"
          })

         .when("/second", {
             resolve: {
                 "check": function ($location, $rootScope) {
                     if ($rootScope.loggedIn) {
                         $location.path("/second");
                     }
                 }
             },
             templateUrl: "second.html",
			  controller: "loginctrl"
           
         })
        
        .otherwise({
            redirectTo: "/login"
        })



    })
       .controller("loginctrl", function ( $scope,$location, $rootScope, $http, $timeout) {
           $scope.submit = function(){
			   
			   $http({
				   method: 'GET',
				   url: 'login.json'
			   }).then(function (response) 
			{
				var e1=response.data.login[0].email;
				var p1=response.data.login[0].password;
				var e2=response.data.login[1].email;
				var p2=response.data.login[1].password;
				
				if ($scope.username == e1 && $scope.password == p1) {
                   $rootScope.loggedIn = true;
				   localStorage.email = e1;
				   localStorage.password=p1;
                   $location.path("/second");
               }
			    else if ($scope.username ==e2 && $scope.password == p2) {
                   $rootScope.loggedIn = true;
				   localStorage.email = e2;
				   localStorage.password=p2;
                   $location.path("/second");
               }
			   

               
			   else{
                   alert("wrong");
               }
			});
				
      
			
           }
		   
		   //draggable
		$scope.activeElement;
var containerOfActiveElement;
var activeHTMLElement;
var getCenterOfELement = function (htmlElement) {
  var rect = htmlElement.getBoundingClientRect(); 
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  }
};
$scope.onElementClick = function(event, data, container) {
  if (!angular.equals(data, $scope.activeElement)) {
    event.stopPropagation(); // you need this for not firing event on container
    $scope.activeElement = data;
    containerOfActiveElement = container;
    activeHTMLElement = event.target;
  } else 
    $scope.activeElement = null;
};
$scope.onTargetClick = function(container, event) {
  if ($scope.activeElement) {
    var activeCenter = getCenterOfELement(activeHTMLElement);
    var targetCenter = getCenterOfELement(event.target);
    var offsetX = targetCenter.x - activeCenter.x;
    var offsetY = targetCenter.y - activeCenter.y;
    activeHTMLElement.style.transform= 'translate('+offsetX+'px,'+offsetY+'px)';
    $timeout(function() {
        container.push($scope.activeElement);
        var index = containerOfActiveElement.indexOf($scope.activeElement);
        containerOfActiveElement.splice(index, 1);
        $scope.activeElement = null;
        containerOfActiveElement = null; 
        activeHTMLElement = null;
    }, 200);
  }
};
  
$scope.centerAnchor = true;
$scope.toggleCenterAnchor = function () {
    $scope.centerAnchor = !$scope.centerAnchor
};

/* can be removed, since it has no effect:
var onDraggableEvent = function (evt, data) {
    console.log("128", "onDraggableEvent", evt, data);
};
$scope.$on('draggable:start', onDraggableEvent);
$scope.$on('draggable:end', onDraggableEvent);
*/
  
$scope.droppedObjects0 = [{name:'SMS'},{name:'ALERT'},{name:'CALL'}];
$scope.droppedObjects1 = []; //Answer: Cat + Rabbit
$scope.droppedObjects2 = []; //Answer: Chicken + Goose
$scope.droppedObjects3 = []; //Answer: Chicken + Goose


$scope.AnswerOject1 = [{name:'Arnab'},{name:'Kucing'}];
$scope.AnswerOject2 = [{name:'Angsa'},{name:'Ayam'}];

$scope.onDropComplete0 = function (data, evt) {
    console.log("127", "$scope", "onDropComplete0", data, evt);
    var index = $scope.droppedObjects0.indexOf(data);
    if (index == -1 && data !== null) // gave unwanted result if data was null (new empty object)
        $scope.droppedObjects0.push(data);
};
$scope.onDragSuccess0 = function (data, evt) {
    console.log("133", "$scope", "onDragSuccess0", "", evt);
    var index = $scope.droppedObjects0.indexOf(data);
    if (index > -1 && data) {
        $scope.droppedObjects0.splice(index, 1);
    }
};
$scope.onDropComplete1 = function (data, evt) {
    console.log("127", "$scope", "onDropComplete1", data, evt);
    var index = $scope.droppedObjects0.indexOf(data);
    if (index == -1 && data !== null)
        $scope.droppedObjects1.push(data);
};

$scope.onDragSuccess1 = function (data, evt) {
    console.log("133", "$scope", "onDragSuccess1", "", evt);
    var index = $scope.droppedObjects1.indexOf(data);
    if (index > -1) {
        $scope.droppedObjects1.splice(index, 1);
    }
};

$scope.onDropComplete2 = function (data, evt) {
    var index = $scope.droppedObjects2.indexOf(data);
    if (index == -1 && data !== null) {
        $scope.droppedObjects2.push(data);
    }
};

$scope.onDragSuccess2 = function (data, evt) {
    var index = $scope.droppedObjects2.indexOf(data);
    if (index > -1) {
        $scope.droppedObjects2.splice(index, 1);
    }
};

$scope.onDropComplete3 = function (data, evt) {
    var index = $scope.droppedObjects3.indexOf(data);
    if (index == -1 && data !== null) {
        $scope.droppedObjects3.push(data);
    }
};

$scope.onDragSuccess3 = function (data, evt) {
    var index = $scope.droppedObjects3.indexOf(data);
    if (index > -1) {
        $scope.droppedObjects3.splice(index, 1);
    }
};

var inArray = function (array, obj) {
    var index = array.indexOf(obj);
};







$scope.logResults = function() {
     console.log({
        'div1': $scope.droppedObjects0,
        'div2': $scope.droppedObjects1,
        'div3': $scope.droppedObjects2,
        'div4': $scope.droppedObjects3
     });
}

// function items(div1,div2,div3,div4){
	// localStorage.setItem("div1",JSON.stringify(droppedObjects0));//event,data,ya container
	// localStorage.setItem("div2",JSON.stringify(droppedObjects1));
	// localStorage.setItem("div3",JSON.stringify(droppedObjects2));
	// localStorage.setItem("div4",JSON.stringify(droppedObjects3));


// var div1=[];
// var div2=[];
// var div3=[];
// var div4=[];


// var div1=localStorage.getItem("div1");
// div1 = JSON.parse(div1);


// var div2=localStorage.getItem("div2");
// div2 = JSON.parse(div2);


// var div3=localStorage.getItem("div3");
// div3 = JSON.parse(div3);


// var div4=localStorage.getItem("div4");
// div4 = JSON.parse(div4);



// for (var i=0;i<localStorage.length;i++){
	
	// console.log(localStorage.key(i))
// };

// }


function items(data,evt){
	localStorage.setItem("evt",JSON.stringify(droppedObjects0));//event,data,ya container
	localStorage.setItem("data",JSON.stringify(droppedObjects1));
	localStorage.setItem("data",JSON.stringify(droppedObjects2));
	localStorage.setItem("data",JSON.stringify(droppedObjects3));


var evt=[droppedObjects0];
var data=[droppedObjects0];
var data=[];
var data=[];


var data=localStorage.getItem("data");
data = JSON.parse(data);


var data=localStorage.getItem("data");
data = JSON.parse(data);


var data=localStorage.getItem("data");
data = JSON.parse(data);


var data=localStorage.getItem("data");
data = JSON.parse(data);



for (var i=0;i<localStorage.length;i++){
	
	console.log(localStorage.key(i))
};

}

});