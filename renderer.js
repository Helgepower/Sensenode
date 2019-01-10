
//const net = require('./Objects/brain')

//let inputVal = { black: 1 }
//let OutputVal = { r: 0.03, g: 0.7, b: 0.5 }

//net.feedbrain(inputVal,OutputVal)
//net.run(OutputVal)

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const myParser = new Readline({delimiter: '\n'});

const createTable = require('data-table')
var WebCamera = require("webcamjs");

var incommingData = new Buffer(0);

var WebCamera = require("webcamjs");
var CamEnabled = false;
		
var savedOffset = 0;
var saveOffset = false;
let unit = " mm";

let $ = require('./Assets/jquery-3.3.1.min.js')
var G = require('./Assets/gauge.min.js');

let gauge = new G.LinearGauge({
        renderTo: 'boogieWoogie',
        width: 300,
        height: 200,
        units: unit,
        title: "OFFSET",
        minValue: -10,
        maxValue: 10,
        majorTicks: [
            -10,
            -8,
            -6,
            -4,
            -2,
            0,
            2,
            4,
            6,
            8,
            10
        ],
        minorTicks: 5,
        strokeTicks: true,
        ticksWidth: 15,
        ticksWidthMinor: 7.5,
        highlights: [
            {
                "from": -10,
                "to": 0,
                "color": "rgba(255,0, 0, .3)"
            },
            {
                "from": 0,
                "to": 10,
                "color": "rgba(0, 255, 0, .3)"
            }
        ],
        colorMajorTicks: "#FFFFFF",
        colorMinorTicks: "#FFFFFF",
        colorTitle: "#eee",
        colorUnits: "#ccc",
        colorNumbers: "#eee",
        colorPlate: "#000000",
        colorPlateEnd: "#000000",
        borderShadowWidth: 0,
        borders: false,
        borderRadius: 10,
        needleType: "arrow",
        needleWidth: 3,
        animationDuration: 200,
        animationRule: "linear",
        colorNeedle: "#000000",
        colorNeedleEnd: "#000000",
        colorBarProgress: "#ffffff",
        colorBar: "#ffffff",
        barStroke: 0,
        barWidth: 14,
        barBeginCircle: false
    }).draw();
    
setInterval(function() {
        //getData();
        msgUser(Date());
    }, 10000);

if(CamEnabled){ // Start the camera !
    WebCamera.set({width: 800, height: 600})
    WebCamera.attach('#videoElement');
    msgUser("The camera has been started");
}else { // Disable the camera !
    WebCamera.reset();
    msgUser("The camera has been disabled");
}		

SerialPort.list((err, ports) => {
    console.log('ports', ports);
    if (err) {
        msgUser(err.message);
      return
    } else {
    }
    if (ports.length === 0) {
        msgUser('No COM ports discovered.');
    }else{
      var select = document.getElementById('ports')
      for(let i = 0; i<ports.length;i++){
            var options = document.createElement('option')
            options.text += ports[i].comName;
            select.add(options);
      }
    }
});

/*
var comPort = new SerialPort('COM5', {
    baudRate: 115200
});
*/

function msgUser(data){
    document.getElementById('output').textContent = data.toString();
    console.log(data.toString());
}

function sensorData(untouched){
    let splitted = untouched.split(" ");
    distance = splitted[1];
    document.getElementById("distanceVal").innerHTML = distance + unit;
    if(saveOffset){
        savedOffset = Number(distance);
        saveOffset = false;
    }
    if(savedOffset!=0 && saveOffset==false){
        let currOffs = Number(distance) - savedOffset
        document.getElementById("offsetVal").innerHTML = currOffs + unit;
        if(currOffs >= 10){
            gauge.value = 10;
        }else if(currOffs <= -10){
            gauge.value = -10;
        }else{
            gauge.value = currOffs;
        }
    }
}

function saveOffs() {
    saveOffset = true;
    msgUser("Saving " + distance + unit + " length as offset");
}

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 32) {
        saveOffs();
    }
});

document.getElementById("boogieWoogie").addEventListener("click", function(event){
    saveOffs();
});

//comPort.on('open', () => msgUser("Opened Serialport.")).then();
//comPort.pipe(myParser) 
//comPort.on('close', () => msgUser("Closed Serialport."));
//comPort.on('data', data => postData(data));//ab2str(data) + "RAW:" + data.toString()
//comPort.pipe(myParser);
//myParser.on('data', line => sensorData(line));
console.log("OK")