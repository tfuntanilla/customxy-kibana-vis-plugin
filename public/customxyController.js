var module = require('ui/modules').get('customxy-vis-plugin');

module.controller('CustomXYController', function($scope, Private) {

	require('plugins/customxy-vis-plugin/c3.css');

	var filterManager = Private(require('ui/filter_manager'));

	$scope.filter = function(tag) {
		filterManager.add(
			$scope.vis.aggs.bySchemaName['x-axis'][0].params.field,
			tag.label,
			null,
			$scope.vis.indexPattern.title
		);
	}

	$scope.$watch('esResponse', function(resp) {

		if (!resp) {
			$scope.tags = null;
			return;
		}

		var xaxisId = $scope.vis.aggs.bySchemaName['x-axis'][0].id;
		var xaxisSplitterId = $scope.vis.aggs.bySchemaName['x-axis-splitter'][0].id;

		var yaxisAgg = $scope.vis.aggs.bySchemaName['y-axis'][0];
		console.log(yaxisAgg);

		console.log(resp);

		var buckets = resp.aggregations[xaxisId].buckets;
		console.log(buckets);

		var dots = [];
		var colors = [];
		var yvalues = [];

		var buckets_len = buckets.length;
		for (var i = 0; i < buckets_len; i++) {
			var dot = i;	// account number
			dots.push(i);
			var color = buckets[i][3]['buckets'][0]['key'];	// age
			colors.push(color);
			var yvalue = buckets[i][3]['buckets'][0][1]['value']; // balance
			yvalues.push(yvalue);
			console.log("account number: " + dot + ", age: " + color + ", balance: " + yvalue);
		}

		var xdata = [];
		xdata.push("X");
		for (var i = 0; i < yvalues.length; i++) {
			xdata.push(yvalues[i]);
		}

		require(["d3", "c3"], function(d3, c3) {
		  c3.generate({
		    bindto: '#chart',
    		data: {
        		columns: [xdata]
    		}
		  });
		});

	});

});