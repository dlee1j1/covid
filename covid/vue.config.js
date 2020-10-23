// vue.config.js
module.exports = {
  // options...
  pages: {
    assessment: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/assessment.html',
      // output as dist/assessment.html
      filename: 'assessment.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Assessment',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
//      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    index: {
      // entry for the page
      entry: 'src/intro.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Welcome',
 //     chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  }
}
