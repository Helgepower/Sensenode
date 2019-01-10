'use strict'
//BRAINJS INTERFACE

const brain = require('brainjs')
var net = new brain.NeuralNetwork()

let brainEncoder = {
    async feedbrain(inputVals,outputVals){
        try {
            let response = await net.train([{input: inputVals, output: outputVals}])
        } catch(e) {
            console.log(e);
        }
    },
    async run(runVal){
        try {
            let response = await console.log(net.run([runVal]));
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = brainEncoder