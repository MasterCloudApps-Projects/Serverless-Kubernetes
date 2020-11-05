# OpenFaas

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


## Format
Containers with templates build by cli

## Examples
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
