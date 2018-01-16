app.controller("EditController",['$scope','$routeParams','$location','$window','$http',function( $scope ,$routeParams , $location, $window , $http){
	
	var json={"token":$routeParams.id};	
	console.log(json);
	$http({
		method:'post',
		url:BASE_URL + '/getuser',
		data: json,
		headers:{'Content-Type':'application/json'}
	}).then(function(response) {
		console.log(response.data.Fname);
		$scope.Id = response.data.Id;
		$scope.Fname = response.data.Fname;
		$scope.Lname = response.data.Lname;
	});
	
	$scope.update = function(){
		var json = {
				'Fname': $scope.Fname,
				'Lname': $scope.Lname,
				'Id' :   $scope.Id
		}
		$http({
			method:'post',
			url:BASE_URL + '/UpdateUser',
			data: json,
			headers:{'Content-Type':'application/json'}
		}).then(function(response) {
			swal(response.data.msg);
			$window.location.href = "#!/";
		});
	}
}]);
