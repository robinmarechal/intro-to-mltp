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
gcloud compute ssh clement-tntconf-demo.europe-west9-a.solutions-engineering-248511
code tunnel

