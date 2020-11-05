# Static deployments

![Static website](../out/StaticPageDeployment/simple-app/simple-app.png)

## Prerequisites

- [Basic installation of microk8s](../Microk8s.md)
- [Minio Instaled](install-minio.md)


## Deploy static site

Install minio client
- [Minio Client](https://github.com/minio/mc)

Configure mc client
```shell
# mc config host add minio-tfm http://<VirtualMachine-IP>:<External-Port> YOURACCESSKEY YOURSECRETKEY S3v4
mc config host add minio-tfm http://192.168.0.105:30544 YOURACCESSKEY YOURSECRETKEY
```

### Create and configure bucket

```shell
mc mb minio-tfm/static-site
mc policy set download minio-tfm/static-site
```

### upload static site 

```shell
mc mirror ./simple-app/dist minio-tfm/static-site
...d34bd3.js:  151.63 KiB / 151.63 KiB  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  1.24 MiB/s 0s
```

### Deploy ingress service

```shell
kubectl apply -f ingress.yaml
```

you can see de static site in
<https://miniostatic.192.168.0.100.nip.io/>


## Link
- [Minio Client Guide](https://github.com/minio/mc/blob/master/docs/minio-client-complete-guide.md)