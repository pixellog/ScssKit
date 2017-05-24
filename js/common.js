$(function() {

    // tab 실행
    $('.tabs').tabs();
    // dialog 실행
    $('.popup').dialog({autoOpen: false});


    // $('#dialogDashboard').dialog('open');  // 대시보드
    // $('#dialogAssetRegist').dialog('open'); // 자산등록
    $('#dialogSearchLog').dialog('open'); // Tracking 이력조회
    // $('#dialogSearchLog2').dialog('open'); // 이력조회
    // $('#insrstRgnMapAddPopup2').dialog('open'); // 관심지역추가

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
            dashboard.init();
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
                    $('#dialogSearchLog2').dialog('open');
                }
            }
        }
    });


    $("#dialogSearchLog2").dialog({
        modal: true,
        width: 1200,
        height: 870,
        dialogClass: 'dialog-search-log2'
    });


    $('#dialogDashboard').dialog({
        width: $(window).width(),
        height: $(window).height(),
        dialogClass: 'dialog-dashboard'
    }).append('<button type="button" class="btn btn-refresh"><span class="blind">새로고침</span></button>');



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
            $target.append('<ul class="legend">' + items.join('') + '</ul>');
        },
        deviceConditionSet: function () { // 단말기상태
            var $target = $('.device-condition');
            $target.append('<canvas id="deviceGraph" width="210" height="210"></canvas>');

            var drawChart = function () {
                var data = [
                    {value: 8, color: "#16db16", label: '정상수신'},
                    {value: 3, color: "#f57a00", label: '수신지연'},
                    {value: 1, color: "#f02c0e", label: '로우배터리'}
                ];
                var deviceGraph = new Chart(document.getElementById("deviceGraph").getContext("2d")).Doughnut(data, {percentageInnerCutout: 88});

                // 범례그리기
                var items = [];
                var total = 0;
                items.push('<ul class="legend">');
                $.each(data, function () {
                    items.push('<li><i style="background-color:' + this.color + '" /><span class="title">' + this.label + '</span><span class="value" style="color:' + this.color + '">' + this.value + '</span></li>');
                    total += this.value;
                });
                items.push('</ul>');
                $target.append(items.join('') + '<div class="counter"><img src="/img/ico_device.png" alt="" /><strong>' + total + '</strong>대</div>');
            }();
        },
        errorConditionSet: function () { // 장애현황
            var $target = $('.error-condition');

            var data = [
                {title: '기능불량', value: 0, icon: '/img/ico_function.png'},
                {title: '통신불량', value: 0, icon: '/img/ico_communi.png'},
                {title: '배터리불량', value: 0, icon: '/img/ico_battery.png'},
                {title: '파손', value: 1, icon: '/img/ico_broken.png'},
                {title: '분실', value: 1, icon: '/img/ico_lost.png'},
                {title: '기타', value: 0, icon: '/img/ico_etc.png'}
            ];
            var items = [];
            var total = 0;
            $.each(data, function (i) {
                items.push('<li><span class="icon"><img src="' + this.icon + '" alt=""></span><span class="title">' + this.title + '</span><span class="value">' + this.value + '</span></li>');
                total += this.value;
                return total;
            });
            $target.append('<div class="counter"><img src="/img/ico_warning.png" alt="" /> <strong>' + total + '</strong> 건</div><ul class="legend">' + items.join('') + '</ul>');
        }
        ,
        timeConditionSet: function () { // 시간대별 수신현황
            var $target = $('.time-condition');
            $target.append('<canvas id="timeGraph" width="980" height="190"></canvas>');

            var drawChart = function () {

                var data = {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                    datasets: [
                        {
                            label: "정상",
                            fillColor: "rgba(22, 219, 22, .1)",
                            strokeColor: "rgb(22, 219, 22)",
                            pointColor: "rgb(22, 219, 22)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [100, 100, 100, 100, 90, 90, 80, 80, 70, 70, 65, 59, 59, 71, 56, 65, 59, 71, 56, 65, 80, 90, 90, 100]
                        },
                        {
                            label: "지연",
                            fillColor: "rgba(245, 87, 39, .2)",
                            strokeColor: "rgb(245, 122, 0)",
                            pointColor: "rgb(245, 122, 0)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [0, 0, 0, 0, 10, 10, 20, 20, 30, 40, 12, 16, 20, 15, 34, 43, 70, 60, 50, 50, 45, 32, 10, 34]
                        }
                    ]
                };
                var context = document.getElementById("timeGraph").getContext("2d");
                new Chart(context).Line(data);

                // 범례그리기
                var items = [];
                items.push('<ul class="legend">');
                $.each(data.datasets, function () {
                    items.push('<li><i style="background-color:' + this.strokeColor + '" /><span class="title">' + this.label + '</span></li>');
                });
                items.push('</ul>');
                $target.append(items.join(''));
            }();
        },
        geoFencingSet: function () {
            var $target = $('.geo-fencing');
            $target.append('<canvas id="geoFencing" width="152" height="152"></canvas>');

            var drawChart = function () {
                var data = [
                    {value: 10, color: "#16db16", label: 'In'},
                    {value: 2, color: "#999999", label: 'Out'}
                ];
                var geoFencing = new Chart(document.getElementById("geoFencing").getContext("2d")).Doughnut(data, {percentageInnerCutout: 85});

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
            $target.append('<canvas id="eventCondition" width="152" height="152"></canvas>');

            var drawChart = function () {
                var data = [
                    {value: 80, color: "#16db16", label: '조치'},
                    {value: 20, color: "#f57a00", label: '미조치'}
                ];
                var eventCondition = new Chart(document.getElementById("eventCondition").getContext("2d")).Doughnut(data, {percentageInnerCutout: 85});

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
    };

});


