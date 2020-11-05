# Example app

![Docs](../out/app/docs/uml/full-app/full-app.png)
[plant-uml](docs/uml/full-app.puml)

## Functions

### donwload-forecast

This function downloads the weather forecast from Aemet's servers and saves it to the minio server. 
It is automatically launched according to the cron-connector configuration

![Docs](../out/app/docs/uml/download-forecast/download-forecast.png)
[plant-uml](docs/uml/download-forecast.puml)

### parse-forecas

This function receives a message from minio via a nats topic each time a new weather forecast file is saved.

When the function receives the message it downloads the file from minio, transforms the data, and saves it in the mongodb database.

![Docs](../out/app/docs/uml/parse-forecast/parse-forecast.png)
[plant-uml](docs/uml/parse-forecast.puml)


### get-forecast
This function returns the query of all weather forecasts via http

![Docs](../out/app/docs/uml/get-forecast/get-forecast.png)
[plant-uml](docs/uml/get-forecast.puml)