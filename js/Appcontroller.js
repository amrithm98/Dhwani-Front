"use strict";
app.controller('AppCtrl', function ($scope, $http) {
	$scope.userList=[];
	$http.get('http://localhost:11000/allUsers').then(function(req,res){
		console.log(req);
		$scope.userList=req.data;
	});
	$scope.getEvents=function(user)
	{	
		$http.post('http://localhost:11000/getRegisteredEvents',{phone:user.phone}).then(function(req,res){
			var events="";
			for(var i=0;i<req.data.length;i++)
			{
				events+=req.data[i].name+"\n";
			}
			alert(events);
		});
	}
});