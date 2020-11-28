# Zalando Postgesql Opertaor 

En esta sección veremos como instalar el operador de PostgreSql de Zalando ademas de crear una base de datos.

Para validar la instalación desplegaremos un pod con un cliente para conectarnos al servidor postgreSQL

- [Documentación Oficial](https://postgres-operator.readthedocs.io/)

## Instalación 
- [Instalación de Zalando PostgreSql Operator](install.md)


## Creamos nuestro cluster PostgreSql

Una vez instalado el operador de PostgreSql vamos a desplegar nuestro cluster PostgreSql. 

En este caso le daremos el nombre de `acid-minimal-cluster` con 2 instancias.
Este operador nos permite crear y configurar bases datos y sus usuarios en el manifest de despliegue del cluster.

```shell
kubectl create -f minimal-postgres-manifest.yaml
```
## Probamos el cluster

En este caso el operador de PostgreSql crea una serie de secretos, uno por cada usuario que creamos en el despliegue del cluster.  Recuperamos pasword para el usuario postgres (administrador) de nuestra base de datos.

```shell
export PGPASSWORD=$(kubectl get secret postgres.acid-minimal-cluster.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d)
```

Para probar este cluster de PostgreSql vamos a lanzar un pod dentro de Kubernetes con 
un cliente de PostgreSql.

```bash
kubectl run pgsql-postgresql-client --rm --tty -i --restart='Never' --namespace default --image docker.io/bitnami/postgresql:11.7.0-debian-10-r9 --env="PGPASSWORD=$PGPASSWORD" --command -- psql --host acid-minimal-cluster -U postgres
```
Si todo ha ido bien ahora podremos ver la shell de PostgreSql.

```shell
postgres=#
```

y podremos por ejemplo listar las bases de datos. 

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
