const slugify = require ("slugify")

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/_includes/css/*.min.css");
    eleventyConfig.addPassthroughCopy("src/_includes/images");
    eleventyConfig.addPassthroughCopy("src/_includes/videos");
    eleventyConfig.addPassthroughCopy("src/_includes/js/min/*.min.js");
    eleventyConfig.addPassthroughCopy("src/utils");

    // Give shortnames to layouts
    eleventyConfig.addLayoutAlias('index', 'index.liquid');

    // eleventyConfig.addFilter("slug", function slug(str) {
    //   return slugify(str.toString(), { replacement: "-", lower: true });
    // } );
    
    eleventyConfig.setLiquidOptions({
      dynamicPartials: true
    });

    return {
      dir: {
          input: "src",
          output: "site",
          data: "_data",
          includes: "_includes",
          layouts: "_includes/layouts",
          addPassThroughCopy: true
      }
    };
  };