define(  
    ['backbone', 'Router', 'Session'],
    function (Backbone, Router, Session)
    {
                var Superadmin = {

            activate: function ()
            {
                // Initiate the router.
                this.router = new Router ();

                Backbone.history.start();
            }
        };

        return Superadmin;
    }
);