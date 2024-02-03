#!/bin/sh

docker compose up loki mythical-server mythical-requester -d && sleep 60 && docker compose up -d