# Serverless-Kubernetes


## Project goal

1. [Databases](#databases)
2. [File Management](#file-management)
3. [Functions as a service (Faas)](#functions-as-a-service-faas)
4. [Message queue](#message-queue)
5. [User Management](#user-management)
6. [Example App](#example-app)


### Databases
| AWS      | Azure     | GCP           |
|----------|-----------|---------------|
| dynamodb | Cosmos DB | Cloud Spanner |


the alternative to the DynamoDB,Cosmos,... goes through a database operator such as:
#### Examples
- [x] [Mongodb operator](Databases/perconaMongodb/readme.md)
- [x] [Postgresql operator](Databases/zalandoPostgresOperator/readme.md)



### File Management
| AWS | Azure        | GCP           |
|-----|--------------|---------------|
| s3  | Blob Storage | Cloud Storage |

- [x] [minio](StaticPageDeployment/readme.md)

### Functions as a service (Faas)
| AWS    | Azure     | GCP             |
|--------|-----------|-----------------|
| Lambda | Functions | Cloud Functions |

- [ ] [knative](faas/knative/readme.md)
- [ ] [openfaas](faas/openfaas/readme.md)


### Message queue and events
| AWS     | Azure                   | GCP           |
|---------|-------------------------|---------------|
| SNS,SQS | Service Bus, Event Grid | Cloud Pub/Sub |
|  |  |  |

- [ ] [NATS](faas/openfass/nats.md)
- [ ] [Argo Events](faas/Events/argo-events/readme.md)

### User Management
| AWS     | Azure                | GCP               |
|---------|----------------------|-------------------|
| cognito | Active Directory B2C | Identity Platform |

- [ ] [keycloak](UsersManagement/readme.md)

### Example app
- [ ] [App](app/readme.md)


## Next steps
- Others database operators
    - [MongoDB Enterprise Kubernetes Operator](https://github.com/mongodb/mongodb-enterprise-kubernetes)
    - [Scylla Alternator](https://docs.scylladb.com/using-scylla/alternator/)
    - [Others](https://operatorhub.io/?category=Database)
- integrate workflows tools
    - [Argo Workflows](https://argoproj.github.io/projects/argo)
    - [Faas Flows](https://github.com/s8sg/faas-flow)
- analyze and test CI/CD in kubernetes faas 
    - [openfaas cloud](https://github.com/openfaas/openfaas-cloud)
    - [ci/cd for knative with concourse](https://medium.com/aptomi/ci-cd-for-knative-serverless-apps-on-kubernetes-with-concourse-54bafef51767)
- Othes tools
    - [Openfaas Ingress Operator](https://github.com/openfaas/ingress-operator)