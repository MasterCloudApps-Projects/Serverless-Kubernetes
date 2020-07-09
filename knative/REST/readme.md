# Knative express ress app


## Build
```shell
   # Build the container on your local machine
   docker build -t oillescas/knative-rest .

   # Push the container to docker registry
   docker push oillescas/knative-rest
```


## Run in k8s
```shell
   kubectl apply --filename service.yaml
```


## Service url
```
kubectl get ksvc knative-rest  --output=custom-columns=NAME:.metadata.name,URL:.status.url
NAME           URL
knative-rest   http://knative-rest.default.example.com
```