$(function() {
	$hook = $('#main');
	// $templates_dir = 'templates/';  	//PRODUCTION
	$templates_dir = 'src/app/templates/';	//DEVELOPMENT
	
	JPLoad.getTemplate($templates_dir + 'home.tpl', function (response) {
		JPLoad.loadTemplate(response, $hook.attr('id'), undefined, function (response) {
			behavior.getHomeListener();
		});		
	});
});

var behavior = {
	getHomeListener : function () {
		var _this = this;
		$hook.on('click','.home .button-action', function (e) {
			e.preventDefault();
			JPLoad.getTemplate($templates_dir + 'action.tpl', function (response) {
				JPLoad.loadTemplate(response, $hook.attr('id'));
			});
		});
	}
};