# Examples


## Crud mongo

Deploy mongo server

```shell
kubectl apply -f kubernetes/mongo-server.yaml
```

create user and database

```shell
# Get Admin user
kubectl get secret  openfaas-mongo-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_USER}'| base64 -d

# Get Admin password
kubectl get secret  openfaas-mongo-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_PASSWORD}'| base64 -d
```

```shell
kubectl run -i --rm --tty percona-client --namespace=default --image=percona/percona-server-mongodb:4.0 --restart=Never -- bash -il
```

conect to db

```shell
mongo "mongodb+srv://<AdminUser>:<AdminPassword>@openfaas-mongo-rs0.default.svc.cluster.local/admin?replicaSet=rs0&ssl=false"
```

Now you can create users and databases for your applications

```mongo
rs0:PRIMARY> db.createUser({
    user: "openfaas",
    pwd: "openfaasPassword1234",
    roles: [
      { db: "openfaas", role: "readWrite" }
    ],
    mechanisms: [
       "SCRAM-SHA-1"
    ]

})
```

and create secrets

```shell
kubectl apply -f kubernetes/mongo-secrets.yaml
```
