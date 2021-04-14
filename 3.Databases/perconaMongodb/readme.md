# Percona MongoDb operator

![Percona Kubernetes Operator](https://www.percona.com/sites/all/themes/Porto_sub/img/doc-product-logos/kubernetes-mongodb-logo.png)

En esta sección vamos a instalar el operador de mongodb de Percona y vamos a desplegar un servidor mongo,
además vamos a desplegar un pod con un cliente para probar esa base de datos.

- [Documentación Oficial](https://www.percona.com/doc/kubernetes-operator-for-psmongodb/index.html)

## Instalación

- [Instalación Percona MongoDb Operator](install.md)

## Creamos nuestro cluster MongoDb

Después de instalar el operador en nuestro cluster,  probaremos el despliegue de un "cluster MongoDb" en este caso estamos desplegando un cluster con nombre `my-mongodb`
y que de início tendrá 3 replicas.

```shell
kubectl apply -f custom_cr.yaml
```

## Recuperar las credenciales de administrador

En la instalación del cluster el operador nos ha creado un secreto con los datos de acceso a el cluster, las credenciales de administrador.

Con las siguientes instrucciones recuperamos usuario y password.

```shell
# Get Admin user
kubectl get secret  my-mongodb-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_USER}'| base64 -d

# Get Admin password
kubectl get secret  my-mongodb-secrets -o 'jsonpath={.data.MONGODB_USER_ADMIN_PASSWORD}'| base64 -d
```

## Probamos el cluster

Para probar este cluster de MongoDb vamos a lanzar un pod dentro de kubernetes con un cliente de mongodb y vamos a acceder por ssh.

```shell
kubectl run -i --rm --tty percona-client --namespace=default --image=percona/percona-server-mongodb:4.0 --restart=Never -- bash -il
```

La url del servicio MongoDb se construye a partir del nombre del cluster MongoDb, en este caso `my-mongodb` y el replica set  `rs0`, en este caso la url del servicio quedaría de la siguiente manera: 

my-mongodb-rs0.default.svc.cluster.local

```shell
mongo "mongodb+srv://userAdmin:MBGFChrVW2F4zsN6ee@my-mongodb-rs0.default.svc.cluster.local/admin?replicaSet=rs0&ssl=false"
```

Una vez comprobada la conexión vamos a crear un nuevo usuario y una nueva base de datos.

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

## Ejemplos

### REST api postgresql con openfaas

En este ejemplo hemos creado un ejemplo de conexión a base de datos, una pequeña api para gestión de dispositivos.

- [Descriptor](/Examples/openfaas/crud-postgre/stack.yml)
- [Código](/Examples/openfaas/crud-postgre/device-status)

## Escalado

- [Escalado](https://www.percona.com/doc/kubernetes-operator-for-psmongodb/scaling.html)
