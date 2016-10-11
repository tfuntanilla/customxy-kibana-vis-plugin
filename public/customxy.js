define(function (require) {

	require('plugins/customxy-vis-plugin/CustomXYController');
	require('plugins/customxy-vis-plugin/customxy.css');


	function CustomXYProvider(Private) {

		var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));

		var Schemas = Private(require('ui/Vis/Schemas'));

		return new TemplateVisType({
			name: 'customxy',
			title: 'Simple Custom XY Linechart',
			description: 'A simple c3.js customy XY linechart',
			icon: 'fa-cloud',
			requiresSearch: true,
			template: require('plugins/customxy-vis-plugin/customxy.html'),
			schemas: new Schemas([
				{
					group: 'metrics',
					name: 'y-axis',
					title: 'Y-Axis Value',
					min: 1,
					max: 1,
					aggFilter: ['avg']
				},
				{
					group: 'buckets',
					name: 'x-axis',
					title: 'X-Axis Field',
					min: 1,
					max: 1,
					aggFilter: 'terms'
				},
				{
					group: 'buckets',
					name: 'x-axis-splitter',
					title: 'X-Axis Splitter',
					min: 1,
					max: 1,
					aggFilter: 'histogram'
				}
			])
		});

	}

	require('ui/registry/vis_types').register(CustomXYProvider);

	return CustomXYProvider;

});