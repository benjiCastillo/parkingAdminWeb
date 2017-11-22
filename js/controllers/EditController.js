app.controller('EditController', ['$scope','$location', '$routeParams', '$firebaseArray', '$firebaseObject',
function($scope, $location, $routeParams, $firebaseArray, $firebaseObject){
    $scope.formData = {};
// var ref = new Firebase(FBURLN + $routeParams.id);
// $scope.value = $firebaseObject(ref);

const rootRef = firebase.database().ref();
const ref = rootRef.child('parking');
const refChild = ref.child($routeParams.id);
$scope.value = $firebaseObject(refChild);
console.log($scope.value);


$scope.value.$loaded().then(function() {
    console.log("loaded record:", $scope.value.$id, $scope.value.someOtherKeyInData);
    var lat, lng;
   // To iterate the key/value pairs of the $scope.valueect, use angular.forEach()
   angular.forEach($scope.value, function(value, key) {
      console.log(key, value);
      if(key == 'latitude')
        lat = value;
      if(key == 'longitude')
       lng = value;  
   });
   createMap(lat,lng);
 });

function createMap(lat,long){
    var lat = $scope.value.latitude;
    var lng = $scope.value.longitude;
   
    var mapOptions = {
        center: new google.maps.LatLng(lat,lng),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    console.log(lat+ ' '+lng);
    var map = new google.maps.Map(document.getElementById("dvMapE"), mapOptions);
    var myLatLng,marker;
    function marker(lat, lng, dir){
        var myLatLng = {lat: lat, lng: lng};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: dir
          });
    }

   
    marker(lat, lng, 'Direccion Actual');

      google.maps.event.addListener(map, 'click', function (e) {
        lat = e.latLng.lat();
        lng = e.latLng.lng();
        if(lat != '' && lng != '' ){
            alert('Ubicacion Elegida corectamente');
            console.log(lat+' '+lng);
            marker(lat, lng,'Nueva Direccion');
             $scope.value.latitude = lat ;
             $scope.value.longitude = lng;
        }else{
            alert('Ocurrio un error');
        }
        
    });
}





$scope.editTaxi = function() {

    $scope.value.$save({
        name: $scope.value.name,
        address: $scope.value.address,
        spaces_quantity: $scope.value.spaces_quantity,
        latitude: parseFloat($scope.value.latitude),
        longitude: parseFloat($scope.value.longitude),
        status: $scope.value.status,
        working_hours: $scope.value.working_hours
    });
    $scope.edit_form.$setPristine();
    $scope.value = {};
    $location.path('/');
};
 
}]);

