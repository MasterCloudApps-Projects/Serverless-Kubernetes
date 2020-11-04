# Percona mongodb operator


## Install
- [Install mongodb operator](install.md)

## Test cluster
```shell
kubectl run -i --rm --tty percona-client --namespace=default --image=percona/percona-server-mongodb:4.0 --restart=Never -- bash -il
```

```shell
mongo "mongodb+srv://<Admin user>:<Admin password>@my-mongodb-rs0.default.svc.cluster.local/admin?replicaSet=rs0&ssl=false"
```

Now you can create users and databases for your applications

```mongo
rs0:PRIMARY> db.createUser({
    user: "myApp",
    pwd: "myAppPassword",
    roles: [
      { db: "myApp", role: "readWrite" }
    ],
    mechanisms: [
       "SCRAM-SHA-1"
    ]
})
```

## Scaling 
- [Scale](https://www.percona.com/doc/kubernetes-operator-for-psmongodb/scaling.html)