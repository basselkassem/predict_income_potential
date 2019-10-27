/*
 * Copyright 2019 IBM All Rights Reserved.
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var	sampleSrv = angular.module("sampleSrv",	[]);

// Call to Node.js backend to call PM Service instance
sampleSrv.factory("dataServices", ['$http',
function($http)	{

	this.getScore	=	function(p) {
		/* create the scoring input object */
		var com_workclass = '';
		if (p.workclass === 'state-gov' || p.workclass ===  'federal-gov' || p.workclass ===  'local-gov') {
			com_workclass = 'government';
		} else if (p.workclass === 'self-emp-inc' || p.workclass ===  'self-emp-not-inc') {
			com_workclass = 'self-employed';
 		} else {
			com_workclass = 'unemployed';
		}
		
		var com_marital_status = '';
		if (p.marital_status ==='never-married' || p.marital_status ==='widowed' || p.marital_status ==='divorced'){
			com_marital_status = 'single';
		} else {
			com_marital_status = 'single';
		}
		
		var com_native_country = p.com_native_country;
		
		var age_final_weight = p.age * p.final_weight;
		var age_education_duration = p.age * p.education_duration;
		var age_hours_per_week = p.age * p.hours_per_week;
		var age_capital_gain = p.age * p.capital_gain;
		var age_capital_loss = p.age * p.capital_loss;
		var final_weighte_ducation_duration = p.final_weight * p.education_duration;
		var final_weight_hours_per_week = p.final_weight * p.hours_per_week;
		var final_weight_capital_gain = p.final_weight * p.capital_gain;
		var final_weight_capital_loss = p.final_weight * p.capital_loss;
		var education_duration_hours_per_week = p.education_duration * p.hours_per_week;
		var education_duration_capital_gain = p.education_duration * p.capital_gain;
		var education_duration_capital_loss = p.education_duration * p.capital_loss;
		var hours_per_week_capital_gain = p.hours_per_week * p.capital_gain;
		var hours_per_week_capital_loss = p.hours_per_week * p.capital_loss;
		var has_missing_values = '0';
		var input = {
			/*fields:  ["AVGHEARTBEATSPERMIN","PALPITATIONSPERDAY","CHOLESTEROL","BMI","AGE","SEX","FAMILYHISTORY","SMOKERLAST5YRS","EXERCISEMINPERWEEK"],*/
			fields: ['age', 'workclass', 'final_weight', 'education_duration', 'marital_status', 'occupation', 'relationship', 'race', 'sex', 'capital_gain', 'capital_loss', 'hours_per_week', 'com_workclass', 'com_marital_status', 'com_native_country', 'age final_weight', 'age education_duration', 'age hours_per_week', 'age capital_gain', 'age capital_loss', 'final_weight education_duration', 'final_weight hours_per_week', 'final_weight capital_gain', 'final_weight capital_loss', 'education_duration hours_per_week', 'education_duration capital_gain', 'education_duration capital_loss', 'hours_per_week capital_gain', 'hours_per_week capital_loss', 'has_missing_values'],
			values: [[parseInt(p.age), p.workclass, parseInt(p.final_weight), parseInt(p.education_duration), p.marital_status, p.occupation, p.relationship, p.race, p.sex, parseInt(p.capital_gain), parseInt(p.capital_loss), parseInt(p.hours_per_week), com_workclass, com_marital_status, com_native_country, age_final_weight, age_education_duration, age_hours_per_week, age_capital_gain, age_capital_loss, final_weighte_ducation_duration, final_weight_hours_per_week, final_weight_capital_gain, final_weight_capital_loss, education_duration_hours_per_week, education_duration_capital_gain, education_duration_capital_loss, hours_per_week_capital_gain, hours_per_week_capital_loss, has_missing_values]]
		};

		/* call	scoring service	to generate results */
		return $http({	method: "post",
										url: "score",
                    data: { input: input }
                 })
			.success(function(data, status, headers, config) {
				return data;
			})
			.error(function(data, status, headers, config) {
				return status;
			});
	}

	return this;
}]);

// The modal dialogs for results and error
sampleSrv.factory("dialogServices",	['$modal',
function($modal) {

	this.resultsDlg	=	function (r) {
        var prettyHeader = ['Is income more than 50K?', 'Confidence'];
		return $modal.open({
			templateUrl: 'partials/scoreResults.html',
			controller:	'ResultsCtrl',
			size:	'lg',
			resolve: {
				rspHeader: function	() {
					//return r[0].header;
					return prettyHeader;
				},
				rspData: function	() {
				//	return r.result;
					return r;
				}
			}
		});
	}

	this.errorDlg = function(msgTitle,	msgText) {
		return	$modal.open({
			templateUrl: 'partials/error.html',
			controller:	'ErrorCtrl',
			size:	'lg',
			resolve: {
				msgTitle:	function ()	{
					return msgTitle;
				},
				message: function	() {
					return msgText;
				}
			}
		});
	}

	return this;
}]);

