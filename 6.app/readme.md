# Ejemplo de aplicación completa

![Docs](../out/app/docs/uml/full-app/full-app.png)
[plant-uml](docs/uml/full-app.puml)

## Funciones

### download-forecast

Esta función descarga via http la previsión meteorológica desde la web de Aemet y la guarda en un bucket de minio.

Se lanza automáticamente según la configuración del cron-connector

![Docs](../out/app/docs/uml/download-forecast/download-forecast.png)

- [plant-uml](docs/uml/download-forecast.puml)
- [Código](functions/download-forecast)

### parse-forecas

Esta función recibe un evento de minio via una cola nats cada ver que un nuevo fichero de predicción meteorológica se guarda.

Cuando la función recibe el evento descarga el archivo desde minio, transforma la información y la guarda la la base de datos mongodb.

![Docs](../out/app/docs/uml/parse-forecast/parse-forecast.png)

- [plant-uml](docs/uml/parse-forecast.puml)
- [Código](functions/parse-forecastnats)

### get-forecast

Esta función devuelve los datos de la predicción meteorológica para una localidad via http.

![Docs](../out/app/docs/uml/get-forecast/get-forecast.png)

- [plant-uml](docs/uml/get-forecast.puml)
- [Código](functions/get-forecast)

## Sitio web estático

Sirve la pagina web estática que hace uso de las funciones OpenFaaS descritas anteriormente.

![Docs](../out/app/docs/uml/static-site/static-site.png)

- [plant-uml](docs/uml/static-site.puml)
- [Código](faas-forecast)

## Como Instalar la aplicación

### Prerequisitos

- [Instalación Básica de MicroK8s](/Microk8s.md)
- [Instalación de OpenFaaS](/1.faas/OpenFaaS/install.md)
- [Instalación de minio y minio client](/2.GestionArchivos/minio/install.md)
- [Instalación del operador de mongo](/3.BasesDeDatos/perconaMongodb/install.md)

### Pasos para instalar la aplicación

- Creación y configuración de un bucket en minio.
  - [Instrucciones](config-minio.md)
- Configuración del cluster mongodb
  - [Instrucciones](config-mongo.md)
- Despliegue de las funciones OpenFaaS
  
  ```bash
  cd functions
  faas deploy -f stack.yml 
  ```

- Despliegue de los componentes kubernetes

  ```sh
  kubectl apply -f kube/cron-connector.yaml
  kubectl apply -f kube/connector-dep.yaml
  kubectl apply -f kube/ingress.yaml
  ```
