define(  
    ['backbone'],
    function (Backbone)
    {
        var Session = {

            render: function ()
            {
                // Do some rendering
                $('#page').html (this.view.render ().el);
            },

            setView: function (view)
            {
                // Remove the old
                if (this.view) this.view.remove();

                Session.trigger('destroy:view');

                this.view = view;    

                this.render();
            }
        }

        // Add events
        _.extend(Session, Backbone.Events);

        return Session;
    }
);