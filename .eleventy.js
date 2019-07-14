module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('scripts');
  eleventyConfig.addPassthroughCopy('Maggie_Lynn_Resume_2019.pdf');

  return {
    dir: {
      includes: 'includes',
    },
    templateFormats: ['js', 'map', 'liquid', 'md', 'html'],
    passthroughFileCopy: true,
  };
};
