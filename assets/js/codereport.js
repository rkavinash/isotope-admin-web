/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var source   = $("#codereport-card-template").html();
		var template = Handlebars.compile(source);

		var authToken = localStorage.getItem('authToken');
		var userId = localStorage.getItem('userId');
		var params = new window.URLSearchParams(window.location.search);
		var orderId = params.get('orderid');

		AOS.init();

		$.ajax({
			url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8142/user/codeReport?userId='+ userId + '&orderId=' + orderId,
			type: 'POST',
			beforeSend: function(request) {
				request.setRequestHeader("authToken", authToken);
				request.setRequestHeader("content-type", 'application/json');
			},
			success: function(data) {
				var context =  data;
				var codereporthtml = template(context);
				$('#card-wrapper').html(codereporthtml);
				console.log('success codeReport: ', data);
			},
			error: function(data) {
				alert('codereport error');
				console.log('failure codeReport: ', data);
			}
		});
	});

})(jQuery);
