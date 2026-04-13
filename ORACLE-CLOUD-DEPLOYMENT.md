# Oracle Cloud Deployment Guide

1. Provision an Always Free compute instance using Ubuntu or Oracle Linux.
2. Install Docker and Docker Compose on the instance.
3. Clone this repository to your instance.
4. Run the deploy script:
   ```bash
   chmod +x deploy-oracle-cloud.sh
   ./deploy-oracle-cloud.sh
   ```
5. Ensure your Oracle Cloud VCN Security List has ingress rules for Port 80 (HTTP) to allow public traffic.
