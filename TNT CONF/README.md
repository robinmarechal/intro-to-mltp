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

## Stop instance
sudo shutdown -h now