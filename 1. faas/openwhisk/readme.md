# OpenWhisk

- Prerequisites

Look for the ip of the virtual machine

```shell
multipass list

Name                    State             IPv4             Image
knative                 Stopped           --               Ubuntu 18.04 LTS
openwhisk               Running           192.168.64.10    Ubuntu 18.04 LTS
openfaas                Stopped           --               Ubuntu 18.04 LTS
```

Enable helm3 in cluster
```shell
multipass shell <vm name>
microk8s enable helm3
```

- Clone repository

```bash
git clone https://github.com/apache/openwhisk-deploy-kube.git
```

- Customize the Deployment
  create mycluster.yaml

```yaml
whisk:
  ingress:
    type: NodePort
    apiHostName: 192.168.64.10 #<change by ip of vm*>
    apiHostPort: 31001

nginx:
  httpsNodePort: 31001
```

- Deploy With Helm

```bash
microk8s helm3 install owdev ./helm/openwhisk -n openwhisk --create-namespace -f mycluster.yaml
```


- Install and Configure the wsk CLI

TODO