# Setup

## Prequisites

* Installed [Docker Desktop](https://www.docker.com/products/docker-desktop)
* Installed [Mongo Compass](https://www.mongodb.com/download-center/compass?tck=docs_compass)

Add this to your hosts file:

```
127.0.0.1 mongo-rs0-1
127.0.0.1 mongo-rs0-2
127.0.0.1 mongo-rs0-3
```

Or execute:

```
sudo echo "127.0.0.1 mongo-rs0-1
127.0.0.1 mongo-rs0-2
127.0.0.1 mongo-rs0-3" | sudo tee -a /etc/hosts
```


## Start Mongo Replica Set

* Navigate to `./docker` folder
* Execute: `docker-compose up`
* Wait for it to finish setting up

### Status

```bash
docker exec docker_mongo-rs0-1 bash -c 'mongo --eval "rs.status();"'
```

## Connect with MongoDB Compass

* Open a new connection with e.g: `mongodb://mongo-rs0-1:27017,mongo-rs0-2:27018,mongo-rs0-3:27019/gv-academy-production-a?replicaSet=rs0&ssl=false`