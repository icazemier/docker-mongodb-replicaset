@echo off
 
set DELAY=10
 
docker-compose up -d
 
echo "****** Waiting for %DELAY% seconds for containers to go up ******"
ping 127.0.0.1 -n %DELAY% > nul
 
docker exec -it mongo1 /bin/sh /scripts/rs-init.sh