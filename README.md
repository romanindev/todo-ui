# todo-ui

Simple Todo UI project

This project is part of a **GitOps demo setup** using:
- Kubernetes (k3d)
- Argo CD (GitOps deployment)
- CircleCI (CI pipeline - planned)

---

## Purpose

This repository is **not a production service**.

It is a **learning-oriented project** designed to explore:
- GitOps workflows with Argo CD
- Containerized applications with Docker
- Kubernetes deployments and networking
- Service-to-database communication (MongoDB)

---

## Architecture (context)

This UI is part of a multi-repo setup:

- `todo-api` → this repository (backend)
- `todo-ui` → this repository
- `infra-manifests` → Kubernetes manifests (GitOps source of truth)

Argo CD watches the `infra-manifests` repo and deploys this service into the cluster.

## 🧑‍💻 Local development

### 1. Install dependencies

```bash
npm install
```

### Start
```bash   
npm run dev
```

## Docker
```bash
docker build -t todo-api:local .
```

## Kubernetes
This service is deployed via Argo CD using manifests from:

👉 `infra-manifests` repository

## Notes

This project intentionally keeps things simple:

- no authentication
- no validation libraries
- minimal architecture

The goal is to focus on:
👉 infrastructure, deployment, and GitOps workflow

## Status

🚧 In progress — part of GitOps learning journey
