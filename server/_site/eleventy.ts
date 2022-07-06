import { join } from 'path'

export default ( eleventyConfig: any ) => {
      // we'll use this to generate a unique ID for each component root (formerly just "root" in our create-react-app example)
  let idCounter = 0
  eleventyConfig.on('beforeBuild', function () {
    // reset the counter for each new build
    idCounter = 0
  })
  eleventyConfig.addShortcode(
      'react', 
      async function (componentPath: any) {
        idCounter += 1
        const componentRootId = `component-root-${idCounter}`
        // generate an absolute path to our component, relative to that "_includes" directory for simplicity
        const resolvedComponentPath = join(process.cwd(), '../src/_includes', componentPath)
        return `
            <div id="${componentRootId}"></div>
            <script type="module">
            // wrap our import in "quotes" using JSON.stringify
            import Component from ${JSON.stringify(resolvedComponentPath)};
            import React from 'react';
            import ReactDOM from 'react-dom';
            const root = document.getElementById('${componentRootId}');
            ReactDOM.render(React.createElement(Component), root);
            </script>
        `
  })
}