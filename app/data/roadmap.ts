import type { RoadmapItem, RoadmapStatus } from "./types";

export const ROADMAP_STATUS_LABEL: Record<RoadmapStatus, string> = {
  planned: "Planned",
  "in-progress": "In progress",
  done: "Done",
};

/** Ordered by impact for a junior Platform / DevOps profile. */
export const roadmap: RoadmapItem[] = [
  {
    title: "Containerised app with full CI/CD to AWS",
    goal: "Take Sala de Reservas from 'runs on my machine' to an automated path to production.",
    covers: ["Docker", "GitHub Actions", "Container registry", "AWS ECS Fargate", "Environments"],
    deliverables: [
      "Multi-stage Dockerfile and docker-compose for local development",
      "Pipeline: test → build image → vulnerability scan (Trivy) → push to ECR",
      "Deploy to staging on merge, production on tag, with rollback",
      "AWS access through GitHub OIDC — no long-lived keys",
    ],
    status: "planned",
  },
  {
    title: "Infrastructure as Code with Terraform",
    goal: "Provision everything the first project needs from code, reviewed like application code.",
    covers: ["Terraform", "AWS networking", "Remote state", "Plan on PR"],
    deliverables: [
      "Modules for VPC, ECS service, ECR and RDS",
      "Remote state in S3 with locking",
      "terraform plan posted on every PR, apply on merge",
      "README with an architecture diagram and cost notes",
    ],
    status: "planned",
  },
  {
    title: "Kubernetes lab with monitoring",
    goal: "Run the same app on a local cluster and make it observable.",
    covers: ["Kubernetes (kind)", "Helm", "Prometheus", "Grafana", "Alerting"],
    deliverables: [
      "kind cluster created by a script; app deployed with a Helm chart",
      "kube-prometheus-stack with an app dashboard (latency, errors, saturation)",
      "One alert rule with a documented runbook",
      "Stretch: GitOps with Argo CD",
    ],
    status: "planned",
  },
];
