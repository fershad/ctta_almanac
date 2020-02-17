module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/_includes/css/*.min.css");
    eleventyConfig.addPassthroughCopy("src/_includes/images");
    eleventyConfig.addPassthroughCopy("src/_includes/videos");
    eleventyConfig.addPassthroughCopy("src/_includes/js/min/*.min.js");
    eleventyConfig.addPassthroughCopy("src/utils");

    // eleventyConfig.addFilter("addZone", require("./filters/zone.js") );

    return {
      dir: {
          input: "src",
          output: "site",
          data: "_data",
          includes: "_includes",
          addPassThroughCopy: true
      }
    };
  };