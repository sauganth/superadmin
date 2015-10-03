/**
 * Require dependencies
 */
require.config(  
{
    baseUrl: '/js/',
    paths: 
    {
        'jquery': 'lib/jquery/jquery',
        'underscore': 'lib/underscore/underscore',
        'backbone': 'lib/backbone/backbone',
        'bootstrap': 'lib/bootstrap/dist/js/bootstrap',
        'mustache': 'lib/mustache/mustache',
        'backgrid': 'lib/backgrid/lib/backgrid'
    },
    shim: 
    {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery', 'mustache'],
            exports: 'backbone'
        },
        'backgrid': {
            deps: ['jquery','backbone','underscore'],
            exports: 'Backgrid'
        }
    }
});

/**
 * Set up the global project name   
 */
var Superadmin;

require(  
    ['backbone', 'bootstrap'],
    function(Backbone, bootstrap)
    {   
        // Start
    }
);
