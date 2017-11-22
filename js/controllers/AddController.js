app.controller('AddController', ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location){
	
	const rootRef = firebase.database().ref();
	const value = $firebaseArray(rootRef);
	const ref = rootRef.child('parking');
	const values = $firebaseArray(ref);

	

	$scope.addTaxi = function() {
		if(lat === '' && lng === '' )
			alert('Elegir ubicacion en el Mapa');
		else{
			values.$add({
				name_admin: $scope.value.name_admin,
				last_name_admin: $scope.value.last_name_admin,
				email: $scope.value.email,
				name: $scope.value.name,
				address: $scope.value.address,
				spaces_quantity: $scope.value.spaces_quantity,
				latitude: parseFloat(lat),
				longitude: parseFloat(lng),
				status: $scope.value.status,
				working_hours: $scope.value.working_hours
			});
			$location.path('/');
		}	
		

	}

	var lat = '';
	var lng = '';
	var mapOptions = {
		center: new google.maps.LatLng(-19.0479427,-65.2597193),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var infoWindow = new google.maps.InfoWindow();
	var latlngbounds = new google.maps.LatLngBounds();
	var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

	function marker(lat, lng, dir){
        var myLatLng = {lat: lat, lng: lng};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: dir
          });
    }

	google.maps.event.addListener(map, 'click', function (e) {
		lat = e.latLng.lat();
		lng = e.latLng.lng();
		if(lat != '' && lng != '' ){
			alert('Ubicacion Elegida corectamente');
			marker(lat, lng,'Direccion Elegida');
		}else{
			alert('Ocurrio un error');
		}
		

	});
	
}]);


