# Install postgresql operator

How to install zalando postres operator

## prerequisites

Basic installation of microk8s

install helm3 in microk8s

```shell
microk8s.enable helm3
sudo snap alias microk8s.helm3 helm
```

```shell
# First, clone the repository and change to the directory
git clone https://github.com/zalando/postgres-operator.git
cd postgres-operator
```

```shell
helm install postgres-operator ./charts/postgres-operator -f ./charts/postgres-operator/values-crd.yaml
```

Deploy UI

```shell
helm install postgres-operator-ui ./charts/postgres-operator-ui
```

Access to ui

```shell
kubectl port-forward svc/postgres-operator-ui 8081:8081
```

visit <http://localhost:8081>

Deploy example cluster

```shell
kubectl create -f manifests/minimal-postgres-manifest.yaml
```

Test cluster

```shell
export PGPASSWORD=$(kubectl get secret postgres.acid-minimal-cluster.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d)

kubectl run pgsql-postgresql-client --rm --tty -i --restart='Never' --namespace default --image docker.io/bitnami/postgresql:11.7.0-debian-10-r9 --env="PGPASSWORD=$PGPASSWORD" --command -- psql --host acid-minimal-cluster -U postgres
```

you can see the postgres shell

```shell
postgres=#
```

and you list a databases

```shell
postgres=# \l
                                  List of databases
   Name    |   Owner   | Encoding |   Collate   |    Ctype    |   Access privileges
-----------+-----------+----------+-------------+-------------+-----------------------
 bar       | bar_owner | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 foo       | zalando   | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 postgres  | postgres  | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
 template0 | postgres  | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |           |          |             |             | postgres=CTc/postgres
 template1 | postgres  | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |           |          |             |             | postgres=CTc/postgres
(5 rows)
```
