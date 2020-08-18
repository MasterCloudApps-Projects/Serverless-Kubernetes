# Install mongodb operator

How to install Percona Server for MongoDB Operator

## Prerequisites

Basic installation of microk8s

## Clone repository

```shell
git clone -b v1.4.0 https://github.com/percona/percona-server-mongodb-operator
cd percona-server-mongodb-operator
```

Deploy the operator

```shell
kubectl apply -f deploy/bundle.yaml
```

Because microk8s runs locally, the default deploy/cr.yaml file should be edited to adapt the Operator for the the local installation with limited resources, deploy custom_cr.yaml

```shell
kubectl apply -f custom_cr.yaml
```

```shell
# Get Admin user
kubectl get secret  my-mongodb-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_USER}'| base64 -d

# Get Admin password
kubectl get secret  my-mongodb-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_PASSWORD}'| base64 -d
```

test cluster

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
