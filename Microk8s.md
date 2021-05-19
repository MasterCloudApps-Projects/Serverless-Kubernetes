# Instalar microk8s

Para que las pruebas sean lo mas homogéneas para todos los sistemas operativos
las instrucciones de instalación del cluster microk8s se especifica la creación de una maquina virtual
con multipass, aunque no es necesario en linux.

En las ultimas versiones de microk8s no es necesario utilizar multipass ya que en entornos distintos a linux
la maquina virtual es transparente, en estas pruebas hemos preferido crear las maquinas virtuales a mano
para tener mas control de las mismas.

## Instalar Multipass

- [Linux](https://multipass.run/docs/installing-on-linux)
- [Windows](https://multipass.run/docs/installing-on-windows)
- [MacOs](https://multipass.run/docs/installing-on-macos)

## Crear una maquina virtual

```Bash
multipass launch --mem 10G --cpus 6 --disk 20G --name serverlessk8s
```

## Instalar microk8s en la maquina virtual

Acceder a la vm

```Bash
multipass shell serverlessk8s
```

Instalar el snap de microk8s en la maquina virtual

```Bash
sudo snap install microk8s --classic
sudo usermod -a -G microk8s ubuntu
sudo chown -f -R ubuntu ~/.kube

```

Después de cambiar los permisos es necesario salir y volver a entrar en la Bash de la maquina virtual para que estos tengan efecto.

## Habilitar addons básicos

```Bash
microk8s enable dns dashboard registry ingress prometheus
microk8s enable metallb
```

## Alias kubectl

```Bash
sudo snap alias microk8s.kubectl kubectl
```

puede obtener la configuración de Kubernetes para kubectl remoto, lens u otra herramienta con el comando

```Bash
# dentro de la maquina virtual
microk8s.config
```

o

```bash
# fuera de la maquina virtual
multipass exec serverlessk8s -- sudo microk8s config 
```

## Acceso al proyecto dentro de la maquina virtual

```bash
multipass mount . serverlessk8s:/project
```
