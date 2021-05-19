# Install keycloak

## Prerequisitos

[Instalación Básica de MicroK8s](/Microk8s.md)

## Pasos

Instalamos Keycloak.

```sh
kubectl create -f https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes-examples/keycloak.yaml
```

### configuramos un Ingress para acceder a la web de keycloak

```sh
kubectl apply -f keycloak-ingress.yaml
```

Construimos las urls de acceso a los servicios

```sh
KEYCLOAK_URL=https://keycloak.192.168.64.4.nip.io/auth &&
echo "" &&
echo "Keycloak:                 $KEYCLOAK_URL" &&
echo "Keycloak Admin Console:   $KEYCLOAK_URL/admin" &&
echo "Keycloak Account Console: $KEYCLOAK_URL/realms/myrealm/account" &&
echo ""
```
