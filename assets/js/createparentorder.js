/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var pordernum = localStorage.getItem('p-ordernum');
		var pextras = localStorage.getItem('p-extras');
		var pname = localStorage.getItem('p-name');
		var pprodid = localStorage.getItem('p-prodid');
		var pprodtype = localStorage.getItem('p-prodtype');
		var pextras = localStorage.getItem('p-extras');

		var prodexras = pextras.split('|')


		$('#product-orderNum').val(pordernum);
		$('#product-name').val(pname);
		$('#product-code').val(pprodid);
		$('#product-type').val(pprodtype);
		$('#add-manf-date').val(prodexras[0].slice(1, prodexras[0].length));
		$('#add-expiry-date').val(prodexras[1].slice(1, prodexras[1].length));
		$('#product-count').focus();

		$(document).on('click', '#create-parent-order-id', function(){
			var createBoxOrderData = {
				"userId": localStorage.getItem('userId'),
				"pid": pprodid,
				"name": pname,
				"pType": pprodtype,
				"count": $('#product-count').val(),
				"extras": getExtras()
			 };

			var authToken = localStorage.getItem('authToken');
			$.ajax({
				url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8142/user/createOrder',
				beforeSend: function(request) {
					request.setRequestHeader("authToken", authToken);
					request.setRequestHeader("content-type", 'application/json');
				  },
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(createBoxOrderData),

				success: function(data) {
					var popupStatus =  data.Status;
					var popupMsg =  data.Message;
					$('#myModal .modal-body').text(data.Message);
					$('#myModal').modal('show');
					console.log('Isotope: Success - ', data);
				},
				error: function(data) {
					console.log('failure: ', data);
				}
			  });
		});

		function getExtras() {
			
			var manufDate = prodexras[0].slice(1, prodexras[0].length);
			var expDate = prodexras[1].slice(1, prodexras[1].length);

			var extras;

			if (manufDate) {
				extras = extras + manufDate + '|';
			}
			if (expDate) {
				extras = extras + expDate + '|';
			}

			return extras;
		}

		$("#createSuccess-close").click(function() {
			window.location.href="dashboard.html";
		});

	});

})(jQuery);
