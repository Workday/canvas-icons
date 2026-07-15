module.exports = {
  // Transforms JS objects to SVG markup
  js2svg: {indent: 2, pretty: true, finalNewline: false},
  plugins: [
    {
      // runs SVGO default optimizers. [View docs](https://svgo.dev/docs/preset-default/)
      name: 'preset-default',
      params: {
        overrides: {
          // We don't want to minify IDs. [View Docs](https://svgo.dev/docs/plugins/cleanupIds)
          // It can create issues when multiple SVGs are on the same page.
          cleanupIds: false,
          // We want to keep the viewbox. [View docs](https://svgo.dev/docs/plugins/removeViewBox/)
          removeViewBox: false,
          // Keep fill/stroke on paths, not hoisted to parent <g>. [View docs](https://svgo.dev/docs/plugins/moveElemsAttrsToGroup/)
          moveElemsAttrsToGroup: false,
        },
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{role: 'presentation', focusable: 'false'}],
      },
    },
  ],
};
