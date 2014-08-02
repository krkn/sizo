/*!
 * Sizo
 * Reusable & customizable CSS components built on top of Kouto Swiss
 * https://github.com/leny/sizo
 * MIT Licensed
 *
 * Test Runner
 * (inspired from nib test runner)
 */

var stylus = require( "stylus" ),
    sizo = require( "../" ),
    fs = require( "fs" ),
    rReturn = /\r/g,
    rTestNameSanitize = /[-.]/g;

var cases = fs.readdirSync( "test/cases" )
    .filter( function( oFile ){
        return ~oFile.indexOf( ".styl" );
    } )
    .map( function( oFile ){
        return oFile.replace( ".styl", "" );
    } );

describe( "Kouto Swiss Tests", function() {
    cases.forEach( function( oTest ) {
        var sName = oTest.replace( rTestNameSanitize, " " );

        it( sName, function( done ) {
            var sPath = "test/cases/" + oTest + ".styl",
                sStylusCase = fs.readFileSync( sPath, "utf8" ).replace( rReturn, "" ),
                sCSSExpected = fs.readFileSync( "test/cases/" + oTest + ".css", "utf8" ).replace( rReturn, "" ),
                oStylus;

            ( oStylus = stylus( sStylusCase ) )
                .use( sizo() )
                .set( "filename", sPath )
                // .include( __dirname + "/cases/img" )
                .define( "url", stylus.url() );

            if ( ~oTest.indexOf("compress") ) {
                oStylus.set("compress", true);
            }

            oStylus.render( function( oError, sCSSActual ) {
                if( oError ) {
                    if( oError.message.indexOf( "expected" ) > -1 ) {
                        oError.message = oError.message.substring( 0, oError.message.indexOf( "expected" ) );
                    }
                    return done( oError );
                }
                sCSSActual
                    .trim()
                    .should
                    .equal( sCSSExpected.trim() );
                done();
            } );
        } );
    } );
} );
