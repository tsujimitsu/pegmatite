/* global chrome */

// Saves options to chrome.storage
function save_options() {
	var baseUrl = document.getElementById("base_url").value;
	var basicAuth = document.getElementById("basic_auth").value;
	chrome.storage.local.set(
		{
			baseUrl: baseUrl,
			basicAuth: basicAuth
		},
		function() {
			// Update status to let user know options were saved.
			var status = document.getElementById("status");
			status.textContent = "Options saved.";
			setTimeout(function() {
				status.textContent = "";
			}, 750);
		}
	);
}

// Restores component state using the preferences stored in chrome.storage.
function restore_options() {
	chrome.storage.local.get(
		{
			baseUrl: "https://www.plantuml.com/plantuml/img/"
		},
		function(items) {
			document.getElementById("base_url").value = items.baseUrl;
		}
	);
	chrome.storage.local.get(
		{
			basicAuth: ""
		},
		function(items) {
			document.getElementById("basic_auth").value = items.basicAuth;
		}
	);
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
