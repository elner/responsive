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
                "height": 480}],
            btn_width: 70
        };

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.set_height = function() {
            if($('.height').hasClass('active') == true) return false;
            var document_height = $(document.body).height() - $("#header").height();
            if(document_height < $(window).height()){
                var diff = $(window).height() - $("#header").height();
                $("#viewport").height(diff);
                $("body").css('padding-top', $("#header").height());
            }
            plugin.update_info();
        }

        plugin.update_info = function() {
            var device_isset = $('ul#device-widths li.current').length;
            var w = parseInt($('ul#device-widths li.current').data('device-width'));
            var h = parseInt($('ul#device-widths li.current').data('device-height'));
            if(device_isset && $('.toggle-height').hasClass('active')){
                $('.device-info span').html(w+'&times;'+h+'px')
            }
             else if(device_isset){
                $('.device-info span').text(w+'px')
            }
            else{
                $('.device-info span').text($(window).width()+'px')
            }
        }

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            var settings = '<div id="settings"><p class="toggle-height"><span>Height off</span></p><form id="site" novalidate="novalidate"><label for="url">http://</label><input type="url" name="url" id="url" placeholder="URL + Enter" autofocus="autofocus" /></form></div>';
            var header = '<div id="header">'+settings+'<div class="toolbar"><p class="device-info"><span>000</span></p><ul id="device-widths"><li class="reset first"><span>Reset</span></li><!--<li class="refresh">Refresh</li>--></ul><p class="toggle-settings"><span>Settings</span></p></div></div>';

            $('body').prepend(header);

            $.each(plugin.settings.viewports, function (index, size) {
                var class_name = '';
                if(index == (plugin.settings.viewports.length - 1)) class_name = ' last';
                $('ul#device-widths').append('<li class="size-' + size.width + class_name+'"' + ' title="'+size.title+'" data-device-width="' + size.width + '" data-device-height="' + size.height + '"><span>' + size.width + 'px</span></li>');
                $('.size-' + size.width + '').click(function () {
                    $('ul#device-widths li').removeClass('current');

                    $(this).addClass('current');
                    $('article').animate({
                        width: "" + parseInt(size.width) + "px"
                    }, 300);
                    if($('.toggle-height').hasClass('active')){
                        $('article').animate({
                        height: "" + (parseInt(size.height)) + "px"
                        }, 300).css('margin-top', '20px');
                    }
                    plugin.update_info();
                });
            });

            var items_length = plugin.settings.viewports.length + 1;
            var list_width = (items_length * plugin.settings.btn_width) + (items_length + 1);
            $('ul#device-widths').css({"width": list_width+"px", "margin-left": "-"+(list_width / 2) +'px'});
            $('ul#device-widths li').css({"width": plugin.settings.btn_width+"px"});

            // Set auto width & height
            $('.reset').on('click', function () {
                $('.height').removeClass('active').find('span').text('Height off');
                $('ul#device-widths li').removeClass('current');
                $('article').animate({width : '100%'}).css({'margin-top': '0px'});
                plugin.set_height();
            });

            // Set test url
            $('form#site').submit(function(e) {
              $('#viewport iframe')
                .attr('src', 'http://'+$('#url').val())
                .load(function() {
                    $('#settings').slideUp(300, function(){
                        plugin.set_height();
                    });
                });
               e.preventDefault();
            });

            if($('#viewport iframe').attr('src').length == 0){
                $('#settings').slideToggle(300);
                $(this).toggleClass('active');
            }

            // Show/hide settings
            $('.toggle-settings').on('click', function () {
                $('#settings').slideToggle(300);
                $(this).toggleClass('active');
            });

            // Toggle Device height
            $('.toggle-height').on('click', function () {
                if($(this).hasClass('active') == 1){
                    $(this).removeClass('active').find('span').text('Height off');
                    $('article').css({'margin-top': '0px'});
                    $('#viewport').data('autoHeight').set_height();
                }
                else {
                    $(this).addClass('active').find('span').text('Height on');
                    var h = parseInt($('ul#device-widths li.current').data('device-height'));
                     $('article').animate({
                        height: h + "px"
                    }, 300).css('margin-top', '20px');
                }
                plugin.update_info();
            });    

            /*
            $('.refresh').click(function () {
               $('#viewport iframe',window.parent.document).attr('src',$('#viewport iframe',window.parent.document).attr('src'));
            });
            */
            plugin.update_info();

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