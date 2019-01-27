/* global chrome */
/* global Uint8Array */

function fechImageDataUri(uri, callback) {
	fetchImage(uri, function() {
		var contentType = this.getResponseHeader("Content-Type");
		var unicode = toUnicodeString(this.response);
		var base64 = encodeBase64(unicode);
		var dataUri = "data:" + contentType + ";base64," + base64;
		callback(dataUri);
	});
}

function fetchImage(uri, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.responseType = "arraybuffer";
	xhr.onload = callback;
	chrome.storage.local.get("basicAuth", function(config) {
		if (config.basicAuth !== "") {
			xhr.withCredentials = true;
			xhr.setRequestHeader("Authorization", "Basic " + config.basicAuth);
		}
		xhr.send();
	});
}

function toUnicodeString(arrayBuffer) {
	var bytes = new Uint8Array(arrayBuffer);
	var binaryString = "";
	for (var i = 0; i < bytes.byteLength; i++) {
		binaryString += String.fromCharCode(bytes[i]);
	}
	return binaryString;
}

function encodeBase64(string) {
	return window.btoa(string);
}

function onMessage(message, sender, callback) {
	if (message.action == "plantuml") {
		fechImageDataUri(message.url, callback);
	}
	return true;
}

chrome.runtime.onMessage.addListener(onMessage);
