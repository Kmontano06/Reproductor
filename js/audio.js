var Reproductor = (function(){
	var array_song="";
	var array_size;
	var id;
	var audio;
	var list=[];
	var actual_song;
	var volumeValue = 0.5;
	var duracion;
	var button_play=document.getElementById("play");
	var button_pause=document.getElementById("pause");
	var preview_song;
	var next_song;

	function ajaxRequest(){
	var mygetrequest =new XMLHttpRequest();
	mygetrequest.onreadystatechange = function(){
	  if (mygetrequest.readyState === 4 &&  mygetrequest.status == 200){
	    var jsonObj = JSON.parse(mygetrequest.responseText);
	    var list_item = "";
	    for (var i = 0; i < jsonObj.Songs.length; i++) { 
	    	array_song=jsonObj.Songs; 
	    	array_size=jsonObj.Songs.length-1; 
				list_item += "<li class='list-song-item'><button id='play-song' class='play-song' onclick='Reproductor.playSong("+i+")'><img class='play-img' src='img/triangulo.png'/><audio id='demo"+i+"'><source src='"+jsonObj.Songs[i].url+"' type='audio/mp3'/></audio></button><h2 class='title-song title-color'>"+array_song[i].song+" - "+array_song[i].name+"</h2></li>";	    
			};
	    document.getElementById("content-list").innerHTML = list_item;
	  }
	}
	mygetrequest.open("GET", "js/songs-list.json", true);
	mygetrequest.send();
};
ajaxRequest();
  
//Funcionalidad de los botones 

	function playSong(n){ 
		actual_song = n;
		id = 'demo'+n+'';
		audio = document.getElementById(id);
		for(i=0; i < array_song.length; i++){		
			if(n==i){
				document.getElementById("song").innerHTML="<h2>"+array_song[i].song+" - "+array_song[i].name+"</h2>";
				document.getElementById("img-song").innerHTML = '<img class="img-songs-play" src="'+array_song[i].img+'">';
				document.getElementById("content-background").style.background="url("+array_song[i].img+")no-repeat";
				document.getElementById("content-background").style.backgroundSize="100% 100%";
				document.getElementById("content-background").style.opacity="0.5";
				document.getElementsByClassName("title-color")[i].style.color="#F24B51";
				button_play.style.display="none";
				button_pause.style.display="inline-block";
				starSong(i);
				audio.play();
			}else{
				document.getElementById("demo"+i).pause();
				document.getElementById('demo'+i).currentTime = 0;
				document.getElementsByClassName("title-color")[i].style.color="#fff";
			}
		}
		if(actual_song==array_size){
	  		next_song=actual_song-array_size;
	  }else{
	 			next_song=actual_song+1;
	  }
	  if(actual_song==0){
	  	preview_song=actual_song+array_size;
	  }else{
	 			preview_song=actual_song-1;
	  }
		audio.onended = function() {
		    playSong(n+1);
		};
	}

	function playAll(){
		playSong(0);
		
	}
	function play(){
		button_play.style.display="none";
		button_pause.style.display="inline-block";
		audio.play();
	}
	function pause(){
		button_play.style.display="inline-block";
		button_pause.style.display="none";
		audio.pause();
	}
	function showPreview(){
		for(i=0;i<array_song.length; i++){
			document.getElementById("content-other-song").innerHTML="<h2>"+array_song[preview_song].song+"</h2>";
		}
		document.getElementById("content-other-song").style.display="block";
	}
	function showNext(){
		for(i=0;i<array_song.length; i++){
			document.getElementById("content-other-song").innerHTML="<h2>"+array_song[next_song].song+"</h2>";
		}
		document.getElementById("content-other-song").style.display="block";
	}
	function hideOtherSong(){
		document.getElementById("content-other-song").style.display="none";
	}
	function next(){
		document.getElementById("content-other-song").style.display="none";
	  Reproductor.playSong(next_song);
	}
	function preview(){
		document.getElementById("content-other-song").style.display="none";
	  Reproductor.playSong(preview_song);
	}
	function volume(){
		var volume_input=Number(document.getElementById("volume").value);
		var volumeValue=volume_input/100;
		audio.volume = volumeValue;
	}
	function starSong(n){
	for(var i = 0; i < array_song.length; i++){
		if(n==i){
			if(array_song[i].total == 10){
				stars=5;
			}else if(array_song[i].total >= 9 && array_song[i].total < 10){
				stars=4;
			}else if(array_song[i].total >= 8 && array_song[i].total < 9){
				stars=3;
			}else if(array_song[i].total >= 7 && array_song[i].total < 8){
				stars=2;
			}else if(array_song[i].total >= 6 && array_song[i].total < 7){
				stars=1;
			}else{
				stars=0;
			}
		}
	}
	removeClass()
}
function removeClass(){
	var stars_item=document.getElementsByClassName("star-item");
		for(var m=0; m < stars_item.length;m++){
			document.getElementsByClassName("background-star")[m].className= "background-star star-bad";
		}
		addClass();
}
function addClass(){
	if(stars != 0){
		for(var j=0; j < stars;j++){
			document.getElementsByClassName("background-star")[j].className= "background-star star-good";
		}
	}
}

	return{
		playSong:playSong,
		playAll:playAll,
		play:play,
		pause:pause, 
		next:next,
		preview:preview,
		volume:volume,
		showPreview:showPreview,
		showNext:showNext,
		hideOtherSong:hideOtherSong
	}
})();
