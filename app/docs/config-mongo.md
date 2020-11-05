


get secrets

```
kubectl get secret forecast-database-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_USER}'| base64 -d
```
userAdmin

```
kubectl get secret forecast-database-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_PASSWORD}'| base64 -d
```
rkafAtyf9lQriPpye


test cluster

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

```sh
kubectl create secret generic openfaas-mongo --from-literal=username=forecast --from-literal=password=forecastPassword -n openfaas-fn
```


mongodb+srv://forecast:forecastPassword@forecast-database-rs0.default.svc.cluster.local/admin?replicaSet=rs0&ssl=false
