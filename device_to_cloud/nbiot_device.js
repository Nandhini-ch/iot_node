const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const faker = require('faker');

// Function to generate simulated sensor data
function generateSensorData() {
  return {
    temperature: faker.datatype.float({ min: -10, max: 50 }),
    humidity: faker.datatype.float({ min: 0, max: 100 }),
    status: faker.random.boolean(),
  };
}

// Function to send data via NB-IoT
function sendData(port) {
  const data = generateSensorData();
  const payload = JSON.stringify(data);

  // Prepare AT command to send data (example command, adjust as needed)
  const atCommand = `AT+SEND=${payload.length},${payload}`;

  port.write(atCommand, (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Message sent: ', data);
  });
}

// Set up the serial port connection to NB-IoT module
const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600,
});

const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Send data every 5 seconds
setInterval(() => sendData(port), 5000);

// Error handling
port.on('error', (err) => {
  console.log('Error: ', err.message);
});

// Handle incoming data (if needed)
parser.on('data', (data) => {
  console.log('Received: ', data);
});


// In a real-world NB-IoT scenario:

// Device Side: Your device would use an NB-IoT module to send data over the NB-IoT network to a gateway or server.
// Cloud Side: Your cloud server would receive this data from the network infrastructure, potentially via an IoT platform or data gateway.