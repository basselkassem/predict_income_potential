# Deploy a model to predict Icome Potential with Watson Machine Learning

This code pattern can be thought of as two distinct parts:

1. A predictive model will be built using Spark within a Jupyter Notebook on IBM Watson Studio. The model is then deployed to the Watson Machine Learning service, where it can be accessed via a REST API.

2. A Node.js web app that allows a user to input some data to be scored against the previous model.

## Architecture

1. The developer creates an IBM Watson Studio Workspace.
2. IBM Watson Studio uses an Apache Spark service.
3. IBM Watson Studio uses Cloud Object storage to manage your data.
4. IBM Watson Studio uses a Jupyter Notebook to import data, train, and evaluate their model.
5. Data is imported and stored on Cloud Object Storage.
6. Models trained via Jupyter Notebooks are deployed using the Watson Machine Learning service.
7. A Node.js web app is deployed on IBM Cloud, it calls the predictive model hosted on the Watson Machine Learning service.
8. A user visits the web app, enters their information, and the predictive model returns a response.

!["architecture diagram"](doc/source/images/architecture.png)

## Included components

* [IBM Watson Studio](https://www.ibm.com/cloud/watson-studio): Analyze data using Jupyter, and Python in a configured, collaborative environment that includes IBM value-adds, such as managed Spark.
* [Jupyter Notebook](https://jupyter.org/): An open source web application that allows you to create and share documents that contain live code, equations, visualizations, and explanatory text.
* [PixieDust](https://github.com/pixiedust/pixiedust): Provides a Python helper library for IPython Notebook.
* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.


## License

This code pattern is licensed under the Apache Software License, Version 2.  Separate third party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](http://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](http://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
