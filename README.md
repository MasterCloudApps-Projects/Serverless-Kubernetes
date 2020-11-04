# Serverless-Kubernetes


## Project goal

1. [Databases](#databases)
2. [File Management](#file-management)
3. [User Management](#user-management)
4. [Functions as a service (Faas)](#functions-as-a-service-faas)
5. [Message queue](#message-queue)




### Databases
| AWS      | Azure     | GCP           |
|----------|-----------|---------------|
| dynamodb | Cosmos DB | Cloud Spanner |


the alternative to the DynamoDB,Cosmos,... goes through a database operator such as:
#### Examples
- [ ] [Mongodb operator](Databases/perconaMongodb/readme.md)
- [ ] [Postgresql operator](Databases/zalandoPostgresOperator.md)

#### Others database operators

- [MongoDB Enterprise Kubernetes Operator](https://github.com/mongodb/mongodb-enterprise-kubernetes)
- [Scylla Alternator](https://docs.scylladb.com/using-scylla/alternator/)
- [Others](https://operatorhub.io/?category=Database)


### File Management
| AWS | Azure        | GCP           |
|-----|--------------|---------------|
| s3  | Blob Storage | Cloud Storage |

- [ ] [minio](StaticPageDeployment/readme.md)

### User Management
| AWS     | Azure                | GCP               |
|---------|----------------------|-------------------|
| cognito | Active Directory B2C | Identity Platform |

- [ ] [keycloak](UsersManagement/readme.md)

### Functions as a service (Faas)
| AWS    | Azure     | GCP             |
|--------|-----------|-----------------|
| Lambda | Functions | Cloud Functions |

- [ ] [knative](faas/knative/readme.md)
- [ ] [openfaas](faas/openfaas/readme.md)

### Message queue
| AWS     | Azure                   | GCP           |
|---------|-------------------------|---------------|
| SNS,SQS | Service Bus, Event Grid | Cloud Pub/Sub |

- [ ] [NATS](faas/openfass/nats.md)