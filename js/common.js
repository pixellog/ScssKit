$(function () {

    // tab 실행
    $('.tabs').tabs();
    // dialog 실행
    $('.popup').dialog({autoOpen: false});
    $('#dialogDashboard').dialog({autoOpen: true});

    // sidebar slide button
    $('.btn-slide-toggle').on({
        click: function () {
            $(this).toggleClass('active');
            $('#sidebar').animate({left: $(this).hasClass('active') ? -342 : 0}, 200);
        }
    });

    // 탭추가
    $('#btnTabAdd').on({
        click: function () {
            $("#insrstRgnMapAddPopup2").dialog({autoOpen: true});
        }
    });

    // 자산추가
    $('#btnAssetAdd').on({
        click: function () {
            $("#dialogAssetRegist").dialog({autoOpen: true});
        }
    });

    // 대시보드
    $('.btn-dashboard').on({
        click: function () {
            $("#dialogDashboard").dialog({autoOpen: true});
        }
    });

    // 탭추가 팝업
    $("#insrstRgnMapAddPopup2").dialog({
        width: 320,
        buttons: {
            '다음': {
                'class': 'btn btn-primary',
                'text': '다음',
                click: function () {
                    //
                }
            },
            '취소': {
                'class': 'btn btn-primary',
                'text': '취소',
                click: function () {
                    $(this).dialog('close');
                }
            }
        }
    });


    $("#dialogAssetRegist").dialog({
        width: 320,
        dialogClass: 'dialog-asset-regist',
        buttons: {
            '등록하기': {
                'class': 'btn btn-primary btn-lg btn-block',
                'text': '등록하기',
                click: function () {
                    //
                }
            }
        }
    });

    $("#dialogSearchLog").dialog({
        width: 320,
        dialogClass: 'dialog-notitle dialog-search-log',
        buttons: {
            'Tracking 이력조회': {
                'class': 'btn btn-primary btn-lg btn-block',
                'text': 'Tracking 이력조회',
                click: function () {
                    //
                }
            }
        }
    });


    $("#dialogSearchLog2").dialog({
        modal: true,
        width: 1200,
        height: 837,
        dialogClass: 'dialog-search-log2',
        open: function () {
            // todo
            $('#tabsSearchLog').tabs({
                beforeLoad: function () {
                    $(this).find('.tabs-panel > div').hide().eq(0).show();
                },
                activate: function (event, ui) {
                    var idx = $(this).tabs('option', 'active');
                    $(this).find('.tabs-panel > div').hide().eq(idx).show();
                }
            });
        }

    });


    $('#dialogDashboard').dialog({
        width: $(window).width(),
        height: $(window).height(),
        dialogClass: 'dialog-dashboard',
        create: function (event, ui) {
            // $(".ui-widget-header").hide();
            // $(this).hide();
        }
    });

    var dashboard = {
        init: function () {
            this.manageConditionSet();
            this.deviceConditionSet();
            this.errorConditionSet();
            this.timeConditionSet();
            this.geoFencingSet();
            this.eventConditionSet();
        },
        manageConditionSet: function () { // 운용현황
            var $target = $('.manage-condition');
            var data = [
                {title: '개통', value: 13, icon: '/img/ico_ok.png'},
                {title: '장착', value: 12, icon: '/img/ico_tag.png'},
                {title: '서비스중', value: 13, icon: '/img/ico_service.png'},
                {title: '회수', value: 10, icon: '/img/ico_return.png'},
                {title: '폐기', value: 0, icon: '/img/ico_trash.png'}
            ];
            var items = [];
            $.each(data, function (i) {
                items.push('<li><img src="' + this.icon + '" alt=""><span class="title">' + this.title + '</span><span class="value">' + this.value + '</span></li>');
            });
            $target.find('.result').html(items.join(''));
        },
        deviceConditionSet: function () { // 단말기상태
            var $target = $('.device-condition');
            $target.append('<canvas id="deviceGraph" width="160" height="160"></canvas>');

            var drawChart = function () {
                var data = [
                    {value: 8, color: "#0f0", label: '정상수신'},
                    {value: 3, color: "#ff9100", label: '수신지연'},
                    {value: 1, color: "#f00", label: '로우배터리'}
                ];
                var deviceGraph = new Chart(document.getElementById("deviceGraph").getContext("2d")).Doughnut(data, {percentageInnerCutout: 86});

                // 범례그리기
                var items = [];
                var total = 0;
                items.push('<ul class="legend" style="left: 220px; top: 100px;">');
                $.each(data, function () {
                    items.push('<li><i style="background-color:' + this.color + '" /><span class="title">' + this.label + '</span><span class="value" style="color:' + this.color + '">' + this.value + '</span></li>');
                    total += this.value;
                });
                items.push('</ul>');
                items.push('<div class="counter"><img src="/images/common/check_ty1.png" alt="" /><strong>' + total + '</strong>대</div>');
                $target.append(items.join(''));
            }();
        },
        errorConditionSet: function () { // 장애현황
            var $target = $('.error-condition');

            var data = {
                '기능불량': 0,
                '통신불량': 0,
                '배터리불량': 0,
                '파손': 1,
                '분실': 1,
                '기타': 0
            };
            var items = [];
            var total = 0;
            $.each(data, function (key, val) {
                items.push('<li><span class="title">' + key + '</span><span class="value">' + val + '</span></li>');
                total += val;
                return total;
            });
            $target.find('.result').html('<div class="total">' + total + '건</div><ul>' + items.join('') + '</ul>');
        }
        ,
        timeConditionSet: function () { // 시간대별 수신현황
            var $target = $('.time-condition');
            $target.append('<canvas id="timeGraph" width="680" height="180"></canvas>');

            // chart
            var data = {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                datasets: [
                    {
                        label: "정상",
                        fillColor: "rgba(50,229,50,0.2)",
                        strokeColor: "#9BC53D",
                        pointColor: "#02C39A",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [100, 100, 100, 100, 90, 90, 80, 80, 70, 70, 65, 59, 59, 71, 56, 65, 59, 71, 56, 65, 80, 90, 90, 100]
                    },
                    {
                        label: "지연",
                        fillColor: "rgba(255,50,50,0.2)",
                        strokeColor: "#E55934",
                        pointColor: "#E55934",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [0, 0, 0, 0, 10, 10, 20, 20, 30, 40, 12, 16, 20, 15, 34, 43, 70, 60, 50, 50, 45, 32, 10, 34]
                    }
                ]
            };
            var context = document.getElementById("timeGraph").getContext("2d");
            new Chart(context).Line(data);
        },
        geoFencingSet: function () {
            var $target = $('.geo-fencing');
            $target.append('<canvas id="geoFencing" width="150" height="120" style="margin:40px 0 0 -10px"></canvas>');

            var drawChart = function () {
                var data = [
                    {value: 10, color: "#0f0", label: 'In'},
                    {value: 2, color: "#404040", label: 'Out'}
                ];
                var geoFencing = new Chart(document.getElementById("geoFencing").getContext("2d")).Doughnut(data, {percentageInnerCutout: 80});

                // 범례그리기
                var items = [];
                var x = data[0].value;
                var y = data[1].value;
                items.push('<ul class="legend">');
                $.each(data, function (i) {
                    items.push('<li><i style="background-color:' + this.color + '" /><span class="title">' + this.label + '</span></li>');
                });
                items.push('</ul>');
                items.push('<div class="counter"><strong>' + x + ' / ' + y + '</strong></div>');
                $target.append(items.join(''));
            }();
        },
        eventConditionSet: function () {
            var $target = $('.event-condition');
            $target.append('<canvas id="eventCondition" width="150" height="120" style="margin:40px 0 0 -10px"></canvas>');

            var drawChart = function () {
                var data = [
                    {value: 80, color: "#0f0", label: '조치'},
                    {value: 20, color: "#ff9100", label: '미조치'}
                ];
                var eventCondition = new Chart(document.getElementById("eventCondition").getContext("2d")).Doughnut(data, {percentageInnerCutout: 80});

                // 범례그리기
                var items = [];
                var x = data[0].value;
                items.push('<ul class="legend">');
                $.each(data, function () {
                    items.push('<li><i style="background-color:' + this.color + '" /><span class="title">' + this.label + '</span></li>');
                });
                items.push('</ul>');
                items.push('<div class="counter"><strong>' + x + '</strong>%</div>');
                $target.append(items.join(''));
            }();
        }
    }.init();

});
