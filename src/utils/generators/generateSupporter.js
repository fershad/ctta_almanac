const images = require('./generateImages')

function generateSupporter (data) {
    return {
      ...data,
      eventCount: data.events.length,
      '75x': images(data.image).width(75).height(75).auto("format").url(),
      '150x': images(data.image).width(150).height(150).auto("format").url(),
      '300x': images(data.image).width(300).height(300).auto("format").url(),
      '600x': images(data.image).width(600).height(600).auto("format").url()
    }
  }

  module.exports = generateSupporter