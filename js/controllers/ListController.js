app.controller('ListController', ['$scope', '$firebaseArray', '$firebaseObject',function($scope, $firebaseArray, $firebaseObject){
  $scope.loaderInfo = false;

  var loadData = function(){
    const rootRef = firebase.database().ref();
    const values = rootRef.child('parking');
    $scope.values = $firebaseArray(values);
    var obj = $firebaseObject(rootRef);
    $scope.loaderInfo = true;
    obj.$loaded()
    .then(function(data){
      if(data === obj){
        $scope.loaderInfo = false;
        createMap();
      }
      //console.log(data === obj); // true
    })
    .catch(function(error){
      console.log("error : ",error);
      $scope.loaderInfo = true;
    })

    //return $scope.values;
  }
loadData();

  $scope.removeTaxi = function(id) {
    const rootRef = firebase.database().ref();
    const values = rootRef.child('parking');
    var ref = values.child(id);
    var value = $firebaseObject(ref);
    value.$remove();
   };

   var createMap = function(){
    mapOptions = {
      center: new google.maps.LatLng(-19.043265583902368,-65.25770511478186),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    };
    infoWindow = new google.maps.InfoWindow();
     latlngbounds = new google.maps.LatLngBounds();
     map = new google.maps.Map(document.getElementById("dvMapL"), mapOptions);
    
  }

  $scope.marker = function(lat, lng, dir){
    var myLatLng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: dir
      });
      console.log(lat+" "+lng+" "+dir)
  }

  
}]);

app.filter("booleanFilter", function filtroBooleanos () {
  return function (input) {
    if(input === false || input == 0){
      return "Cerrado";
    }else if(input === true || input == 1){
      return "Disponible"
    }
  }
});

app.filter("connectedFilter", function filtroConectado () {
  return function (input) {
    if(input === false || input == 0){
      return "No";
    }else if(input === true || input == 1){
      return "Si";
    }
    return "Error";
  }
})