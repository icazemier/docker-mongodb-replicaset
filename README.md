# Setup

## Prequisites

* Installed [Docker Desktop](https://www.docker.com/products/docker-desktop)
* Installed [Mongo Compass](https://www.mongodb.com/download-center/compass?tck=docs_compass)
* Installed [HomeBrew](https://brew.sh/)
* Installing only the Shell or the Database Tools:
    * Execute: `brew tap mongodb/brew`
    * Execute: `brew install mongosh` (Mongo Shell)
    * Execute: `brew install mongodb-database-tools` (Database Tools)

## SETUP Mongo Replica Set

(This needs to be run once, after setup one can just use e.g. `docker-compose up -d`)

* Be sure Docker is started (See installed Applications)
* Be sure `./setup.sh` is executable by executing: `chmod +x ./setup.sh`
* Execute: `./setup.sh`
* Wait for it to finish setting up

## Start Mongo Replica Set

* Execute `docker-compose up -d`
## Stop Mongo Replica Set

* Execute: `docker-compose stop`

### Status

```bash
docker exec mongo1 bash -c 'mongosh --eval "rs.status();"'
```

## Connect with Mongo Shell

* Open a new connection with e.g: `mongosh mongodb://127.0.0.1:27017`

## Connect with MongoDB Compass

<img src="./readme-assets/compass.png"/>

## Run a Node.js program to test

(Ensure Node.js is installed)

1. install dependencies/packages: `npm i`
1. Run test: `npm run start`


# Resources

- [The MongoDB Homebrew Tap](https://github.com/mongodb/homebrew-brew)
- [Blog: Create a replica set in MongoDB with Docker Compose (ERIC CABREL TIOGO, 1 NOV 2021)](https://blog.tericcabrel.com/mongodb-replica-set-docker-compose/)