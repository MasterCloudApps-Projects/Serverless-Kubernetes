# Zalando Postgesql Opertaor 

## Install 
- [Install postgresql operator](install.md)


## Test cluster

Retrive admin pasword and launch pod with postgresql client
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


## Links
- [Official docs](https://postgres-operator.readthedocs.io/)