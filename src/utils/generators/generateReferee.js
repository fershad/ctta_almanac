const countMatches = require('./countMatches')
const images = require('./generateImages')

function generateReferee (data) {
    return {
      ...data,
      matchCount: countMatches(data.matches),
      '150x': images(data.image).width(150).height(150).auto("format").url(),
      '300x': images(data.image).width(300).height(300).auto("format").url(),
      '600x': images(data.image).width(600).height(600).auto("format").url()
    }
  }

  module.exports = generateReferee