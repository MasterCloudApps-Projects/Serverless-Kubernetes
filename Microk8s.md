# Install microk8s

## Create virtualmachine

```shell
multipass launch --mem 10G --cpus 6 --disk 20G --name serverlessk8s
```

## Intall microk8s

access to vm

```shell
multipass shell serverlessk8s
```

```shell
sudo snap install microk8s --classic
sudo usermod -a -G microk8s ubuntu
sudo chown -f -R ubuntu ~/.kube

```

## Enable addons

```shell
microk8s.enable dns dashboard registry ingress prometheus metallb
```

## Alias kubectl

```shell
sudo snap alias microk8s.kubectl kubectl
```

you can get de config for remote kubectl, lens, or other took with

```shell
microk8s.config
```
