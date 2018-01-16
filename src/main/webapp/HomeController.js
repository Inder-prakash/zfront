app.controller("HomeController",['$scope','$location','$window','$http',function( $scope , $location, $window , $http){

	
	$scope.getRecord = function() {
		$http({
			method:'post',
			url:BASE_URL + '/getallusers', 
			headers: {'Content-Type': 'application/json'}
			}).then(function(response){
				$scope.users = response.data;		
	        }) ;
	}
	
	$scope.clear = function(){
		 $scope.Fname="";
		 $scope.Lname="";
	}
	
	$scope.getRecord();
	$scope.users = [];
	$scope.all = false;
	$scope.modalall = false;
	
		
	$scope.del = function(id){
		var json={"id":id};
		swal({
			  title: "Are you sure?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#990000",
			  confirmButtonText: "Yes, delete it!",
			  closeOnConfirm: true
			},
			function(){
				$http({
					method:'post',
					url:BASE_URL + '/del',
					data: json,
					headers:{'Content-Type':'application/json'}
				}).then(function(response) {
					if(response.data.msg == "deleted") {
						$scope.getRecord();
					}
					else{
						swal("Failed");
					}
				});
			});
	}
	
	$scope.deleteall = function(id){
		var json={"id":id};
		swal({
			  title: "Are you sure?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#990000",
			  confirmButtonText: "Yes, delete it!",
			  closeOnConfirm: true
			},
			function(){
				$http({
					method:'post',
					url:BASE_URL + '/deleteall',
					data: json,
					headers:{'Content-Type':'application/json'}
				}).then(function(response) {
					console.log(response.data.msg);
					if(response.data.msg == "deleted") {
						$scope.getRecord();
					}
					else{
						swal("Failed");
					}
				});
			});
	}
	
	$scope.submit = function() {
		$scope.all = true;
		var json = 
			{
				'Fname': $scope.Fname,
				'Lname': $scope.Lname,
			};
		
			$http({
				method:'post',
				url:BASE_URL + '/addUser', 
				data: json, 
				headers: {'Content-Type': 'application/json'}
				}).then(function(response){
					$scope.users = response.data;
			    	if(response.data.msg == "done") {	
			    		alert('Registration sucessfully completed');	
			    		$scope.clear();
			    	}
			    	else {
			    		alert('Failed Try Again');
			    		$scope.clear();
			    	}
			    	$scope.all = false;
			    	$scope.getRecord();
		        });
			}	
	
	
	$scope.editmodal = function(id){
		
		var json={"id":id};	
		console.log(json);
		$http({
			method:'post',
			url:BASE_URL + '/getuser',
			data: json,
			headers:{'Content-Type':'application/json'}
		}).then(function(response) {
			$scope.modalId = response.data.Id;
			$scope.modalFname = response.data.Fname;
			$scope.modalLname = response.data.Lname;
		});
		
		$scope.update = function(){
			$scope.modalall = true;
			var json = {
					'Fname': $scope.modalFname,
					'Lname': $scope.modalLname,
					'Id' :   $scope.modalId
			}
			$http({
				method:'post',
				url:BASE_URL + '/UpdateUser',
				data: json,
				headers:{'Content-Type':'application/json'}
			}).then(function(response) {
				swal(response.data.msg);
				$scope.modalall = false;
				$scope.getRecord();
			});
		}
		
	}
	
	
}]);