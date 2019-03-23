module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('scripts');
  return {
    dir: {
      includes: "includes",
    },
    templateFormats: [
      "css",
      "js",
      "map",
      "liquid",
      "md",
      "html"
    ],
    passthroughFileCopy: true
  }
};