# otho

[![Build Status](https://travis-ci.org/fulhamcrazy/otho.svg?branch=master)](https://travis-ci.org/fulhamcrazy/otho)

Otho is a tiny vanilla js library that simplifies managing and manipulating the loading of images.


## Install

Coming soon...


## Quick Start!

Coming soon...


## To Do

* Various Sychronous Capabilities
    * ~~Specify how many images to load per time, i.e. `perLoad: 2`~~
    * ~~Specify a delay (using a number, function) between each image(s) load, i.e. `delay: 1000`~~
    * Specify the order of which images to load first
    * ~~Specify a matrix to load the images using a pattern~~
* Further Unit Tests
* Responsive Support, i.e. `<picture>, <source>`
* Documentation
* Advanced Examples
* Dedicated Site
* Add flow.js for type checking


## Documentation

### Options

You can configure Otho by passing your options to `Otho.load`. These are the default options:

```js
{
    els: document.getElementsByTagName('img'),
    error: '',
    placehold: '',
    forcePlacehold: false,
    inView: false,
    background: false,
    sync: false,
    imageLoaded: 'o-image-loaded',
    imageLoading: 'o-image-loading'
}
```

#### els


## Issues

If you are encountering bugs or you think otho is missing an awesome feature, please raise an issue in this repo! 


## License

MIT License. Do what the hell you want with it.

