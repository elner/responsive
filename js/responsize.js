(function($) {
    $.autoHeight = function(element, options) {
        var plugin = this;

        plugin.set_height = function() {
            if($('.height').hasClass('active') == true) return false;
            var document_height = $(document.body).height() - $("#header").height();
            if(document_height < $(window).height()){
                var diff = $(window).height() - $("#header").height();
                $("#viewport").height(diff);
                $("body").css('padding-top', $("#header").height());
            }
        }

        plugin.init = function() {
            $(window)
                .scroll(function() {
                    plugin.set_height();
                })
                .resize(function() {
                    plugin.set_height();
                });
            plugin.set_height();
        }

        plugin.init();
        return this;
    }

    $.fn.autoHeight = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('autoHeight')) {
                var plugin = new $.autoHeight(this, options);
                $(this).data('autoHeight', plugin);
            }
        });
    }

})(jQuery);

(function($) {

    $.responsize = function(element, options) {

        var defaults = {
            viewports:
            [{
                "title": "iPad landscape 1024 x 768",
                "width": 1024,
                "height": 768},
            {
                "title": "iPad portrait 768 x 1024",
                "width": 768,
                "height": 1024}, 
            {
                "title": "iPhone 5 landscape 568 x 320",
                "width": 568,
                "height": 320}, 
            {
                "title": "iPhone 3+4 landscape 480 x 320",
                "width": 480,
                "height": 320}, 
            {
                "title": "iPhone 3+4 portrait 320 x 480",
                "width": 320,
                "height": 480}]
        };

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            var header = '<div id="header"><ul id="device-widths"><li class="height">Height off</li><li class="reset">Reset</li><li class="refresh">Refresh</li></ul></div>';

            $('body').prepend(header);

            $.each(plugin.settings.viewports, function (index, size) {
                $('ul#device-widths').append('<li class="size-' + size.width + '"' + ' title="'+size.title+'" data-device-width="' + size.width + '" data-device-height="' + size.height + '">' + size.width + 'px</li>');
                $('.size-' + size.width + '').click(function () {
                    $('ul#device-widths li').removeClass('current');
                    $(this).addClass('current');
                    $('article').animate({
                        width: "" + (parseInt(size.width) ) + "px" 
                    }, 300);
                    if($('.height').hasClass('active')){
                        $('article').animate({
                        height: "" + (parseInt(size.height)) + "px"
                    }, 300).css('margin-top', '20px');
                    }
                });
            });

            $('.reset').on('click', function () {
                $('.height').removeClass('active').text('Height off');
                $('ul#device-widths li').removeClass('current');
                $('article').animate({width : '100%'}).css({'margin-top': '0px'});
                $('#viewport').data('autoHeight').set_height()
            });

            $('.height').on('click', function () {
                if($(this).hasClass('active') == 1){
                    $(this).removeClass('active').text('Height off');
                    $('article').css({'margin-top': '0px'});
                    $('#viewport').data('autoHeight').set_height()
                }
                else {
                    $(this).addClass('active').text('Height on');
                    var h = parseInt($('ul#device-widths li.current').data('device-height'));
                     $('article').animate({
                        height: h + "px"
                    }, 300).css('margin-top', '20px');
                }
            });    

            $("#viewport").autoHeight();

            $('.refresh').click(function () {
               $('#viewport iframe',window.parent.document).attr('src',$('#viewport iframe',window.parent.document).attr('src'));
            });
        }

        plugin.init();

    }

    $.fn.responsize = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('responsize')) {
                var plugin = new $.responsize(this, options);
                $(this).data('responsize', plugin);
            }
        });

    }

})(jQuery);