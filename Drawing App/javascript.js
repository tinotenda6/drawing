$(function(){
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);

        }
    });
//declare variable
var paint= false;
var paint_erase="paint";
var canvas = document.getElementById("paint");
var ctx = canvas.getContext("2d");
var container=$("#container");
var mouse = {x: 0, y: 0};
var curs = "crossHair";
//onload load saved work from local localStorage


if(localStorage.getItem("imgCanvas")!=null){
     var img = new Image();
     img.onload = function(){
         ctx.drawImage(img,0,0);
     }
     img.src = localStorage.getItem("imgCanvas");
}

//set drawing parameters line width join and cap
ctx.lineWidth= 3;
ctx.lineJoin="round";
ctx.lineCap="round";

//click inside the container

container.mousedown(function(e){
    paint=true;
    ctx.beginPath();
    mouse.x= e.pageX - this.offsetLeft;
    mouse.y=e.pageY-this.offsetTop;
    ctx.moveTo(mouse.x,mouse.y);
});
//move the countainer whilst holding the key
container.mousemove(function(e){
    mouse.x= e.pageX - this.offsetLeft;
    mouse.y=e.pageY-this.offsetTop;
    if(paint==true){
        if(paint_erase == "paint"){
            //get color input
            ctx.strokeStyle = $("#paintColor").val();
        }
        else{
            //white color erasing

            ctx.strokeStyle="white";
        }
        ctx.lineTo(mouse.x,mouse.y);
        ctx.stroke();
    }
});
//mouse up stop drawiwng
container.mouseup(function(){
    paint=false;
});
//if we leave the container
container.mouseleave(function(){
    paint=false;
});

//click on the reset buttons
$("#reset").click(function(){
    ctx.clearRect(0, 0, canvas.width,canvas.height);
    paint_erase="paint";
    $("#erase").removeClass("eraseMode");
});

//clickon save button localstorage on web and session storage is stored during the session

$("#save").click(function(){
    if(typeof(localStorage) != null){
        localStorage.setItem("imgCanvas",canvas.toDataURL());

    }else{
        window.alert(localStorage.getItem("imgCanvas"));
    }

});
//if we click Erase
$("#erase").click(function(){
    if(paint_erase=="paint"){
        paint_erase="erase";
        $("#paint").css('cursor','url(eras.png),crosshair');
    }
    else{
        $("#paint").css('cursor','crosshair');
        paint_erase="paint";
    }
    $(this).toggleClass("eraseMode");
});

//if we click on download

$("#download1").click(function(){
    download();
    $(this).toggleClass("button");
});

//change color input\
$("#paintColor").change(function(){
    $("#circle").css("background-color", $(this).val());
});

//change width of linewidth slider
$("#slider").slider({
    min: 3,
    max: 30,
    slide: function(event, ui){
        $("#circle").height(ui.value);
        $("#circle").width(ui.value);
        ctx.lineWidth = ui.value;
    }
});

//download function

function download(){
    var download= document.getElementById("download");
    var image = document.getElementById("paint").toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}


});
