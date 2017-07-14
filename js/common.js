import $ from 'jquery';
$(function () {
    /*$.ajax({
        dataType: 'json',
        url: '/js/yayoung.json',
        cache: false
    }).done(function (data) {
        var ids = data.fields[0].id;
        console.log(JSON.stringify(data.records[0].야영(캠핑)장명));
    });*/

    $('.container').accordion({
        active : 0,
        collapsible : true
    });
});