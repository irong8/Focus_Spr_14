function init() {

/*
    ---------------------------------------------------------------------------------
    Variables
    ---------------------------------------------------------------------------------
*/    

    var $document = $(document),
    $window = $(window),
    toolbar = $('#toolbar'),
    siteNav = $('#siteNav'),
    index = $('#index'),
    indexOpen = $('#index-open'),
    container = $('#container'),
    main = $('#article'),
    story = $('#article .section'),
    intro = $('#intro'),
    masthead = $('#masthead'),
    cover = $('#cover'),
    coverInfo = $('#cover > p'),
    
    bmlink = $('#bookmark-icon'),
    bookmark = $('#bookmark'),
    bmHandle = $('#bookmark div'),
    bmPosi,
    origDocHeight,
    
    originalFontSize = main.css('font-size'),
    tooltip = $('#tooltip'),
    toTheTop = $('#tttop'),
    
    overflowShadow = $('#index-overflow'),
    
    // issue specific colors
    issueColor = $('body').css('background-color'),
    
    // for lazyloading
    scrolling = false;

/*
    ---------------------------------------------------------------------------------
    Setup stuff
    ---------------------------------------------------------------------------------
*/
    
    // noscript message
    $('.noscript').remove();
    
    // Setup shadowbox
    Shadowbox.init({
        overlayOpacity: 0.8
    });
    
    // Setup fliped corners
    $('.corner-flip, .expandable, .collapsable, .figure-audio').cornerfold();
    $('.expandable-audio a').cornerfold({audioclip: true, expandable: true});

    // Masthead tooltip
    masthead.click(function() {
        intro.slideToggle();
    });
    
    // Setup cover-info
    $('#cover > a').click(function() {
        coverInfo.toggleClass('hidden');
        return false;
    }).toggle(function() {
        $(this).text('-');
    }, function() {
        $(this).text('i');
    });
    
    // Setup image lazyloader
    $('.lazy-thumb, .lazy').lazyLoad();
    // TODO: find a way to trigger the scroll event w/out jumping the page back
    // to the top
    // $window.scroll();

    
    
/*
    ---------------------------------------------------------------------------------
    Audio sections
    ---------------------------------------------------------------------------------
*/

    $('.figure-audio, .expandable-audio').not('.no-hidden').hover(function() {
        $(this).children('.audiojs').animate({height: '20px'}, 'fast');
    }, function() {
        $(this).children('.audiojs').animate({height: 0}, 'fast');
    });
    
/*
    ---------------------------------------------------------------------------------
    Aside sections
    ---------------------------------------------------------------------------------
*/        
    
    $('.aside > a').toggle(function() {
        var $this = $(this);
        $this.children().remove();
        $this.removeClass('expandable').addClass('collapsable').cornerfold();
        $this.next().slideDown('slow').css('border-bottom', '1px solid #ccc');
        $this.css({'background-color': issueColor, 'color': '#fff'});
        
        return false;
    }, function() {
        var $this = $(this);
        $this.children().remove();
        $this.removeClass('collapsable').addClass('expandable').cornerfold();
        $this.next().slideUp('slow').css('border-bottom', '');
        $this.removeAttr('style');
        
        return false;
    });
    
/*
    ---------------------------------------------------------------------------------
    Bookmark widget
    ---------------------------------------------------------------------------------
*/    

    // Bookmark cookie
    if($.cookie('luminafocus_bookmark') != null) {
        bmPosi = Math.floor($.cookie('luminafocus_bookmark'));
        origDocHeight = $.cookie('luminafocus_bookmark').split(/\./)[1];
        var difference = Math.abs(origDocHeight - $document.height()); // now we get the difference between the doc height when the bookmark was set and the current
        
        bmlink.css('background', 'url(/core/images/sprite.png) no-repeat -252px -17px');
        bmHandle.unbind();
        
        if($document.height() != origDocHeight) {
            if($document.height() < origDocHeight) {
                bookmark.removeClass('not-set fixed').addClass('absolute').css('top', bmPosi - difference);
            } else {
                bookmark.removeClass('not-set fixed').addClass('absolute').css('top', bmPosi + difference);
            }
        } else {
            bookmark.removeClass('not-set fixed').addClass('absolute').css('top', bmPosi);
        }
    }
    
    // Set up the bookmark to be draggable, define callback function that will set the cookie, and initialize
    bookmark.draggable({
        axis: 'y',
        containment: '#container',
        //Set bookmark cookie
        stop: function() {
            // Log both the bookmark position and the document's height
            var bmp = $(this).offset().top + '.' + $document.height();
            
            $.cookie('luminafocus_bookmark', bmp, { expires: 2 });
            bmPosi = Math.floor($.cookie('luminafocus_bookmark'));
            origDocHeight = $.cookie('luminafocus_bookmark').split(/\./)[1];
            $(this).removeClass('fixed').addClass('absolute').css('top', bmPosi); //Possible performance leak (having to read cookie everytime dropped)
            
            bmlink.css('visibility', 'visible');
        }
    }).mousedown(function() {
        if($(this).hasClass('not-set')) {
            $(this).removeClass('not-set');
            bmlink.css({'background': 'url(/core/images/sprite.png) no-repeat -252px -17px', 'visibility': 'hidden'});
            bmHandle.unbind();
            if($('#tiptip_holder').css('display', 'block')) {
                $('#tiptip_holder').fadeOut('fast');
            }
        }
        
        return false;
    });
    
    // Close out the bookmark
    bmlink.click(function() { return false; }).dblclick(function() {
        $(this).removeAttr('style');
        bookmark.removeAttr('style').removeClass('absolute').addClass('not-set fixed');
        
        $.cookie('luminafocus_bookmark', null);
        bmHandle.attr('title', 'click and drag to bookmark a spot').tipTip({ maxWidth: 'auto', delay: 0 });
        
        return false;
    });
    
    // Helps to ensure the bookmark stays where orinally dropped when window is resized or sidebar is collapsed/expanaded
    $document.resize(function(){
        var difference = Math.abs(origDocHeight - $document.height()); // now we get the difference between the doc height when the bookmark was set and the current
        if(!bookmark.hasClass('not-set')) {
            if($document.height() != origDocHeight) {
                if($document.height() < origDocHeight) {
                    bookmark.css('top', bmPosi - difference);
                } else {
                    bookmark.css('top', bmPosi + difference);
                }
            } else {
                bookmark.css('top', bmPosi);
            }
        }
    });
    
/*
    ---------------------------------------------------------------------------------
    Toolbar section
    ---------------------------------------------------------------------------------
*/
    
    // Smart clearing function.
    $('input[name="s"]').focus(function() {
        if(this.value === 'Search') {
            this.value = '';
        }
        $(this).parent().addClass('search-focus');
    }).focusout(function() {
        if(this.value === '') {
            this.value = 'Search';
        }
        $(this).parent().removeClass('search-focus');
    });
    
    // Font resizing
    $('.reset, .bigger, .smaller').click(function() {
        if(this.className === 'bigger') {
            main.css('font-size', parseFloat(main.css('font-size'))*1.2);
        }
        else if (this.className === 'smaller') {
            if(parseFloat(main.css('font-size')) > '11.2') {
                main.css('font-size', parseFloat(main.css('font-size'))*0.8);
            }
        }
        else {
            main.css('font-size', originalFontSize);
        }
        return false;
    });
    
    // Low-light/bright-light functions
    $('#low-light, #bright-light').click(function() {
        if(this.id === 'low-light') {
            $('body').addClass('low-light');
        }
        else {
            $('body').removeClass('low-light');
        }
        return false;
    });
    
/*
    ---------------------------------------------------------------------------------
    Index section 
    ---------------------------------------------------------------------------------
*/
    
    // Close/open index widget
    $('#index-close').toggle(function() {
        $(this).css('background-position', '-350px -69px').text('open');
        index.animate({right: '-240px'}, 100, 'swing');
        siteNav.animate({'margin-right': '0'}, 100, 'swing');
        container.animate({'margin-right': '8px'}, 100, 'swing');
        masthead.removeClass('masthead-small').css('margin', '80px auto 40px');
        cover.removeClass('cover-small').css('margin', '0 auto');
        main.animate({'padding-left': '40px'}, 100, 'swing');
        story.css({ 'margin-left': 'auto', 'margin-right': 'auto' });
        intro.css({ 'width': '707px', 'margin': '0 auto 40px', 'padding-right': '0' });
        toolbar.animate({'right': '8px'}, 100, 'swing');
        bookmark.addClass('no-index');

        // "to the top" stuff
        if($window.scrollTop() >= 60) {
            toTheTop.removeClass('hidden');
        }
        if($('#footer:in-viewport').length) {
            toTheTop.css({ 'position': 'absolute', 'right': 8, 'bottom': 222 });
        } else {
            toTheTop.removeAttr('style');
        }
        return false;
    }, function() {
        $(this).removeAttr('style').text('close');
        index.animate({'right': 0}, 100, 'swing');
        siteNav.animate({'margin-right': '241px'}, 100, 'swing');
        container.animate({'margin-right': '248px'}, 100, 'swing');
        masthead.addClass('masthead-small').removeAttr('style');
        cover.addClass('cover-small').removeAttr('style');
        main.css('padding-left', '');
        story.removeAttr('style');
        intro.css({ 'width': '', 'margin': '', 'padding-right': '' });;
        toolbar.animate({'right': '248px'}, 100, 'swing');
        bookmark.removeClass('no-index');
        
        toTheTop.addClass('hidden');
        return false;
    });
    
    // Index "inside" or "extras" chooser
    $('#index .condensed a').click(function() {
        if(!$(this).hasClass('active')) {
            $('#index div a').removeClass('active');
            $(this).addClass('active');
        }
        if($(this).hasClass('inside')) {
            $('#index ol').hide();
            $('#index > .inside').show();
        } else if($(this).hasClass('extras')) {
            $('#index ol').hide();
            $('#index > .extras').show();
        }
        return false;
    });
    
    // Sticky "to the top" button and Index section highlighting
    $window.scroll(function() {
        var y = $window.scrollTop(),
            inview = '#' + $('#article .section:in-viewport:first').attr('id'),
            notInIndex = '#' + $('#cover:in-viewport').attr('id'),
            link = $('#index ol a').filter('[hash=' + inview + ']');
                
        if(y >= 60) {
            toTheTop.removeClass('hidden');    
                        
        } else {
            toTheTop.addClass('hidden');
        }
        
        if(link.length && !link.is('.active')) {
            $('#index ol a').removeClass('active');
            link.addClass('active');
        }
        if(notInIndex === '#cover') {
            $('#index ol a').removeClass('active');
        }
        
        if($('#footer:in-viewport').length && index.css('right') === '-240px') {
            toTheTop.css({ 'position': 'absolute', 'right': 8, 'bottom': 222 });
        } else {
            toTheTop.removeAttr('style');
        }
        
        // Lazyloading stuff
        if(!scrolling) { // Prevent scroll stacking
            scrolling = true;
            //don't unlock for 250ms
            setTimeout(function() {
                var d = $window.data('lazyloaders');
                if(!d || !d.length) {
                    return;
                }
    
                $(d).each(function(i) {    
                    if(this && $.inviewport(this, {threshold:0})) {
                        $(this).showComment();
                    }
                });

                scrolling = false;            
            }, 250);        
        }
        
        // Remove tooltip so it doesn't get stuck when we scroll
        $('#tiptip_holder').fadeOut('fast');
        
    });
    
    // Index toolbar overflow actions
    $window.resize(function() {
        var olWidth = $('#index ol')[0].scrollWidth;
        
        if($('#index > .extras').css('display') !== 'none') {
            if(olWidth !== 216) {
                overflowShadow.css('visibility', 'visible');
            }
            else {
                overflowShadow.css('visibility', 'hidden');
            }
        } else if($('#index > .inside').css('display') !== 'none') {
            if($('#index ol')[1].scrollWidth !== 216) {
                overflowShadow.css('visibility', 'visible');
            }
            else {
                overflowShadow.css('visibility', 'hidden');
            }
        }
    });
    
    // Index toolbar menu hover actions
    $('#index-toolbar a').hover(function() {
        $(this).css('background-image', 'none');
    }, function() {
        $(this).removeAttr('style');
    });
    
    // Index share accordion menu
    $('#index-share').click(function() {
        $(this).next().slideToggle('fast');
        $('#index ol').toggleClass('smaller-index');
        overflowShadow.css('visibility', 'hidden');
        if($('#index > .extras').css('display') !== 'none') {
            if($('#index ol')[0].scrollWidth !== 216) {
                overflowShadow.css('visibility', 'visible');
            }
        }
        else if ($('#index > .inside').css('display') !== 'none') {
            if($('#index ol')[1].scrollWidth !== 216) {
                overflowShadow.css('visibility', 'visible');
            }
        }
        return false;
    });
    
    // Twitter & Facebook popups
    $('.popup').click(function() {
        var newwindow=window.open($(this).attr('href'),'name','height=450,width=550');
        
        if(window.focus) {
            newwindow.focus();
        }
        return false;
    });
    
    // Index jump to bookmark
    $('#index-bookmark').click(function() {
        if(bookmark.hasClass('absolute')) {
            $('html,body').animate({scrollTop: $('#bookmark').offset().top - 300}, 1000);
        }
        return false;
    });
    
    // Scrolling to top
    $('#tttop, #index-top').click(function() {
        $('html,body').animate({scrollTop: $('html,body').offset().top}, 1000, function() {
            $('#container-top').delay(9000).addClass('hidden');
        });
        return false;
    });
    
    // Index scrolling
    $('#index ol a[href^=#]').click(function() {
        var target = $(this.hash);
        var targetOffset = target.offset().top;
        
        $('html,body').animate({scrollTop: targetOffset}, 1000);
        return false;
    });
    
    
    // Setup Index widget
    $('#index .visuallyhidden').fadeIn('20000');
    
}

function findBookmark() {
    if($.cookie('luminafocus_bookmark') != null) {
        // whisk the user off to their bookmarked spot
        $('html,body').delay(1000).animate({scrollTop: $('#bookmark').offset().top - 300}, 1000);
    }
}

function setToolTips() {
    $('.tooltip').tipTip({ maxWidth: 'auto', delay: 0 });
}