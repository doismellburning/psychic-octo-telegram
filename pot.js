//const mqtt = require('mqtt')

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  //clientId: 'mqtt.pskreporter.info',
  //username: 'emqx_test',
  //password: 'emqx_test',
}

const HOST = "ws://mqtt.pskreporter.info:81"

const client  = mqtt.connect(HOST, options)

const outputLog = document.getElementById("outputLog")

client.on('connect', function () {
  console.log('Connected')

  client.subscribe('pskr/rx/2E0KGG', function (err) {
  //client.subscribe('pskr/firehose', function (err) {
    if (err) {
      alert(err)
      return
    } else {
      console.log("Subscribed!")
      client.on('message', function(topic, payload, packet) {
        console.log(`Topic: ${topic}, Message: ${payload.toString()}, Packet: ${packet}`)
		var message = JSON.parse(payload.toString())
        var entry = document.createElement("div")
        entry.innerHTML = `${message['senderCallsign']} @ ${message['senderLocator']} (${message['senderCountryName']})`
        outputLog.appendChild(entry)
      })
    }
  })
})
