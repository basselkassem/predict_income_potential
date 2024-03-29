# Copyright 2019 IBM All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This file was mostly generated by the IBM Watson Machine Learning service. It was slightly
# modified and serves as a quick way to test the credentials and model.
# To run this script update the credentials below, the values to be scored, and
# run it with `python predict.py` to see the results.

import json
import requests

# retrieve your wml_service_credentials_url from the service credentials associated
# with your IBM Cloud Watson Machine Learning service instance
wml_instance = '***'
wml_deployment = '***'
wml_service_credentials_url = 'https://us-south.ml.cloud.ibm.com'
wml_service_api_key = '***'
iam_url = "https://iam.cloud.ibm.com/identity/token"

# Get an IAM token from IBM Cloud
headers = { "Content-Type" : "application/x-www-form-urlencoded",
            "Accept": "application/json" }
data    = "apikey=" + wml_service_api_key + "&grant_type=urn:ibm:params:oauth:grant-type:apikey"
IBM_cloud_IAM_uid = "bx"
IBM_cloud_IAM_pwd = "bx"
response  = requests.post(iam_url, headers=headers, data=data, auth=( IBM_cloud_IAM_uid, IBM_cloud_IAM_pwd ) )
iam_token = response.json()["access_token"]

# Now to call the WML service
header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + iam_token, 'ML-Instance-ID': wml_instance}
# NOTE: manually define and pass the array(s) of values to be scored in the next line
feat = ['age', 'workclass', 'final_weight', 'education_duration', 'marital_status', 'occupation', 'relationship', 'race', 'sex', 'capital_gain', 'capital_loss', 'hours_per_week', 'com_workclass', 'com_marital_status', 'com_native_country', 'age final_weight', 'age education_duration', 'age hours_per_week', 'age capital_gain', 'age capital_loss', 'final_weight education_duration', 'final_weight hours_per_week', 'final_weight capital_gain', 'final_weight capital_loss', 'education_duration hours_per_week', 'education_duration capital_gain', 'education_duration capital_loss', 'hours_per_week capital_gain', 'hours_per_week capital_loss', 'has_missing_values']
values = [90, 'self-emp-not-inc', 122348, 15, 'married-civ-spouse', 'prof-specialty', 'husband', 'white', 'male', 20051, 0, 45, 'self-employed', 'married-civ-spouse', 'north_america', 11011320.0, 1350.0, 4050.0, 1804590.0, 0.0, 1835220.0, 5505660.0, 2453199748.0, 0.0, 675.0, 300765.0, 0.0, 902295.0, 0.0, '0']
payload_scoring = {"fields": feat, "values": [values]}
scoring_url = '{url}/v3/wml_instances/{instance}/deployments/{deployment}/online'.format(url=wml_service_credentials_url, instance=wml_instance, deployment=wml_deployment)
response_scoring = requests.post(scoring_url, json=payload_scoring, headers=header)
# Print the output
print("Scoring response")
parsed = json.loads(response_scoring.text)
values = parsed['values']
print(values)

# Format the output
prediction = 'Y' if values[0][45] == 1 else 'N'
confidence = str(round(values[0][44][1] * 100, 2)) + '%' if values[0][45] == 1 else str(round(values[0][44][0] * 100, 2)) + '%'
print("Income Potential Prediction (Y/N): {}\nModel Confidence: {}".format(prediction, confidence))
