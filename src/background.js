chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		id: 'selected_image',
		title: 'Original Format Downloader',
		contexts: ['image'],
		type: 'normal',
	})
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	let scr = info.srcUrl
	let url = info.pageUrl
	if (scr.includes('preview.redd.it')) {
		scr = scr.replace('preview.redd.it', 'i.redd.it')
	}

	chrome.downloads.download({url: scr, filename: 'image.png'})
	if (chrome.runtime.lastError) {
		console.log(chrome.runtime.lastError.message)
	} else {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				action: 'toast',
			})
		})
	}
})
