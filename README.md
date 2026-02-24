MongoDB Atlas Local for local development

# Setup

## Prerequisites

* Installed [Docker Desktop](https://www.docker.com/products/docker-desktop)
* Installed [Mongo Compass](https://www.mongodb.com/download-center/compass?tck=docs_compass)
* Installed [HomeBrew](https://brew.sh/) (macOS/Linux)
* Installing only the Shell or the Database Tools:
    * Execute: `brew tap mongodb/brew`
    * Execute: `brew install mongosh` (Mongo Shell)
    * Execute: `brew install mongodb-database-tools` (Database Tools)

## SETUP MongoDB Atlas Local

__(This needs to be run ===> once <===, after setup one can just use `docker compose up -d`)__

* Be sure Docker is started (See installed Applications)

### macOS / Linux:
* Be sure `./setup.sh` is executable by executing: `chmod +x ./setup.sh`
* Execute: `./setup.sh`
* Wait for the container to become healthy (the replica set initializes automatically)

### Windows

* Start CMD Prompt
* Execute `setup.bat`

## Start MongoDB

* Execute `docker compose up -d`

## Stop MongoDB

* Execute: `docker compose stop`

## Connect with Mongo Shell

* Open a new connection with e.g: `mongosh mongodb://127.0.0.1:27017`

## Connect with MongoDB Compass

__Connection string : `mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false`__

<img src="./readme-assets/compass.png"/>

## Run a Node.js program to test

(Ensure Node.js is installed)

1. install dependencies/packages: `npm i`
1. Run test: `npm run start`

## Features

This setup uses [mongodb-atlas-local](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-docker/) which provides:

- **Replica set** — transactions and change streams work out of the box
- **Atlas Search** — full-text search indexes on your local data
- **Vector Search** — vector similarity search for AI/ML workloads

No Atlas subscription required.

# Migrating from the 3-node replica set

> **WARNING**: If you are upgrading from the previous 3-node `mongo:8.0` replica set setup, your existing data must be migrated using `mongodump` / `mongorestore`.

## Migration steps

1. **While still on the old setup**, dump your data:
   ```sh
   # Start the old containers if not running
   docker compose up -d

   # Dump all databases from the primary node
   docker exec mongo1 mongodump --out /dump
   docker cp mongo1:/dump ./dump-migration
   ```

2. **Stop and remove** the old containers and volumes:
   ```sh
   docker compose down -v
   ```

3. **Update** to the new `docker-compose.yml` (this repo) and start:
   ```sh
   docker compose up -d
   ```

4. **Restore** the data into the new container:
   ```sh
   docker cp ./dump-migration mongodb:/dump
   docker exec mongodb mongorestore --drop /dump
   ```

5. **Clean up** the migration dump:
   ```sh
   rm -rf ./dump-migration
   ```

# Resources

- [MongoDB Atlas Local Docker](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-docker/)
- [The MongoDB Homebrew Tap](https://github.com/mongodb/homebrew-brew)
- [MongoDB Docker Hub](https://hub.docker.com/r/mongodb/mongodb-atlas-local)
