/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var source   = $("#dashboard-card-template").html();
		var template = Handlebars.compile(source);

		var authToken = localStorage.getItem('authToken');
		var userId = localStorage.getItem('userId');

		$.ajax({
			url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8142/user/dashboard?userId='+ userId,
			type: 'POST',
			beforeSend: function(request) {
				request.setRequestHeader("authToken", authToken);
				request.setRequestHeader("content-type", 'application/json');
			},
			success: function(data) {
				var context = { "dashboarddata": data.dashboardOrders };
				var dashboardhtml = template(context);
				$('#card-wrapper').html(dashboardhtml);
				console.log('success dashboard: ', data);
			},
			error: function(data) {
				alert('dashboard error');
				console.log('failure dashboard: ', data);
			}
		});

		$(document).on("click", '.card-link', function() {
			var orderId = $(this).closest('.card').find('.orderNo').val();
			window.location.href="codereport.html?orderid=" + orderId;
		});

	});

})(jQuery);