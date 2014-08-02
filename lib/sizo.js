/*!
 * Sizo
 * Reusable & customizable CSS components built on top of Kouto Swiss
 * https://github.com/leny/sizo
 * MIT Licensed
 */

var stylus = require( "stylus" ),
    koutoSwiss = require( "kouto-swiss" ),
    path = require( "path" ),
    nodes = stylus.nodes,
    utils = stylus.utils;

exports = module.exports = function() {
    return function( oStyle ) {
        oStyle.use( koutoSwiss() );
        oStyle.include( __dirname );
    };
};

exports.version = require( path.join( __dirname, "../package.json" ) ).version;

exports.path = __dirname;
