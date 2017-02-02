$(document).ready(function () {

    /* ===== Affix Sidebar ===== */
    /* Ref: http://getbootstrap.com/javascript/#affix-examples */


    $('#doc-menu').affix({
        offset: {
            top: ($('#header').outerHeight(true) + $('#doc-header').outerHeight(true)) + 45,
            bottom: ($('#footer').outerHeight(true) + $('#promo-block').outerHeight(true)) + 75
        }
    });

    /* Hack related to: https://github.com/twbs/bootstrap/issues/10236 */
    $(window).on('load resize', function () {
        $(window).trigger('scroll');
    });

    /* Activate scrollspy menu */
    $('body').scrollspy({target: '#doc-nav', offset: 100});

    /* Smooth scrolling */
    $('a.scrollto').on('click', function (e) {
        //store hash
        var target = this.hash;
        e.preventDefault();
        $('body').scrollTo(target, 800, {offset: 0, 'axis': 'y'});

    });


    /* ======= jQuery Responsive equal heights plugin ======= */
    /* Ref: https://github.com/liabru/jquery-match-height */

    $('#cards-wrapper .item-inner').matchHeight();
    $('#showcase .card').matchHeight();

    /* Bootstrap lightbox */
    /* Ref: http://ashleydw.github.io/lightbox/ */

    $(document).delegate('*[data-toggle="lightbox"]', 'click', function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });
});


(function ($) {
    // custom css expression for a case-insensitive contains()
    jQuery.expr[':'].Contains = function (a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };


    //on dom ready
    $(function () {

        //highlighter syntax
        hljs.initHighlightingOnLoad();

        //search functionality
        function listFilter(header, list) {
            // header is any element, list is an unordered list
            // create and add the filter form to the header
            var form = $("<form>").attr({"class": "filterform", "action": "#"}),
                input = $("<input>").attr({
                    "autofocus": "autofocus",
                    "placeholder": "search the list below...",
                    "class": " filterinput form-control",
                    "type": "text",
                    "style": "height:30px;border:0px;background-color :#e3e3e3"
                });

            $(form).append(input).appendTo(header);

            $(input)
                .change(function () {
                    var filter = $(this).val();
                    if (filter) {
                        // this finds all links in a list that contain the input,
                        // and hide the ones not containing the input while showing the ones that do
                        $(list).find("a.scrollto:not(:Contains(" + filter + "))").parent().slideUp();
                        $(list).find("a.scrollto:Contains(" + filter + ")").parent().slideDown();
                    } else {
                        $(list).find("li").slideDown();
                    }
                    return false;
                })
                .keydown(function (e) {
                    // fire the above change event after every letter
                    $(this).change();
                    if (e.which !== 0) {
                        if (e.keyCode == 13) {
                            event.preventDefault();
                            $(list).find(' li:visible a.scrollto').eq(0).click();
                            return false;
                        }
                    }
                });
        }

        listFilter($("#header"), $("#doc-menu"));

        //copy to clipboard
        new Clipboard('.clipboard-btn', {
            target: function (trigger) {
                return trigger.nextElementSibling;
            },
        });

        //tags
        $(".tags").click(function () {
            $(this).toggleClass("selected");
            $("ul#doc-menu>li>a.scrollto").slideUp();
            $.each($(".tags.selected"), function (i, tag) {
                var tagText = $(tag).text();
                $.each($("ul#doc-menu>li>a.scrollto"), function (i, nav) {
                    var associatedTags = $(nav).data('tags');
                    associatedTags = (associatedTags == undefined || associatedTags == '')
                        ? 'untagged'
                        : associatedTags;
                    if(associatedTags.indexOf(tagText.trim()) != -1){
                        $(nav).slideDown();
                    }
                });
            });
        });
    });


}(jQuery));
