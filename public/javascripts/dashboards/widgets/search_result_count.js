function addWidget_search_result_count(dashboardId, eventElem) {
    var params = originalUniversalSearchSettings();
    params.widgetType = "SEARCH_RESULT_COUNT";

    addWidget(dashboardId, params);
}

function updateWidget_search_result_count(widget) {
    var dashboardId = widget.attr("data-dashboard-id");
    var widgetId = widget.attr("data-widget-id");

    $(".reloading", widget).show();

    $.ajax({
        url: '/a/dashboards/' + dashboardId + '/widgets/' + widgetId + '/value',
        type: 'GET',
        success: function(data) {
            $(".value", widget).text(numeral(data.result).format());
            $(".calculated-at", widget).attr("title", data.calculated_at);
            $(".calculated-at", widget).text(moment(data.calculated_at).fromNow());
        },
        error: function(data) {
            widget.attr("data-disabled", "true");
            showErrorInWidget(widget);
        },
        complete: function(data) {
            $(".reloading", widget).hide();
        }
    });
}