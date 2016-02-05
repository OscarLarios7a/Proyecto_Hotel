var pos=0;
var intv;
var flippedElement;
var opcionesHoteles=[
					{opciones:[{opcion:'Cuarto Individual'},{opcion:'Alberca Privada'},{opcion:'Jacuzzi con Burbujas'}],costo:'550',paquete:'Paquete Medio'},
					{opciones:[{opcion:'Cuarto Individual'},{opcion:'Alberca Privada'},{opcion:'Jacuzzi de Oro'}],costo:'750',paquete:'Paquete Premium'},
					{opciones:[{opcion:'Cuarto Individual'},{opcion:'Alberca Privada'},{opcion:'Jacuzzi'}],costo:'350',paquete:'Paquete Economico'}];
$(document).on('ready',function(){
	init();
});
$(window).on('resize',init);
window.addEventListener('orientationchange',init);

function init(){
	if($('html')>900)
	{
		$.stellar({
			
					'horizontalScrolling': false,
					hideDistantElements:false
				});	
	}
var sc=$.scrollorama({blocks:'.fullScreen',enablePin:false});
sc.animate('.mensajePrincipal',{
	delay:700,
	duration:350,
	property:'top',
	end:500});
sc.animate('.mensajePrincipal',{
	delay:700,
	duration:200,
	property:'opacity',
	end:0
});
sc.animate('.precio',{
	delay:400,
	duration:200,
	property:'zoom',
	start:0,
	end:1
});
sc.animate('.centerCircle',{
	delay:300,
	duration:300,
	property:'opacity',
	start:0,
	end:1
});
sc.animate('#google_canvas',{
	delay:400,
	duration:200,
	property:'opacity', 
	start:0,
	end:1
});
/*sc.animate('.',{
	delay:400,
	duration:200,
	property:'zoom',
	start:0,
	end:1
});*/

	/*$.stellar({
		'horizontalScrolling':false,
		hideDistantElements:false
	});*/
	$('#navegacionPrincipal').localScroll();
	$('.slider_controls li').on('click',handleClick);
	 var width=$('.slider_container').width();
	$('.slide').each(function(i,e){
		addBackground(e,width,true);
	});
	$('.image_food').on('click',changeViewport);
	$('.image_food').each(function(i,e){
		addBackground(e,false);
		if ($(e).hasClass('viewport')) return true;
		$(e).data('top',((i)*100));
		$(e).css({
			'top':$(e).data('top')+'px'
		});
	});
	//clearInterval(intv); ---  a trabajar

	$(document).on('click','.ver-mas',flipElement);

	intv=setInterval(handleClick,10000);
}
function addBackground(element,width,setSize){
	if (!width)	width = $('html').width();
	if(setSize){
		$(element).css({
			'width':width,
			'heigth':$('html').height()
		});
	}

	//var imagen=$(element).data('background');
	//$(element).css('background-image',"url("+(imagen+".jpg")+")");
	/*en esta parte sera para que tome en cuenta
	la resolucion de la pantalla*/
	var imagen=$(element).data('background');
	if($('html')<900) imagen= imagen+'-movil.jpg';
	else imagen=imagen+'.jpg';
	$(element).css('background-image',"url("+(imagen)+")");
	if ($(element).height() > $(element).width())  $(element).css('background-size',"auto 100%"); 

}
function changeViewport(){
	var e=$('.viewport');
	e.css('top',$(e).data('top'));
	e.removeClass('viewport');
	$(this).addClass('viewport');
	$(this).css('top',0);
}
function flipElement(){
	if (flippedElement !=null) {
		$(flippedElement).revertFlip();
		flippedElement=null;
	}
	$(flippedElement).remove();


	var padre=$(this).parent();
	flippedElement=padre;
	$('#precioTemplate').template("CompiledTemplate");
	$(padre).flip({
		direction:'rl',
		speed:500,
		content:$('#precioTemplate').tmpl(opcionesHoteles[$(this).data('number')]).html(),
		color:'#f7f7f7',
		onEnd:function(){
			$('#regresar-ventana').on('click',function(){
				$(flippedElement).revertFlip();
				flippedElement=null;
			});
		}
	});
}


google.maps.event.addDomListener(window,'load',drawMap);
function drawMap(){
	var mapa;
	var opcionesMapa = {
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	mapa = new google.maps.Map(document.getElementById('google_canvas'),opcionesMapa);
	navigator.geolocation.getCurrentPosition(function(posicion){
		var geolocalizacion = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
		var marcador= new google.maps.Marker({
			map:mapa,
			draggable:false,
			position:geolocalizacion,
			visible:true
		});
		mapa.setCenter(geolocalizacion); 
		calcRoute(geolocalizacion,mapa);
	});


}
/*function calcRoute(iniciaRuta,mapa){
	var directionsService=new google.maps.DirectionsService();
	var directionsRenderer=new	google.maps.DirectionsRenderer();
	directionsRenderer.setMap(mapa);
	var posicionLocal=new google.maps.LatLng(17.071859,-96.71658);
	var marcador= new google.maps.Marker({
			map:mapa,
			draggable:false,
			position:posicionLocal,
			visible:true
		});
	var request={
		origin:iniciaRuta,
		destination:posicionLocal,
		travelMode:google.maps.DirectionsTravelMode.DRIVING
	}
	directionsService.route(request,function(response,status){
		if (status==google.maps.DirectionsStatus.OK){
			DirectionsRenderer.setDirections(response);
		}
	});
}*/
function calcRoute(inicioRuta,mapa){
	var directionsService = new google.maps.DirectionsService();
	var directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(mapa);
	var posicionHotel1=new google.maps.LatLng(16.98889,-96.713489);
	var posicionHotel2=new google.maps.LatLng(13.98889,-75.713489);
	//var posicionHotel = new google.maps.LatLng(17.071859,-96.71658);
	var marcador = new google.maps.Marker({
		map: mapa,
		draggable: false,
		position:posicionHotel1,
		visible: true
	});
	var marcador2=new google.maps.Marker({
		map: mapa,
		draggable: false,
		position:posicionHotel2,
		visible: true
	});
	var request = {
		origin: inicioRuta,
		destination: posicionHotel1,destination:posicionHotel2,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	}
	directionsService.route(request,function(response, status){
		if(status == google.maps.DirectionsStatus.OK){
			directionsRenderer.setDirections(response);
		}
	});
}
function handleClick(){
	var slider_target=0;
	if($(this).parent().hasClass('slider_controls')){
		slider_target=$(this).index();
		pos=slider_target;
		clearInterval(intv);
		intv=setInterval(handleClick,10);
		/*alert(slider_target);*/
	}
	else{
		pos++;
		if(pos>=$('.slide').length){
			pos=0;
		}
		slider_target=pos;
	}
	/*La manipulacion de las imagenes es de izquierda a derecha
	$('.slideContainer').animate({
			'margin-left':-(slider_target * $('.slider_container').width())+'px'
		},'slow');*/
	/*La manipulacion de las imagenes es de derecha a izquierda*/
	/*$('.slideContainer').fadeOut('slow',function(){
		$(this).animate({
			'margin-left':-(slider_target * $('.slider_container').width())+'px'
		},'slow',function(){
			$(this).fadeIn();
		});
	});*/
/*La manipulacion de las imagenes es de derecha a izquierda*/
	$('.slideContainer').slideUp('slow',function(){
		$(this).animate({
			'margin-left':-(slider_target * $('.slider_container').width())+'px'
		},'slow',function(){
			$(this).slideDown();
		});
	});
}

