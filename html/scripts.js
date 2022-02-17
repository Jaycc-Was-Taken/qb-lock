let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;
let degrees = 0;
let new_degrees = 0;
let time = 0;
let color = "#830011";
let txtcolor = "#ffffff";
let bgcolor = "#000000";
let bgcolor2 = "#ffffff";
let bgcolor3 = "#ffffff";
let key_to_press;
let g_start, g_end;
let animation_loop;
let paused = false; //Pause Function

let needed = 4;
let streak = 0;


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function init() {
    // Clear the canvas every time a chart is drawn
    ctx.clearRect(0,0,W,H);

    // Background 360 degree arc
    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.lineWidth = 20;
    ctx.arc(W / 2, H / 2, 100, 0, Math.PI * 2, false);
    ctx.stroke();

    // Green zone
    ctx.beginPath();
    ctx.strokeStyle = correct === true? bgcolor3 : bgcolor2;
    ctx.lineWidth = 20;
    ctx.arc(W / 2, H / 2, 100, g_start - 90 * Math.PI / 180, g_end - 90 * Math.PI / 180, false);
    ctx.stroke();

    // Angle in radians = angle in degrees * PI / 180
    let radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 40;
    ctx.arc(W / 2, H / 2, 90, radians - 0.1 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
    ctx.stroke();
// alterar para 2 se n der o 0.01
    // Adding the key_to_press
    ctx.fillStyle = txtcolor;
    ctx.font = "100px sans-serif";
    let text_width = ctx.measureText(key_to_press).width;
    ctx.fillText(key_to_press, W / 2 - text_width / 2, H / 2 + 35);
}

function draw(time) {
    if (typeof animation_loop !== undefined) clearInterval(animation_loop);

    g_start = getRandomInt(15,19) / 9; //Not 100% sure exactly what all these numbers are, but I did a LOT of testing with just random numbers to get it where it is now
    g_end = 1.5 / 5;
    g_end = g_start + g_end;

    degrees = 0;
    new_degrees = 300; //It stops before the full circle just because it will never actually have a spot be that far away, every spot is in the same area in the circle

    key_to_press = ''+getRandomInt(1,4);

    time = time;

    animation_loop = setInterval(animate_to, time);
}

function animate_to() {
    if(paused){return;}
    if (degrees >= new_degrees) {
        wrong();
        return;
    }

    degrees+=2;
    init();
}

function correct(){
    streak += 1;
    if (streak == needed) {
        pause(250);
        clearInterval(animation_loop)
        endGame(true)
    }else{
        pause(400);
        time = (time-1); //Increases the speed by 1 second on each successful skill check
        draw(time);
    };
}

function wrong(){
    pause(250)
    clearInterval(animation_loop);
    endGame(false);
}

document.addEventListener("keydown", function(ev) {
    let key_pressed = ev.key;
    let valid_keys = ['1','2','3','4'];
    if( valid_keys.includes(key_pressed) ){
        if( key_pressed === key_to_press ){
            let d_start = (180 / Math.PI) * (g_start - 0.05); //Small amount of padding added
            let d_end = (180 / Math.PI) * (g_end + 0.05);
            if( degrees < d_start ){
                wrong();
            }else if( degrees > d_end ){
                wrong();
            }else{
                correct();
            }
        }else{
            wrong();
        }
    }
});

function startGame(time){
    $('#canvas').show();
    draw(time);      
  }
  
  function endGame(status){
    $('#canvas').hide();
    var xhr = new XMLHttpRequest();
    let u = "fail";
        if(status)
            u = "success";
    xhr.open("POST", `http://qb-lock/${u}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({}));
    streak = 0;
    needed = 4;
  }
  
  window.addEventListener("message", (event) => {
    if(event.data.action == "start"){
        if(event.data.value != null ){
            needed = event.data.value
        }else{
            needed = 4
        }
        if(event.data.time != null ){
            time = event.data.time
        }else{
            time = 2
        }
		console.log(event.data.time)
      startGame(time)
    }
  })
//I found the following after a few hours searching about pause and wait functions in javascript, I'll try to find the link, but it was on stackoverflow somewhere.
function pause(time){
    paused = true;
    wait(time)
    paused = false;
    }
function wait(ms){
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
    }
