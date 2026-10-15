const slugify = require("slugify");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/_includes/scss/*.min.css": "assets",
  });
  eleventyConfig.addPassthroughCopy("src/_includes/images");
  eleventyConfig.addPassthroughCopy("src/_includes/videos");
  eleventyConfig.addPassthroughCopy("src/_includes/js/min/*.min.js");
  eleventyConfig.addPassthroughCopy("src/utils");
  eleventyConfig.addPassthroughCopy("netlify.toml");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Give shortnames to layouts
  eleventyConfig.addLayoutAlias("index", "index.liquid");

  // eleventyConfig.addFilter("slug", function slug(str) {
  //   return slugify(str.toString(), { replacement: "-", lower: true });
  // } );

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  eleventyConfig.addFilter(
    "sortByGameDateDesc",
    function sortByGameDateDesc(items = []) {
      const getGameDate = (item) => item?.data?.gameDate ?? item?.gameDate;

      return [...items].sort((a, b) => {
        const aTime = Date.parse(getGameDate(a));
        const bTime = Date.parse(getGameDate(b));

        return (
          (Number.isNaN(bTime) ? -Infinity : bTime) -
          (Number.isNaN(aTime) ? -Infinity : aTime)
        );
      });
    },
  );

  // eleventyConfig.addPlugin(lazyImagesPlugin);

  return {
    dir: {
      input: "src",
      output: "site",
      data: "_data",
      includes: "_includes",
      layouts: "_includes/layouts",
      addPassThroughCopy: true,
    },
  };
};
