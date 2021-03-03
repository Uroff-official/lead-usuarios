var formApp = angular.module('formApp', ['ngAnimate', 'ui.router']);

formApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    // Route to show base form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })

    // Nested states
    // Url will be nested (/form/espacios)
        .state('form.contacto', {
            url: '/contacto',
            templateUrl: 'form-contacto.html'
        })

        .state('form.espacio', {
            url: '/espacio',
            templateUrl: 'form-espacio.html'
        })

    // url will be (/form/interests)
        .state('form.ubicacion', {
            url: '/ubicacion',
            templateUrl: 'form-ubicacion.html',
            controller: 'ubicacionController'
        })

        .state('form.payment', {
            url: '/payment',
            templateUrl: 'form-payment.html'
        })

        .state('form.greetings', {
            url: '/greetings',
            templateUrl: 'form-payment_backup.html'
        })

        .state('form.equipamiento', {
            url: '/equipamiento',
            templateUrl: 'form-equipamiento.html'
        });

    // Catch all route
    // Send users to form page
    $urlRouterProvider.otherwise('/form/contacto');

});

formApp.controller('formController', function ($scope, $http, $state) {

    // Store all form data in this object
    $scope.espacios = {};
    $scope.usuarios = {};
    //$scope.espacios.anfitrion = "si";
    var url = "https://docs.google.com/forms/d/e/1FAIpQLScvkELI7SCYp-arrwJgu9Y9j_2iTGShJPrFk_eB62wZfErzqA/formResponse?";
    //Function to process the form
    $scope.processForm = function () {





        if($scope.usuarios.nombre){
          url = url + "&entry.2102227671="+$scope.usuarios.nombre;
        }
        if($scope.usuarios.correo){
          url = url + "&entry.1546509052="+$scope.usuarios.correo;
        }



        if($scope.espacios.espacio1){
          //alert("si");
          url = url + "&entry.1507831082=Hot desk (Puesto de trabajo compuesto por una silla y un espacio personal en un escritorio, puede ser en un mesón compartido o individual en espacios comunes de la propiedad)";
        }
        if($scope.espacios.espacio2){
          //alert("si");
          url = url + "&entry.1507831082=Escritorio dedicado";
        }
        if($scope.espacios.espacio3){
          //alert("si");
          url = url + "&entry.1507831082=Sala de reunión";
        }
        if($scope.espacios.espacio4){
          //alert("si");
          url = url+"&entry.1507831082=Oficina privada";
        }
        if($scope.espacios.espacio5){
          //alert("si");
          url = url+"&entry.1507831082=Room office (Oficina dentro de un hotel)";
        }




        if($scope.usuarios.region){

            url = url+"&entry.243451619="+$scope.usuarios.region;
        }
        if($scope.usuarios.comuna){

            url = url+"&entry.527569424="+$scope.usuarios.comuna;
        }

        //alert(url);
        $state.go("form.greetings");
        alert('Información Enviada!');
        $http({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };


    //$http.post(url).then(function (response) {

      // This function handles success

    //}, function (response) {

      // this function handles error

    //});



});



formApp.controller('ubicacionController', function ($scope, $http, $state) {



  	var iRegion = 0;
  	var htmlRegion = '';
  	var htmlComunas = '<option value="sin-region">Seleccione comuna</option><option value="sin-region">--</option>';

  	jQuery.each(RegionesYcomunas.regiones, function () {
  		htmlRegion = htmlRegion + '<option ng-model="usuarios.region" value="' + RegionesYcomunas.regiones[iRegion].NombreRegion + '">' + RegionesYcomunas.regiones[iRegion].NombreRegion + '</option>';
  		iRegion++;
  	});

  	jQuery('#regiones').html(htmlRegion);
  	jQuery('#comunas').html(htmlComunas);

  	jQuery('#regiones').change(function () {
  		var iRegiones = 0;
  		var valorRegion = jQuery(this).val();
  		var htmlComuna = '<option ng-model="usuarios.comuna" value="sin-comuna">Seleccione comuna</option><option value="sin-comuna">--</option>';
  		jQuery.each(RegionesYcomunas.regiones, function () {
  			if (RegionesYcomunas.regiones[iRegiones].NombreRegion == valorRegion) {
  				var iComunas = 0;
  				jQuery.each(RegionesYcomunas.regiones[iRegiones].comunas, function () {
  					htmlComuna = htmlComuna + '<option ng-model="usuarios.comuna" value="' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '">' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '</option>';
  					iComunas++;
  				});
  			}
  			iRegiones++;
  		});
  		jQuery('#comunas').html(htmlComuna);
  	});
  	jQuery('#comunas').change(function () {
  		if (jQuery(this).val() == 'sin-region') {
  			alert('selecciones Región');
  		} else if (jQuery(this).val() == 'sin-comuna') {
  			alert('seleccione Comuna');
  		}
  	});
  	jQuery('#regiones').change(function () {
  		if (jQuery(this).val() == 'sin-region') {
  			alert('seleccione Región');
  		}
  	});



});
