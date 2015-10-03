define (  
    ['mustache', 'views/pageview', 'views/panel'],
    function (Mustache, Pageview, Panel)
    {
        var Dashboard = Pageview.extend(
        {
            title : "Dashboard",
            content: "<button id='users' class='btn btn-default'>Users</button><button id='accounts' class='btn btn-default'>Accounts</button>",

            render: function ()
            {
                // Build Pageview
                this.$el.html (Mustache.render (Templates.pageview, {'title' : this.title}));

                // Panels parent
                this.$container = this.$el.find("#container").eq(0);

                var buttons = new Panel ({title: this.title + ' panel', body: this.content});
                this.appendPanel (buttons, 4);

                return this;
            }

        });

        return Dashboard;
    }
);