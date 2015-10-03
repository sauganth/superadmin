define (  
    ['backbone', 'mustache'],
    function (Backbone, Mustache)
    {
        var Panel = Backbone.View.extend({

            paneltype: 'default',
            events: {
                'remove' : 'destroy',
            },

            initialize: function (options)
            {
                if(options) $.extend(this, options);
            },

            render: function ()
            {    
                // Get template
                this.$el.html (Mustache.render (Templates.panel, this));

                return this;
            }
        });

        return Panel;
    }
);