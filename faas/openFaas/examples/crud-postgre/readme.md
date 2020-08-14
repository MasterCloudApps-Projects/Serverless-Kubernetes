```
export USER="zalando"
export PASS="BphLZZIH693DTXrRxP4d0oDsrN3sFfj8AWZ7B6ktGgsA463cGxmEdnJz2f7ekJpv"
kubectl create secret generic -n openfaas-fn db \
  --from-literal db-username="$USER" \
  --from-literal db-password="$PASS" \
```

kubectl create -f manifests/minimal-postgres-manifest.yaml -n openfaas-fn

export HOST_PORT=$(minikube service acid-minimal-cluster --url | sed 's,.*/,,')
export PGHOST=$(echo $HOST_PORT | cut -d: -f 1)
export PGPORT=$(echo $HOST_PORT | cut -d: -f 2)
export POSTGRES_PASSWORD=$(kubectl get secret postgres.acid-openfaas-cluster.credentials -o 'jsonpath={.data.password}' | base64 -d)
export PGSSLMODE=require

acid-openfaas-cluster

kubectl run pgsql-postgresql-client --rm --tty -i --restart='Never' --namespace openfaas-fn --image docker.io/bitnami/postgresql:11.7.0-debian-10-r9 --env="PGPASSWORD=$POSTGRES_PASSWORD" --command -- psql --host 10.1.30.118 -U postgres