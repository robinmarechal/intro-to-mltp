# Special instructions

## Details about the dedicated GCP instance:
 - name: clement-tntconf-demo
 - zone=europe-west9-a
 - machine-type=e2-standard-4
 - 4 vCPU, 16 GB RAM, 50 GB
 - metadata=owner=clement.duveau
 - delete-after=2024-02-15
 - enable-oslogin=true
 - termination-time=2024-02-15

## Connect remote
gcloud compute instances start clement-tntconf-demo --zone=europe-west9-a
gcloud compute ssh clement-tntconf-demo --zone=europe-west9-a
code tunnel

## Open ports
gcloud compute firewall-rules create tntconf --allow tcp --source-tags=clement-tntconf-demo --source-ranges=0.0.0.0/0 --description="Open all ports (it's an ephemeral demo)"

## Start project
sudo docker compose up

## Stop instance
sudo shutdown -h now

# TODO:
- rename beast label to endpoint in Loki ingestion (correlation metrics <-> logs). I don't understand why it's called beast while the log is stating endpoint.
- Find a way to correlate from Span to Profile ? I need to understand how the labelling works.