# emems

<img style="margin-bottom:2ch;" src="public/img/bannerimg.png">

------

<p align="center">
<img src="https://img.shields.io/github/v/tag/dawescc/emems?label=Latest+Version">
<img src="https://img.shields.io/github/languages/count/dawescc/emems?">
<img src="https://img.shields.io/github/languages/top/dawescc/emems">
<img src="https://img.shields.io/github/commit-activity/w/dawescc/emems"><br />
<img src="https://img.shields.io/github/v/release/dawescc/emems?&label=Latest+Release&color=yellow">
<img src="https://img.shields.io/github/actions/workflow/status/dawescc/emems/prod.yaml">
<img src="https://img.shields.io/github/issues/dawescc/emems">
<img src="https://img.shields.io/github/downloads/dawescc/emems/total">
</p>

------

## What is emems?

emems is a simple web application that allows users to create and manage text memos. Users can create new memos, view all existing memos, and delete memos they no longer need.

Each memo is a **rendered element**, so the possibilities are endless; create a fullstack web app in a memo, write a poem, or make a shopping list. The only limit is your imagination, the size of your screen, and probably some other techinical limitations that I'm not aware of.

<img style="margin-bottom:2ch;" src="public/img/bounce.gif">

emems is deployed using Docker, which makes it cross-platform. It has a REST API for programmatic access, and a web UI for manual access.

### Features

- REST API
- Web UI
- Docker Deployment

### Requirements

- Docker &mdash; [Install Help](https://docs.docker.com/engine/install/)
- Docker Compose (optional) &mdash; [Install Help](https://docs.docker.com/compose/#docker-compose)

### Getting Started

To install emem, you can either build it locally or use the pre-built Docker image.

#### Docker Compose (Recommended)

The recommended method of installing is to use docker compose. You can use the provided `compose.yaml` file. or add a service on your existing file. This will create a container on port 3000 with the name emem. Feel free to modify the local port as needed.

#### Docker CLI

If you're not using compose, you can use the docker cli to run the image. This will create a container on port 3000 with the name emems. Feel free to modify the local port as needed.

```docker run -d --name emems -p 3000:80 ghcr.io/dawescc/emem:latest```

#### Building Locally

If you want to build the image locally, you can use the provided `Dockerfile`.

```docker build -t emems .```

and then deploy using the docker cli

```docker run -d --name emems -p 3000:80 emems```

### Usage

emems has a simple REST API that can be used to create, read, and delete memos. The API is accessible at `http://localhost:port/api/memos` (or whatever port you're using):

<br>

`POST /api/memos` &mdash; Create a new memo

`GET /api/memos` &mdash; Get all memos

`GET /api/memos/:id` &mdash; Get a specific memo by id &nbsp; ![SOON](https://img.shields.io/badge/-SOON-9cf)

`DELETE /api/memos/:id` &mdash; Delete a memo


#### Screenshots

```
curl -X POST -H "Content-Type: application/json" -d '{"content":"hi emems!"}' http://localhost:3000/api/memos/
```
<img style="margin-block:2ch" src="public/img/curl.png">

```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/memos/
```

<img style="margin-block:2ch" src="public/img/curl2.png">

```
curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/api/memos/1
```

<img style="margin-block:2ch" src="public/img/curl3.png">