define(  
    ['backbone', 'session', 'views/dashboard'],
    function (Backbone, Session, Dashboard)
    {
        var Router = Backbone.Router.extend (
        {
            routes :
            {
                '*path': 'dashboard'
            },

            dashboard : function ()
            {
                Session.setView (new Dashboard ());
            }
        });

        return Router;
    }
);