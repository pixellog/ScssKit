$(function () {

    /*jQuery.fn.extend({
     toggleButton: function () {
     this.each(function () {
     var $this = $(this);
     $this.find('button').on({
     click: function () {
     $(this).addClass('on').siblings().removeClass('on');
     }
     });
     })
     }
     });*/

    $('.tabs').tabs();

    // sidebar slide button
    $('.btn-slide-toggle').on({
        click: function () {
            $(this).toggleClass('active');
            var check = $(this).hasClass('active');
            $('#sidebar').animate({left: check ? -342 : 0}, 200);
            $('.map-area-graph').animate({left: check ? 10 : 352}, 200);
        }
    });

    // 뉴스티커
    $('.news-ticker > div').bxSlider({
        mode: 'vertical',
        auto: true, // auto rolling
        autoHover: true,
        autoControls: false, // play,stop button display
        pager: false,
        slideWidth: 500
    });

    // 지도위 그래프
    function mapAreaGraph() {
        var $target = $('.map-area-graph');

        var data = [
            {value: 8, color: "#16db16", label: '정상'},
            {value: 4, color: "#f57a00", label: '장애'}
        ];

        $target.append('<h4>전체 <strong>' + ~~(data[0].value + data[1].value) + '</strong></h4>');

        $target.append('<div class="graph1"><canvas id="mapAreaGraph" width="82" height="82"></canvas></div>');
        var drawChart = function () {
            var data1 = $.extend(true, {}, data);
            data1[1].color = 'rgba(0,0,0,0)';
            var mapAreaGraph = new Chart(document.getElementById("mapAreaGraph").getContext("2d")).Doughnut(data1, {percentageInnerCutout: 65});

            // 범례그리기
            var items = [];
            items.push('<ul class="legend"><li><strong class="title" style="color:' + data1[0].color + '">' + data[0].label + '</strong></li></ul>');
            items.push('<div class="counter"><strong>' + data[0].value + '</strong></div>');
            $target.find('.graph1').append(items.join(''));
        }();

        $target.append('<div class="graph2"><canvas id="mapAreaGraph2" width="82" height="82"></canvas></div>');
        var drawChart2 = function () {
            var data2 = $.extend(true, {}, data);
            data2[0].color = 'rgba(0,0,0,0)';
            // data[1].color = '#f57a00';
            var mapAreaGraph2 = new Chart(document.getElementById("mapAreaGraph2").getContext("2d")).Doughnut(data2, {percentageInnerCutout: 65});

            // 범례그리기
            var items = [];
            items.push('<ul class="legend"><li><strong class="title" style="color:' + data2[1].color + '">' + data[1].label + '</strong></li></ul>');
            items.push('<div class="counter"><strong>' + data[1].value + '</strong></div>');
            $target.find('.graph2').append(items.join(''));
        }();
    }

    mapAreaGraph();


    var x;
    $('[data-url]').on({
        click: function () {
            var $this = $(this);
            var url = $this.data('url');

            if (x) return;

            x = $.ajax({
                url: url,
                context: document.body
            }).done(function (data) {
                $(this).append(data);
                return true;
            });

        }
    });

    // 탭추가
    $('#btnTabAdd').on({
        click: function () {
            $("#insrstRgnMapAddPopup2").dialog('open');
        }
    });

    // 자산추가
    $('#btnAssetAdd').on({
        click: function () {
            $("#dialogAssetRegist").dialog('open');
        }
    });

    // 대시보드
    $('.btn-dashboard').on({
        click: function () {
            $("#dialogDashboard").dialog('open');
        }
    });

});


