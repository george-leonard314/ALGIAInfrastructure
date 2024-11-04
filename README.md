# ALGIAInfrastructure
ALGIAInfrastructure is an Infrastructure as Code (IaC) project designed to support the backend infrastructure of a banking system. The project leverages Ansible, Terraform, and CloudFormation to create and manage a scalable, efficient, and secure environment for handling financial data. This setup is specifically tailored to interact with the Bloomberg API, enabling the bank to manipulate, store, and analyze vast amounts of financial information.

## Purpose
The primary purpose of this project is to automate the deployment and management of the banking system’s infrastructure, with a focus on:

- Efficiently provisioning and scaling cloud resources
- Storing and managing financial data securely and effectively
- Enabling accurate and fast data estimation and processing using Bloomberg API data
- Reducing infrastructure management overhead through IaC best practices

## Project Components
1. Ansible: Used to configure and deploy software components, services, and dependencies across the infrastructure.
2. Terraform: Manages the provisioning of cloud resources, ensuring that infrastructure can be scaled and modified as needed.
3. CloudFormation: Utilized for certain AWS-specific resource deployments to take advantage of native CloudFormation features, especially in handling specific configurations efficiently.

Each tool is carefully integrated into the project for optimized performance, security, and automation.