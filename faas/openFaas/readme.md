# OpenFaas

In this section we will install and test OpenFass and its cli, 
We will also see some examples of programming with nodejs on how to integrate OpenFaas with other services. 

## Install
- [Install OpenFaas](install.md)

## Cli
- [install cli](https://docs.openfaas.com/cli/install/)

More used commands

    > `faas-cli build` - build an image into the local Docker library

    > `faas-cli push` - push that image to a remote container registry

    > `faas-cli deploy` - deploy your function into a cluster

    > The `faas-cli up` command automates all of the above in a single command.

    > `faas-cli logs NAME` command will stream the logs for the named function

    > faas template pull https://github.com/oillescas/openfaas_nodejs_templates

- [Docs](https://blog.alexellis.io/quickstart-openfaas-cli/)
- [GitHub](https://github.com/openfaas/faas-cli)

## Examples
All examples have a yaml display file and a folder with the code for it

To run the examples you only need to go to the examples folder and launch .
```bash
faas-cli deploy -f <name_of_faas.yaml>
```
All containers are published in DockerHub.

To modify and test them you must be logged in DockerHub and modify the yaml file to replace my DockerHub user (oillescas) with yours.
You also need to download the templates of the OpenFaas functions with the following commands.

```bash
faas template pull
faas template pull https://github.com/oillescas/openfaas_nodejs_templates
```


### REST api (mongo and postgre)
### Api minio 
### minio-webhook
### nats queme
### secure function

## Templates

### Custom templates
- node12-files
- node12-nats

## Monitoring
- prometheus instaled in openfaas namespace
- grafana dashboads
    - https://grafana.com/grafana/dashboards/3434
    - https://grafana.com/grafana/dashboards/3526

## Links
- [Auto Scaling](https://docs.openfaas.com/architecture/autoscaling/)
- [Triggers](https://docs.openfaas.com/reference/triggers/)
- [Cron Conector](https://github.com/openfaas/cron-connector)
- [Plonk stak](https://www.openfaas.com/blog/plonk-stack/)