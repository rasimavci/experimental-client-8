# Experimental Client 8

This is a simple webRTC mobile app featuring **Onsen UI 2 + Vue**. This version uses **Vuex** to share the state among components.

> A version **without Vuex** is provided in [`no-vuex` branch](https://github.com/onsenui/vue-onsenui-kitchensink/tree/no-vuex).

<p>
<img src="src/assets/kandylogo.png"/>
</p>

This hybrid mobile client made with vue framework and onsen UI library. Store implemented with vuex.

Boilerplate has been created with [vue-cli](https://github.com/vuejs/vue-cli) and [webpack-simple](https://github.com/vuejs-templates/webpack-simple) template. Webpack configuration has been modified to work with Onsen UI +2.2.0.

## A note About CSS

Onsen UI bundles `css/onsen-css-components.css` wich can be directly included in an app. However, this example uses the source `css-components-src/src/onsen-css-components.css` where colors can be easily modified. In order to support this, [`postcss-cssnext`](https://github.com/MoOx/postcss-cssnext) must be used in Webpack.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
