import {
	RUNTIME_CLASSIFIER_ID,
	SERVER_CLASSIFIER_ID,
	FEATURE_REMOVER_ID
} from '../constants'

import {
	HOST_UPDATE,
	REMOVE_MODAL
} from "../messages";

import {
	restartPoller
} from './poller'

restartPoller()

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
	if (/^https:/.test(details.url)) {
		// chrome.tabs.executeScript(details.tabId, {
		// 	file: CLASSIFIER_ID
		// })
		

		chrome.tabs.executeScript(details.tabId, {
			file: SERVER_CLASSIFIER_ID
		})

		chrome.tabs.executeScript(details.tabId, {
			file: FEATURE_REMOVER_ID
		})
	}
})

chrome.contextMenus.create({
	"id": "feature_remover",
	"title": "Hide this feature",
	"contexts": ["all"]
})

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

chrome.extension.onMessage.addListener((msg, sender, response) => {
	if (msg.action === HOST_UPDATE) restartPoller()
})