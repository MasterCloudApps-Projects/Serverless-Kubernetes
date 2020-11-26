# Install keycloak

## Prerequisites

[Basic installation of microk8s](/Microk8s.md)

## Install service 

```sh
kubectl create -f https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes-examples/keycloak.yaml
```

### Install and configure ingress
Chage 192.168.0.100 for de ip of cluster

```sh
wget -q -O - https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes-examples/keycloak-ingress.yaml | \
sed "s/KEYCLOAK_HOST/keycloak.192.168.0.100.nip.io/" | \
kubectl create -f -
```

get services urls

```sh
KEYCLOAK_URL=https://keycloak.192.168.0.100.nip.io/auth &&
echo "" &&
echo "Keycloak:                 $KEYCLOAK_URL" &&
echo "Keycloak Admin Console:   $KEYCLOAK_URL/admin" &&
echo "Keycloak Account Console: $KEYCLOAK_URL/realms/myrealm/account" &&
echo ""
```

