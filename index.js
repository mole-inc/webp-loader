const imagemin = require('imagemin');
const imageminWebp = require('@mole-inc/imagemin-webp');
const loaderUtils = require('loader-utils');

module.exports = function (content) {
  this.cacheable && this.cacheable();

  const query = loaderUtils.getOptions(this);
  const configKey = query.config || 'webpLoader';
  const options = this.options && this.options[configKey] || {};
  const config = Object.assign({}, options, query);

  const callback = this.async();

  if (this.debug === true && config.bypassOnDebug === true) {
    return callback(null, content);
  }
  imagemin
    .buffer(content,{
      plugins: [imageminWebp(config)]
    })
    .then(function(data){
      callback(null, data);
    })
    .catch(function(err){
      callback(err);
    });
};

module.exports.raw = true;
