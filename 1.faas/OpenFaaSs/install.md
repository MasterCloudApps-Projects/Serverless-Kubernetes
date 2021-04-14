# Instalación

Guía de instalación paso por paso de [OpenFaaS](https://www.openfaas.com/).

## Prerequisitos

[Instalación Básica de MicroK8s](/Microk8s.md)

## Pasos

- Empezamos clonando el repositorio

```shell
git clone https://github.com/openfaas/faas-netes
```

- Creamos los namespaces necesarios (openfaas y openfaas-fn)

```shell
kubectl apply -f https://raw.githubusercontent.com/openfaas/faas-netes/master/namespaces.yml
```

- Generamos una password aleatoria.

```shell
# generate a random password
PASSWORD=$(head -c 12 /dev/urandom | shasum| cut -d' ' -f1)

kubectl -n openfaas create secret generic basic-auth \
--from-literal=basic-auth-user=admin \
--from-literal=basic-auth-password="$PASSWORD"
```

- Desplegamos openfaas

```shell
cd faas-netes && \
kubectl apply -f ./yaml
```

- y finalmente comprobamos la instalación
    OpenFaaS despliega un servicio llamado gateway-external que expone un node port y por tanto podemos acceder a el desde la ip de nuesta maquina virtual.

    ```bash
    kubectl -n openfaas get service/gateway-external
    NAME               TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
    gateway-external   NodePort   10.152.183.80   <none>        8080:31112/TCP   83d
    ```

    y ya podemos acceder a ui de openfaas usando el usuario admin y la pasword que generamos antes <http://192.168.0.100:31112>
