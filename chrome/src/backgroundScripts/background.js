import {
	FEATURE_REMOVER_CONTENT_SCRIPT,
	SIDEBAR_CONTENT_SCRIPT
} from '../constants'

import {
	REMOVE_MODAL
} from "../messages";

console.log("running background script")

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
	chrome.tabs.executeScript(details.tabId, {
		file: FEATURE_REMOVER_CONTENT_SCRIPT
	})
})

chrome.contextMenus.create({
	"id": "feature_remover",
	"title": "Hide this feature",
	"contexts": ["all"]
})

chrome.browserAction.onClicked.addListener(function(details) { 
	chrome.tabs.executeScript(details.tabId, {
		file: SIDEBAR_CONTENT_SCRIPT
	})
});


chrome.contextMenus.onClicked.addListener(function (data, tab) {
	if (data.menuItemId === "feature_remover") {
		chrome.tabs.sendMessage(tab.id, {
			action: REMOVE_MODAL
		}, response => {
			const error = chrome.runtime.lastError;
			if (error) reject(error)
			resolve(response)
		})
	}
})