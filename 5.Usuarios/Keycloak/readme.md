# Keycloak

![alt](https://www.keycloak.org/resources/images/keycloak_logo_480x108.png)

## Instalación

- [Instalación de keycloak](install.md)

## Importar realm

Para facilitar la prueba hemos configurado y exportado un "realm" y vamos a proceder a importarlo

1. Nos logamos en la consola de Keycloak
    <https://keycloak.192.168.0.100.nip.io/>

1. Importamos realm-export.json

    ![Import realm](./import.png)

1. Regeneramos el secretkey
1. Actualizamos los despliegues con el nuevo secretkey
1. Creamos un usuario

## Ejemplos

> Nota para que los ejemplos funcionen correctamente hay que actualizar la configuración de los proxy's con el nuevo secretkey que hemos regenerado en los pasos anteriores.

### Secure Static website

![Secure ingress ](/uml/5.Usuarios/Keycloak/simple-ingress/simple-ingress/simple-ingress.png)

En este ejemplo partimos del despliegue de un [sitio web estático con minio](/2.GestionArchivos/minio/readme.md#despliegue-de-un-sitio-estático)

Para segurizarlo desplegamos un [oauth-proxy](/5.Usuarios/Keycloak/simple-ingress/oauth-proxy.yaml) que configuramos para que ataque a la configuración de keycloak que hemos importado anteriormente.

Y configuramos el nginx ingress para que use ese proxy para segurizar las llamadas. Y servir rutas de Keycloak como la del formulario de login entre otras.

```sh
kubectl apply -f simple-ingress/oauth-proxy.yaml
kubectl apply -f simple-ingress/ingress.yaml
```

A partir de este punto ya podríamos acceder al sitio web
<http://miniostatic.192.168.64.4.nip.io> y logarnos con los usuarios creados.

### Secure OpenFaaS function

![Load Web](/uml/5.Usuarios/Keycloak/OpenFaaS/secure-openfaas/secure-openfaas.png)

En este ejemplo vamos a segurizar el gateway de OpenFaaS con lo que así segurizariamos cualquier función OpenFaaS.

```sh
kubectl apply -f oauth2-proxy-ingress.yaml
```

En este momento al llamar via <http://openfaas.192.168.64.4.nip.io> a cualquier función que tengamos desplegada en OpenFaaS nos pediria login para llegar a ella.

## Links

- [Keycloak in kubernetes](https://www.keycloak.org/getting-started/getting-started-kube)
- [Keycloak Kubernetes Operator](https://www.keycloak.org/getting-started/getting-started-operator-kubernetes)
- [Ingress nginx oauth external auth](https://kubernetes.github.io/ingress-nginx/examples/auth/oauth-external-auth/)
- [Adding authentication to your Kubernetes Web applications with Keycloak](https://www.openshift.com/blog/adding-authentication-to-your-kubernetes-web-applications-with-keycloak)
