(function(factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }

}(function($) {

    var instanceCounter = 0;

    function Tabber(el, options) {

        this.$el = $(el);
        this.options = $.extend({}, $.tabber.defaults, options);
        this.init();

    }

    $.extend(Tabber.prototype, {

        init: function() {

            this.ens = '.tabber' + (++instanceCounter);

            !this.options.navDefined && this.setupNav();

            this.$tabBtns = this.$el.find(this.options.tabBtnSelector);
            this.$tabs = this.$el.find(this.options.tabSelector);
            this.numTabs = this.$tabBtns.length;

            var $selectedTab = this.$tabs.filter('.' + this.options.tabActiveClass.split(' ').join('.'));

            if ($selectedTab.length) {

                this.currentPosition = this.$tabs.index($selectedTab) + 1;

            } else {

                this.renderPosition(this.currentPosition = 1);

            }
            this.options.afterInit && this.options.afterInit(this.$el, this);

            this.events();

        },

        setupNav: function() {

            var $btnCandidates = this.$el.find(this.options.tabBtnTitleSelector),
                $tabNav = $('<'+ this.options.tabNavTag +'>').addClass(this.options.tabNavClass).addClass(this.options.numTabsClassPrefix + $btnCandidates.length),
                self = this;

            $btnCandidates.each(function() {
                $tabNav.append('<a role="button" class="'+ self.options.tabBtnClass +'">' + $(this).html() + '</a>');
            });

            this.$el.prepend($tabNav);

            this.options.afterNavRender && this.options.afterNavRender($tabNav, this);

        },

        events: function() {

            var self = this;

            this.$tabBtns.on('click'+this.ens, function(e) {

                e.preventDefault();
                self.goToTab(self.$tabBtns.index($(this)) + 1);

            });

        },

        goToTab: function(position) {

            if ((position === this.currentPosition) || (position < 1 || position > this.numTabs)) { return; }

            this.renderPosition(position);

            this.currentPosition = position;
            this.options.afterTabChange && this.options.afterTabChange(this.$tabs.eq(position-1), this);

        },

        renderPosition: function(position) {

            var $activeTab = this.$tabs.eq(position-1),
                $activeBtn = this.$tabBtns.eq(position-1);

            this.$tabs.removeClass(this.options.tabActiveClass);
            $activeTab.addClass(this.options.tabActiveClass);

            this.$tabBtns.removeClass(this.options.tabBtnActiveClass);
            $activeBtn.addClass(this.options.tabBtnActiveClass);

            this.options.afterRender && this.options.afterRender($activeTab, this);

        },

        next: function() {

            this.currentPosition + 1 > this.numTabs ? this.goToTab(1) : this.goToTab(this.currentPosition + 1);

        },

        prev: function() {

            this.currentPosition - 1 < 1 ? this.goToTab(this.numTabs) : this.goToTab(this.currentPosition - 1);

        },

        destroy: function() {

            this.$tabBtns.off(this.ens);

            if (!this.options.navDefined) {
                this.$tabBtns.remove();
            }

            delete this.$el.data()['tabber'];

        }

    });

    $.tabber = $.Tabber = Tabber;

    $.tabber.defaults = {
        'tabBtnClass': 'btn',
        'tabBtnSelector': '.btn',
        'tabBtnActiveClass': 'active',
        'tabBtnTitleSelector': 'h3',

        'navDefined': false,
        'tabNavClass': 'tabNav',
        'tabNavTag': 'div',
        'tabSelector': '.tab',
        'tabActiveClass': 'active',
        'numTabsClassPrefix': 'numTabs',

        'afterInit': null,
        'afterTabChange': null,
        'afterNavRender': null,
        'afterRender': null
    };

    $.fn.tabber = function(options) {
        return this.each(function() {
            if (!$.data(this, 'tabber')) {
                $.data(this, 'tabber', new Tabber(this, options));
            }
        });
    };

}));
