# Zalando Postgesql Operator

![Zalando Postgesql Operator](https://raw.githubusercontent.com/zalando/postgres-operator/master/docs/diagrams/logo.png)

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

En este caso el operador de PostgreSql crea una serie de secretos, uno por cada usuario que creamos en el despliegue del cluster.  Recuperamos pasword para el usuario PostgreSQL (administrador) de nuestra base de datos.

```shell
export PGPASSWORD=$(kubectl get secret postgres.acid-minimal-cluster.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d)
```

Para probar este cluster de PostgreSql vamos a lanzar un pod dentro de Kubernetes con un cliente de PostgreSql.

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

## Ejemplos

### REST api postgresql con OpenFaaS

En este ejemplo partiendo del cluster que hemos creado anteriormente creamos una pequeña api para gestión de dispositivos.

- [Descriptor](/Examples/openfaas/crud-postgre.yml)
- [Código](/Examples/openfaas/crud-postgre/)

Es necesario crear las tablas en la base de datos para poder lanzar las consultas, para esto podemos usar el contenedor `bitnami/postgresql:11.7.0-debian-10-r9` que hemos usado anteriormente para lanzar la creación de las tablas.

```sh
export PGPASSWORD=$(kubectl get secret zalando.acid-minimal-cluster.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d)

kubectl run pgsql-postgresql-client --rm --tty -i --restart='Never' --namespace default --image docker.io/bitnami/postgresql:11.7.0-debian-10-r9 --env="PGPASSWORD=$PGPASSWORD" --command -- psql --host acid-minimal-cluster -U zalando
```

y lanzamos las siguientes sentencias en la shell de postgresql

```sql
-- Each device
CREATE TABLE device (
    device_id          INT GENERATED ALWAYS AS IDENTITY,
    device_key         text NOT NULL,
    device_name        text NOT NULL,
    device_desc        text NOT NULL,
    device_location    point NOT NULL,
    created_at         timestamp with time zone default now()
);

-- Set the primary key for device
ALTER TABLE device ADD CONSTRAINT device_id_key PRIMARY KEY(device_id);

-- Status of the device
CREATE TABLE device_status (
    status_id          INT GENERATED ALWAYS AS IDENTITY,
    device_id          integer NOT NULL references device(device_id),
    uptime             bigint NOT NULL,
    temperature_c      int NOT NULL,
    created_at         timestamp with time zone default now()
);

-- Set the primary key for device_status
ALTER TABLE device_status ADD CONSTRAINT device_status_key PRIMARY KEY(status_id);

```

Para poder desplegar este ejemplo necesitamos crear los secretos para conectar a la bbdd.

```sh
export PGPASSWORD=$(kubectl get secret zalando.acid-minimal-cluster.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d)

kubectl create secret generic -n openfaas-fn db \
  --from-literal db-username="zalando" \
  --from-literal db-password="$PGPASSWORD" 
```

## links

- <https://stackoverflow.com/questions/58449442/create-or-update-existing-postgres-db-container-through-kubernetes-job>
