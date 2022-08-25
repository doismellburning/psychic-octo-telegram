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

function connectAndSubscribeAndDoStuff(callsign, doStuff) {
	const client = mqtt.connect(HOST, options)

	client.on('connect', function () {
		console.log('Connected')
		client.subscribe(`pskr/rx/${callsign}`)
		client.subscribe(`pskr/tx/${callsign}`)
	})

	doStuff(client)

	return client
}

function updateFeedOnMessage(client) {
	client.on('message', function(topic, payload, packet) {
		var message = JSON.parse(payload.toString())
		console.log(`Message! ${message['senderCallsign']}`)
		console.log(`Payload! ${payload.toString()}`)

		if (topic.startsWith("pskr/tx")) {
			addEntry(message, document.getElementById("txFeed"))
		} else if (topic.startsWith("pskr/rx")) {
			addEntry(message, document.getElementById("rxFeed"))
		} else {
			console.log(`Wat do? Topic is ${topic}`)
		}
	})
}

function updateLastOnMessage(client) {
	client.on('message', function(topic, payload, packet) {
		var message = JSON.parse(payload.toString())
		console.log(`Message! ${message['senderCallsign']}`)
		console.log(`Payload! ${payload.toString()}`)

		var entry = makeEntry(message)
		if (topic.startsWith("pskr/tx")) {
			document.getElementById("lastTX").replaceChildren(entry)
		} else if (topic.startsWith("pskr/rx")) {
			document.getElementById("lastRX").replaceChildren(entry)
		} else {
			console.log(`Wat do? Topic is ${topic}`)
		}
	})
}

function makeEntry(message) {
	var when = new Date(message['flowStartSeconds'] * 1000)
	var entry = document.createElement("div")
	entry.innerHTML = `${when.toISOString()} : ${message['band']} - ${message['senderCallsign']} @ ${message['senderLocator']} (${message['senderCountryName']})`

	return entry
}

function addEntry(message, target) {
	var entry = makeEntry(message)

	target.insertBefore(entry, target.firstChild)
}
