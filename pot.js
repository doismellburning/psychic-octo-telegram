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

const HOST = "wss://mqtt.pskreporter.info:1886"

const client  = mqtt.connect(HOST, options)

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
		var message = JSON.parse(payload.toString())
		console.log(`Message! ${message['senderCallsign']}`)
		console.log(`Payload! ${payload.toString()}`)
		addEntry(message, document.getElementById("rxFeed"))
      })
    }
  })
})

function addEntry(message, target) {
	var when = new Date(message['flowStartSeconds'] * 1000)
	var entry = document.createElement("div")
	entry.innerHTML = `${when.toISOString()} : ${message['band']} - ${message['senderCallsign']} @ ${message['senderLocator']} (${message['senderCountryName']})`

	target.insertBefore(entry, target.firstChild)
}
