const { SerialPort } = require('zigbee-herdsman/src/adapter/z-stack/serialPort');
const { ZStackAdapter } = require('zigbee-herdsman');
const express = require('express');
const app = express();
const PORT = 3000;

const coordinator = new ZStackAdapter();
const serialPort = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 }); // Adjust the serial port and baud rate as needed

async function start() {
    try {
        await coordinator.start(serialPort);
        console.log('Zigbee Coordinator started');

        // Listening for device messages
        coordinator.on('deviceMessage', (device, message) => {
            console.log('Message from device:', device.ieeeAddr, message);

            // You can further process the message here, like saving it to a database
        });

    } catch (error) {
        console.error('Error starting Zigbee Coordinator:', error);
    }
}

start();

// Start an Express server (optional, for potential future use)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
