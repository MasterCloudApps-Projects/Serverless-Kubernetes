# Install OpenFaas
- Prerequisites

Basic installation of microk8s

- Clone repository

```shell
git clone https://github.com/openfaas/faas-netes
```

- Create namespaces

```shell
kubectl apply -f https://raw.githubusercontent.com/openfaas/faas-netes/master/namespaces.yml
```

- Generate password

```shell
# generate a random password
PASSWORD=$(head -c 12 /dev/urandom | shasum| cut -d' ' -f1)

kubectl -n openfaas create secret generic basic-auth \
--from-literal=basic-auth-user=admin \
--from-literal=basic-auth-password="$PASSWORD"
```

- Deploy openfaas

```shell
cd faas-netes && \
kubectl apply -f ./yaml
```
