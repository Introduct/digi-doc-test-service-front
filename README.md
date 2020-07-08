# DigiDoc Test Service

This repository contains front-end part of the test service to operate on signed DigiDoc containers.
**DigiDoc Test Service** available [here](https://18.156.149.72/)

### Contents

* [Overview](#overview)
* [Features](#features)
* [Dependencies](#dependencies)
* [System requirements](#system-requirements)
* [Install](#installing)

### Overview

This application allows you to operate on DigiDoc container:

- **Upload files** - you can upload multiple files to make them signed with ID Card
- **Sign files** - you can create DigiDoc container signed with ID Card
- **Generate link** - you can generate the link and get DigiDoc container by this link
- **Download** - you can download DigiDoc container to your locale machine

### Features

* Use your ID-card with integrated DigiDoc key to sign the files;

* [Id software](https://installer.id.ee/) has to be installed on your local machine to use **DigiDoc Test Service**;

* DigiDoc4j used for digitally signing files and signature verification;

* Created container will be available for download during 48 hours

* Link generated with **Bitly** service

### Dependencies

This project is built on the following set of technologies:
- Vue 2.6.11
- Axios 0.19.2
- Vue-toasted 1.1.28
  
### System requirements

* OS ubuntu18.04 (2vCPU, 4GB RAM, 20GB HDD);
* docker v18+ [How to install docker](https://docs.docker.com/engine/install/ubuntu/)
* docker-compose v1.25+ [How to install docker-compose](https://docs.docker.com/compose/install/)
* git (usually installed by default in Ubuntu distro)

### Installing
This repository contains only frontend part. To install all components also follow READMEs in these repositories:
- [DigiDoc test service load balancer](https://github.com/Introduct/digi-doc-test-service-lb)
- [DigiDoc backend test service](https://github.com/Introduct/digi-doc-test-service)
Each componenet is installed with help of docker-compose and each repository contains corresponding compose file.

### Build frontend docker image
Clone this repo to destination host and build docker image. Dockerfile contains all neccessary build steps.
```
git clone  https://github.com/Introduct/digi-doc-test-service-front
cd 
docker build . -t digi-doc-frontend
```
### Run frontend as docker service
On destination host run compose from folder with cloned repo 
```
docker-compose -p digi-doc-test up -d
cd ..
```
