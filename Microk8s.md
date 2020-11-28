# Instalar microk8s

Para que las pruebas sean lo mas homogeneas para todos los sistemas operativos
las instrucciones de instalacion del cluster microk8s se especifica la creación de una maquina virtual 
con multipass, aunque no es necesario en linux. 

En las ultimas versiones de microk8s no es necesario utilizar multipass ya que en entornos distintos a linux
la maquina virtual es transparente, en estas pruebas hemos preferido crear las maquinas virtuales a mano
para tener mas control de las mismas.

## Instalar Multipass
 - [Linux](https://multipass.run/docs/installing-on-linux)
 - [Windows](https://multipass.run/docs/installing-on-windows)
 - [MacOs](https://multipass.run/docs/installing-on-macos)

## Crear una maquina virtual

```shell
multipass launch --mem 10G --cpus 6 --disk 20G --name serverlessk8s
```

## Intalar microk8s en la maquina virtual

Acceder a la vm 
```shell
multipass shell serverlessk8s
```

Instalar el snap de microk8s en la maquina virtual
```shell
sudo snap install microk8s --classic
sudo usermod -a -G microk8s ubuntu
sudo chown -f -R ubuntu ~/.kube

```
Después de cambiar los permisos es necesario salir y volver a entrar en la shell de la maquina virtual para que estos tengan efecto.

## Habilitar addons basicos

```shell
microk8s.enable dns dashboard registry ingress prometheus metallb
```

## Alias kubectl

```shell
sudo snap alias microk8s.kubectl kubectl
```

puede obtener la configuración de Kubernetes para kubectl remoto, lens u otra herramienta con el comando

```shell
# dentro de la maquina virtual
microk8s.config
```
o 
```bash
# fuera de la maquina virtual
multipass exec serverlessk8s -- sudo microk8s config 
```
