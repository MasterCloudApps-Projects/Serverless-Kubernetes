# install minio

## Prerequisitos

[Instalación básica de MicroK8s](/Microk8s.md)

- Instalar helm3 en microk8s

    ```shell
    microk8s.enable helm3
    sudo snap alias microk8s.helm3 helm
    ```

## Instalar la aplicación con helm 3

```shell
helm repo add minio https://helm.min.io/
helm install --set service.type=LoadBalancer my-minio minio/minio
```

Comprobamos que se ha instalado correctamente.

```shell
kubectl get svc --namespace default -l release=my-minio
NAME       TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)          AGE
my-minio   LoadBalancer   10.152.183.238   10.64.140.43   9000:31131/TCP   26m
```

```bash
multipass info serverlessk8s 

Name:           serverlessk8s
State:          Running
IPv4:           192.168.64.12
Release:        Ubuntu 20.04.1 LTS
Image hash:     bb0a97102288 (Ubuntu 20.04 LTS)
Load:           5.29 4.10 3.76
Disk usage:     7.1G out of 19.2G
Memory usage:   2.7G out of 9.7G
```

Podemos visitar la web de minio visitando la ip del cluster con el puerto exerno

- <http://192.168.64.12:31131>

### Recuperando las keys de acceso

Para acceder a la web necesitamos las "keys" que el chart de helm ha guardado como un secreto.

AccessKey

```Bash
kubectl get secret  my-minio -o 'jsonpath={.data.accesskey}' | base64 -d
```

SecretKy

```Bash
kubectl get secret  my-minio -o 'jsonpath={.data.secretkey}' | base64 -d
```
