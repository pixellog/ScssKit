$(function () {

    var ui = {
        init: function () {
            $('.tabs').tabs(); // jquery ui tabs
            this.sidebar(); // sidebar toggle
            this.circleGraph(); // 로그인 영역 하단 서클 그래프
        },
        sidebar: function () {
            $('.btn-sidebar').on({
                click: function () {
                    $(this).toggleClass('active');
                    var check = $(this).hasClass('active');
                    $('#body').animate({left: check ? -360 : 0}, 200);
                }
            });
        },
        circleGraph: function () {
            var $target = $('.map-area-graph');

            $target.append('<div id="graph1"></div>');
            $target.append('<div id="graph2"></div>');
            $target.append('<div id="graph3"></div>');

            var data = [
                {label: '정상', value: 12, color: "#16db16"},
                {label: '장애', value: 2, color: "#f57a00"},
                {label: '배터리경고', value: 2, color: "#f02c0e"}
            ];

            Highcharts.setOptions({
                title: false,
                chart: {
                    type: 'pie',
                    marginRight: 0,
                    spacing: [0, 0, 0, 0],
                    margin:0
                },
                plotOptions: {
                    pie: {
                        showInLegend: true,
                        dataLabels: false,
                        startAngle: 0,
                        endAngle: 360
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    floating: true,
                    x: 10,
                    y: 5,
                    labelFormatter: function () {
                        return '<span>' + this.name + '</span><br><span style="font-weight: normal;">' + this.series.total + '</span>';
                    }
                },
                series: {
                    groupPadding: 0
                },
                credits: {
                    enabled: false
                }
            });

            /*var arr = [1,2,3];

            $.each(arr, function (i) {
                var chart1 = new Highcharts.Chart({
                    chart: {
                        renderTo: 'graph'+i
                    },
                    colors: [data[i].color],
                    series: [{
                        innerSize: '76%',
                        data: [
                            [data[i].label, data[i].value]
                        ]
                    }]
                });
            });*/


            var chart1 = new Highcharts.Chart({
                chart: {
                    renderTo: 'graph1'
                },
                colors: ['#16db16'],
                series: [{
                    innerSize: '76%',
                    data: [
                        ['정상', 12]
                    ]
                }]
            });

            var chart2 = new Highcharts.Chart({
                chart: {
                    renderTo: 'graph2'
                },
                colors: ['#f57a00'],
                series: [{
                    innerSize: '76%',
                    data: [
                        ['장애', 2]
                    ]
                }]
            });

            var chart3 = new Highcharts.Chart({
                chart: {
                    renderTo: 'graph3'
                },
                colors: ['#f02c0e'],
                series: [{
                    innerSize: '76%',
                    data: [
                        ['배터리경고', 2]
                    ]
                }],
                legend: {
                    x: 40
                }
            });

            // 범례심볼 숨기기
            $('.highcharts-legend-item .highcharts-point').hide();
        }
    }.init();


    $.fn.extend({
        ajaxPopupLoad: function () {
            this.each(function () {
                var $this = $(this);
                var x;
                var id;
                $this.on({
                    click: function () {
                        var $this = $(this);
                        var url = $this.data('url');

                        if (id !== undefined) $('#' + id).dialog('open');

                        if (x !== undefined) return;

                        x = $.ajax({
                            url: url,
                            context: document.body
                        }).done(function (data) {
                            id = $(this).append(data).find('.popup').last().attr('id');
                            return id;
                        });

                    }
                });

            });
        }
    });


    $('[data-url]').ajaxPopupLoad();

    // 자산등록
    //$('.btn-asset-regist').trigger('click');

});


