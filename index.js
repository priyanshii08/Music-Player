

//define variable
let audio,playbtn,title,poster,artist,mutebtn,seekslider,volumeslider,seeking=false,seekto,
curtimetext,durtimetext,playlist_status,dir,playlist,exe,agent,playlist_artist,repeat,randomSong;

//initialize array
dir="music/";
playlist=["Cartoon-On-&-On","Elektronomia","Johnning","Popsicle","Fearless"];
title=["Cartoon-On-&-On","Elektronomia","Janji-Heroes Tonight","Popsicle","Lost Sky-Fearless"];
artist=["(feat.Daniel Levi) [NCS Release]","Elektronomia-Sky High [NCS Release]",
          "(feat.Johnning) [NCS Release]","LFZ-[NCS Release]","(feat. Chris Linton) [NCS Release]"];
poster=["images/ncs1.jpeg","images/ncs2.jpg","images/ncs3.jpg","images/ncs4.jpg","images/ncs5.jpg"];

//used to run on every platform
exe=".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf("firefox")!= -1||agent.indexOf("opera")!=  -1){
exe=".ogg";
}

//set object refrence
playbtn=document.querySelector(".playpausebtn");
nextbtn=document.querySelector(".nextbtn");
prevbtn=document.querySelector(".prevbtn");
mutebtn=document.querySelector(".mutebtn");
seekslider=document.querySelector(".seekslider");
volumeslider=document.querySelector(".volumeslider");
curtimetext=document.querySelector(".curtimetext");
durtimetext=document.querySelector(".durtimetext");
playlist_status=document.querySelector(".playlist_status");
playlist_artist=document.querySelector(".playlist_artist");
repeat=document.querySelector(".repeat");
randomSong=document.querySelector(".random");

playlist_index=0;

//Audio object
audio=new Audio();
audio.src=dir+playlist[0]+exe;
audio.loop =false;

//first song title and Artists
playlist_status.innerHTML=title[playlist_index];
playlist_artist.innerHTML=artist[playlist_index];

//add event handling
playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown",function(event){
  seeking=true;seek(event);
});
seekslider.addEventListener("mousemove",function(event){
  seek(event);
});
seekslider.addEventListener("mouseup",function(){seeking=false;});
volumeslider.addEventListener("mousemove",setvolume);
audio.addEventListener("timeupdate",function(){seektimeupdate();});
audio.addEventListener("ended",function(){switchTrack();});
repeat.addEventListener("click",loop);
randomSong.addEventListener("click",random);

//functions
function fetchMusic(){
  $(".playpausebtn img").attr("src","images/pause-red.png");
  $(".bgImage").attr("src",poster[playlist_index]);
  $(".images").attr("src",poster[playlist_index]);

  playlist_status.innerHTML=title[playlist_index];
  playlist_artist.innerHTML=artist[playlist_index];

  //Audio
  audio.src=dir+playlist[playlist_index]+exe;
  audio.play();

}


function playPause(){
  if(audio.paused){
    audio.play();
    $(".playpausebtn img").attr("src","images/pause-red.png");
  }
  else{
    audio.pause();
    $(".playpausebtn img").attr("src","images/play-red.png");
  }
}

function nextSong(){
  playlist_index++;
  if (playlist_index>playlist.length-1) {
    playlist_index=0;
  }
  fetchMusic();
}
function prevSong(){
  playlist_index--;
  if (playlist_index<0) {
    playlist_index=playlist.length-1;
  }
  fetchMusic();
}
function mute(){
  if (audio.muted) {
    audio.muted=false;
    $(".mutebtn img").attr("scr","images/speaker.png");}
    else{
      audio.muted=true;
      $(".mutebtn img").attr("src","images/mute.png");
    }
    fetchMusic()

}
function seek(event){
  if(audio.duration==0){
    null
  }
  else{
    if(seeking){
      seekslider.value = event.clientX-seekslider.offsetLeft;
      seekto = audio.duration*(seekslider.value/100);
      audio.currentTime = seekto;
    }
  }
}

function setvolume(){
  audio.volume=volumeslider.value/100;
}

function seektimeupdate(){
  if(audio.duration){
  let nt=audio.currentTime * (100/audio.duration);
  seekslider.value=nt;
  var curmins=Math.floor(audio.currentTime/60);
  var cursecs=Math.floor(audio.currentTime - curmins * 60);
  var durmins=Math.floor(audio.duration/60);
  var dursecs=Math.floor(audio.duration- durmins*60);
  if (cursecs<10) {cursecs="0"+cursecs}
  if (dursecs<10) {dursecs="0"+dursecs}
  if(curmins<10){curmins="0"+curmins}
  if (dursecs<10) {dursecs="0"+dursecs}
curtimetext.innerHTML=curmins+":"+cursecs;
durtimetext.innerHTML=durmins+":"+dursecs;

  }
  else {
    curtimetext.innerHTML="00"+":"+"00";
    durtimetext.innerHTML="00"+":"+"00";

  }
}

function switchTrack(){
  if(playlist_index==(playlist.length-1)){
    playlist_index=0;
  }else {
    playlist_index++;
  }
  fetchMusic();
}
function loop(){
  if (audio.loop) {
    audio.loop=false;
    $(".repeat img").attr("src","images/rep.png");
  }
  else{
    audio.loop=true;
    $(".repeat img").attr("src","images/rep1.png");
  }
}
function getRandmon(min,max){
  let step1=max-min+1;
  let step2=Math.random()*step1;
  let result=Math.floor(step2)+min;
  return result;

}
function random(){
  let randomIndex=getRandmon(0,playlist.length-1);
  playlist_index=randomIndex;
  fetchMusic();
}
