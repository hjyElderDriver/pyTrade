var w = window.innerWidth * 0.2;
var h = window.innerHeight;
var ax,bx,cx,ay,by,cy,count = 2;
var t, t2,t3;
var dx , dy, beta;
var run = false;
var carObj = function() {
        this.x = w / 4 - 25;
        this.y = h - 100;
        this.oldx = 0;
        this.oldy = 0;
        this.angle = 0;
};

var Intro = document.getElementById('intro');
var Close = document.getElementById('close');



var img = new Image();
img.src = "./src/car.png";

function lerpAngle(a, b, t) {
    var d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
}

var canvasBg = document.querySelector("#canvasBg");
var ctxBg = canvasBg.getContext("2d");
canvasBg.width = w;
canvasBg.height = h;
var drawBg = function() {
    ctxBg.save();
    ctxBg.fillStyle = "gray";
    ctxBg.fillRect(0,0,w,h);
    ctxBg.restore();
    ctxBg.beginPath();
    for(var i = 0; i < 20 ; i++) {
      (i % 2) == 0 ? ctxBg.moveTo(w / 2, i * h / 20) : ctxBg.lineTo(w / 2, i * h / 20);
    }
    ctxBg.lineWidth = 10;
    ctxBg.strokeStyle = "white";
    ctxBg.stroke();
    ctxBg.closePath();
    ctxBg.restore();
};

drawBg();
ctxBg.drawImage(img,w / 4,h - 150);


var animateBegin = function() {
    ctxBg.clearRect(0,0,w,h);
    drawBg();
    drawCar();
};

var animateStop = function() {
    Intro.className = "";
    Close.className = "";
    ctxBg.drawImage(img,w / 4,h - 150);
};


document.querySelector("#road").addEventListener("click", function() {
    if (run == false) {
        animateBegin();
        run = true;
    }
});

canvasBg.addEventListener("click", function() {
    if (run == false) {
        animateBegin();
        run = true;
    }
});


Close.addEventListener("click",function() {
    if (run == true) {
        animateStop();
        run = false;
    }
});



var drawCar = function() {
    var MyComponent = React.createClass({
        componentDidMount: function() {
            var canvas = this.refs.canvas;
            var ctx = canvas.getContext('2d');
            //(w/4,h-150) (0,305) (w * 1.5, 5) (w/2,-50)      
            var car = new carObj();
            var stop1 = setInterval(function() {
                cx = 3 * (25 - w/4);
                bx = 3 * w * 1.3 - cx;
                ax = w/4 - cx - bx;
                cy = 3 * (455 - h);
                by = 3 * (-300) - cy;
                ay = 100 - h - by - cy;
                count ++;
                t = count/200;
                t2 = t * t;
                t3 = t2 * t;
                car.oldx = car.x;
                car.oldy = car.y;
                car.x = ax * t3 + bx * t2 + cx * t + (w / 4 -25);
                car.y = ay * t3 + by * t2 + cy * t + (h - 150);
                dx = car.x - car.oldx;
                dy = car.y - car.oldy;
                beta = Math.atan2(dy,dx) +  Math.PI / 2;
                car.angle = lerpAngle(beta,car.angle,0.6);
                ctx.save();
                ctx.clearRect(0,0,w,h);
                ctx.translate(car.x + 25,car.y + img.height);
                ctx.rotate(car.angle);
                ctx.drawImage(img,-25,-img.height);
                ctx.restore();
                if (count == 200 ) {
                    count = 2;
                    clearInterval(stop1);
                    Intro.className = "intro";
                    Close.className = "close";
                    ctx.clearRect(0,0,w,h);
                }
            },20);
        },
        render: function() {
            return (
                <div>
                    <canvas ref = "canvas" id = "canvas" width = {w} height = {h}></canvas>
                </div>
            );
        }
    });

    ReactDOM.render(
        <MyComponent />,
        document.getElementById('road')
    );
}
