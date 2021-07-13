var colors=["green","red","yellow","blue"];
var msCliked=[];
var level=0;
var colour=[];
var str=false;
var currentLevel=0;

$("body").keypress(function (event) {
    if(!str){
        nextSequence();
        str=true;
    }

})
$(".btn").click(function () {
    currentLevel++;
    var currentClick=$(this).attr("id");
    msCliked.push(currentClick);
    animate(currentClick);
    sound(currentClick);
    var current=msCliked.length-1;
    check(current);

})
function nextSequence(){
    msCliked=[];
    level++;
    $("h1").text("level "+level);
   var rand=Math.random() ;
   rand=Math.floor(rand*4);
   var randColor=colors[rand];
   colour.push(randColor);
   sound(randColor);
   animate(randColor);

}
function sound(colo){
    var audio=new Audio("sounds/"+colo+".mp3");
    audio.play();
}
function animate(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function () {
        $("#"+color).removeClass("pressed");
    },400);
}
function check(currentLev){
    if(msCliked[currentLev]!=colour[currentLev]){
        $("body").addClass("game-over");
        setTimeout(function () {
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").removeClass("game-over");
            $("h1").text("game over! type any key to restart");
            reset();
        },200);


    }
   else if(msCliked.length==colour.length){
        setTimeout(function () {
            nextSequence();
        },1000);
    }

}
function reset() {
    msCliked=[];
     level=0;
     colour=[];
    str=false;
    currentLevel=0;
}