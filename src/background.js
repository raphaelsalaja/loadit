chrome.runtime.onInstalled.addListener(function () {
	var context_parent = {
		id: 'save_image',
		title: 'Loadit - Reddit Quick Downloader',
		contexts: ['image'],
	}

	chrome.contextMenus.create(context_parent)

	chrome.tabs.create({url: 'https://rafunderscore.vercel.app/loadit/'})
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	let image_url
	switch (info.menuItemId) {
		case 'save_image':
			if (info.srcUrl.indexOf('preview.redd.it') !== -1) {
				image_url = info.srcUrl.replace('preview.redd.it', 'i.redd.it')
			} else {
				image_url = info.srcUrl
			}
			chrome.downloads.download({
				url: image_url,
			})
			break
	}
})
