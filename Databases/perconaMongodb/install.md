# Install mongodb operator

How to install Percona Server for MongoDB Operator

## Prerequisites

[Basic installation of microk8s](../../Microk8s.md)

## Deploy the operator
```shell
kubectl apply -f https://raw.githubusercontent.com/percona/percona-server-mongodb-operator/v1.5.0/deploy/bundle.yaml
```


## Create mongodb cluster
Because microk8s runs locally, the default deploy/cr.yaml file should be edited to adapt the Operator for the the local installation with limited resources, deploy custom_cr.yaml
```shell
kubectl apply -f custom_cr.yaml
```

## retrieve administrator credentials
```shell
# Get Admin user
kubectl get secret  my-mongodb-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_USER}'| base64 -d

# Get Admin password
kubectl get secret  my-mongodb-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_PASSWORD}'| base64 -d
```
