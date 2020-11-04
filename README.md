# Serverless-Kubernetes

## the goal of this project

1. [Databases](#databases)
2. File Management
3. User Management
4. Functions as a service (Faas)
5. Message queue

### Databases
| AWS      | Azure     | GCP           |
| -------- | --------- | ------------- |
| dynamodb | Cosmos DB | Cloud Spanner |


- [Install mongodb operator](Databases/perconaMongodb/readme.md)
- [Install postgresql operator](Databases/zalandoPostgresOperator.md)


### File Management
| AWS | Azure        | GCP           |
| --- | ------------ | ------------- |
| s3  | Blob Storage | Cloud Storage |

- [minio](StaticPageDeployment/readme.md)

### User Management
| AWS     | Azure                | GCP               |
| ------- | -------------------- | ----------------- |
| cognito | Active Directory B2C | Identity Platform |

- [keycloak](UsersManagement/readme.md)

### Functions as a service (Faas)
| AWS    | Azure     | GCP             |
| ------ | --------- | --------------- |
| Lambda | Functions | Cloud Functions |

- [knative](faas/knative/readme.md)
- [openfaas](faas/openfaas/readme.md)

### Message queue
| AWS    | Azure     | GCP             |
| ------ | --------- | --------------- |
| SNS,SQS | Service Bus, Event Grid | Cloud Pub/Sub |

- [NATS](faas/openfass/nats.md)