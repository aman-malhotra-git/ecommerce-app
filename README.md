# E-commerce App (ECS)

A containerized e-commerce API deployed via CI/CD pipeline (CodePipeline + CodeBuild + ECR + ECS).

## How it works

1. Push code to this repo
2. CodePipeline detects the change
3. CodeBuild builds a Docker image and pushes to ECR
4. ECS pulls the new image and deploys it (rolling update)

## Local testing

```bash
npm start
# Visit http://localhost:3000
```

## Endpoints

- `GET /` - API info
- `GET /health` - Health check
- `GET /products` - List products
