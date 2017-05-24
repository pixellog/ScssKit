var ui = {
    menuSet: function (activeId) {
        $.ajax({
            dataType: 'json',
            url: '/js/menu.json'
        }).done(function (data) {
            if (activeId === undefined) activeId = 'm00000000';
            var layout = {
                init: function () {
                    this.header();
                    // this.title();
                    this.quick();
                },
                header: function () {
                    // GNB
                    var items = [];
                    items.push("<ul class='depth1'>");
                    $.each(data, function (key, val) {
                        if (key.slice(0, 3) === 'm00') return;
                        var x = activeId.slice(0, 3) === key.slice(0, 3); // 1depth
                        items.push("<li " + (x ? 'class=on' : '') + "><a href='" + val.url + "'>" + val.name + "</a>");
                        if (val.sub) {
                            items.push("<ul class='depth2'>");
                            $.each(val.sub, function (i, data) {
                                $.each(data, function (key, val) {
                                    var x = activeId.slice(0, 5) === key.slice(0, 5); // 2depth
                                    items.push("<li " + (x ? 'class=on' : '') + "><a href='" + val.url + "'>" + val.name + "</a></li>");
                                });
                            });
                            items.push("</ul>");
                        }
                        items.push("</li>");
                    });
                    items.push("</ul>");

                    var menuHtml = items.join('');
                    $('#header').append('<h1 class="logo"><a href="./"><span class="blind">KT Tracker</span></a></h1>' + menuHtml);

                    $('#header .depth1 a').on('mouseenter', function () {
                        $(this).parent().siblings().find('ul').hide();
                        $(this).next('ul').stop().slideDown(200);
                    });

                    $('#header .depth1').on('mouseleave', function () {
                        currentMenu();
                    });

                    currentMenu();

                    function currentMenu() {
                        setTimeout(function () {
                                $('#header .depth1 ul').hide();
                                // 활성화 메뉴 펼침
                                // $('#header .depth1 .on').parents('ul').show();
                            }, 400
                        )
                    }
                },
                title: function () {
                    var $target = $('#location a');
                    var items = [];
                    $.each($target, function () {
                        var txt = $(this).text();
                        items.push(txt + '>');
                    });
                    var html = items.join('');
                    html = html.replace('홈', 'KB증권').slice(0, -1);
                    $('title').html(html);
                },
                quick: function () {
                    $('body').append('<div id="quick" />');
                    var $target = $('#quick');
                    var data = {
                        menu1: '#none',
                        menu2: '#none',
                        menu3: '#none',
                        menu4: '#none',
                        menu5: '#none'
                    };

                    var items = [];
                    items.push('<ul>');
                    $.each(data, function (key, val) {
                        items.push('<li><a href="' + val + '">' + key + '</a></li>');
                    });
                    items.push('</ul>');
                    $target.html(items.join(''));
                }
            }.init();
        });
    }
};
