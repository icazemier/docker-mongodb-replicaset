MongoDB Replicaset for local development
# Setup
## Prerequisites

* Installed [Docker Desktop](https://www.docker.com/products/docker-desktop)
* Installed [Mongo Compass](https://www.mongodb.com/download-center/compass?tck=docs_compass)
* Installed [HomeBrew](https://brew.sh/) (macOS/Linux)
* Installing only the Shell or the Database Tools:
    * Execute: `brew tap mongodb/brew`
    * Execute: `brew install mongosh` (Mongo Shell)
    * Execute: `brew install mongodb-database-tools` (Database Tools)

## SETUP Mongo Replica Set

__(This needs to be run ===> once <===, after setup one can just use `docker compose up -d`)__

* Be sure Docker is started (See installed Applications)
* Review the environment variable currently set [.env](./.env) and change when needed
* **If upgrading from an older MongoDB version**: see [Upgrading](#upgrading) below

### macOS / Linux:
* Be sure `./setup.sh` is executable by executing: `chmod +x ./setup.sh`
* Execute: `./setup.sh`
* Wait for it to finish setting up (the replica set initializes automatically via healthchecks)

### Windows

* Start CMD Prompt
* Execute `setup.bat`

## Start Mongo Replica Set

* Execute `docker compose up -d`

## Stop Mongo Replica Set

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


# Upgrading

> **WARNING**: MongoDB does **not** support reading data files across major versions. If you are upgrading from an older MongoDB version (e.g. 6.0 to 8.0), your existing data will **not** be accessible by simply changing the version number. You must migrate your data using `mongodump` / `mongorestore`.

## Migration steps

1. **While still on the old version**, dump your data:
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

3. **Update** `.env` to the new MongoDB version and start the new cluster:
   ```sh
   docker compose up -d
   ```

4. **Restore** the data into the new cluster:
   ```sh
   docker cp ./dump-migration mongo1:/dump
   docker exec mongo1 mongorestore --drop /dump
   ```

5. **Clean up** the migration dump:
   ```sh
   rm -rf ./dump-migration
   ```

# Resources

- [The MongoDB Homebrew Tap](https://github.com/mongodb/homebrew-brew)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
