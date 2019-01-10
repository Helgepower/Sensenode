let serialData;
var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("COM1", {
    baudrate: 9600,
    parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
console.log('Opening serialport...');
document.getElementById('console').textContent = 'Opening Serial..'
    serialPort.on('data', function(data) {
        console.log(data);
        serialData = data;
    });
});