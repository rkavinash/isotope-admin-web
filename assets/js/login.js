/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		$("#register-id").click(function() {
			window.location.href = 'register.html';
		});

		$("#login-id").click(function() {
			var loginData = {
				"email": $('#demo-email').val(),
				"password": $('#demo-password').val(),
			 };

			$.ajax({
				url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8142/login',
				type: 'POST',
				data: JSON.stringify(loginData),
				beforeSend: function(request) {
					request.setRequestHeader("content-type", 'application/json');
				},
				success: function(data) {
					// alert('Isotope: Login Success');
					localStorage.setItem('authToken', data.authToken);
					localStorage.setItem('userId', data.userId);
					localStorage.setItem('clientId', data.clientID);
					window.location.href="dashboard.html";
				  	console.log('success: ', data);
				},
				error: function(data) {
					// alert('login error');
					console.log('failure: ', data);
				}
			  });
		});

	});

})(jQuery);
