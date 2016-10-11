module.exports = function(kibana) {
	return new kibana.Plugin({
		uiExports: {
			visTypes: ['plugins/customxy-vis-plugin/customxy']
		}
	});
};