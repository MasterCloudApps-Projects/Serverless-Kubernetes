# Configuración de la base de datos mongodb

1. Desplegamos el cluster mongo

   ```sh
   kubectl apply -f kube/mongo_cr.yaml
   ```

1. Recuperamos de los secretos el usuario y la password de la mismas

   ```sh
   kubectl get secret forecast-database-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_USER}'| base64 -d
   ```

   ```sh
   kubectl get secret forecast-database-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_PASSWORD}'| base64 -d
   ```

<!-- userAdmin -->
<!-- rkafAtyf9lQriPpye -->

1. Creamos el usuario de base de datos para las funciones openfaas

   ```shell
   kubectl run -i --rm --tty percona-client --namespace=openfaas-fn --image=percona/percona-server-mongodb:4.0 --restart=Never -- bash -il
   ```

   ```shell
   mongo "mongodb+srv://userAdmin:rkafAtyf9lQriPpye@forecast-database-rs0.default.svc.cluster.local/admin?replicaSet=rs0&ssl=false"
   ```

   ```mongo
   db.createUser({
      user: "forecast",
      pwd: "forecastPassword",
      roles: [
         { db: "forecast", role: "readWrite" }
      ],
      mechanisms: [
         "SCRAM-SHA-1"
      ]
   })
   ```

1. Creamos el secreto con los datos de la base de datos

   ```sh
   kubectl create secret generic openfaas-mongo --from-literal=username=forecast --from-literal=password=forecastPassword -n openfaas-fn
   ```
