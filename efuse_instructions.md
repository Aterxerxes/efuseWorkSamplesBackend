**Title:** eFuse API Work Sample

**Domain:** Backend

**Date:** 2021-12-03

**Author:** eFuse

# Project Background

This document describes the requirements for the eFuse backend end work sample. Applicants will be implementing a server that acts as an API for eFuse posts and users. The submitted sample will be used to evaluate an applicant’s ability to interpret project requirements and implement a production-ready solution based on a requirements document similar to that used internally to eFuse. Engineers should use this sample as a showcase of their talent and implement a solution that is as ready for production as possible.

# Objective

The objective is to implement a functioning api that could be used as the backend server to a lounge similar to that of eFuse. Engineers should be able to create text based posts and create text comments on posts. MongoDB should be used for the backing database, and Redis should be used for caching queries.

## Key Results

- Does the work sample project's title include the applicant's name?
- Can an engineer manage a post via REST calls?
  - Post, Put, Get, Delete
- Can an engineer retrieve a list of all posts via REST call?
- Can an engineer manage a "comment" on a post via REST calls?
  - Post, Put, Get, Delete
- Can an engineer retrieve all comments on a post via REST call?
- Does the solution use Mongo for the database?
- Does the solution use Redis for caching?
- Have tests been implemented?
- Has the code been supplied for review?
  - Zip, GitHub, GitLab, etc.
- Has Git been used in a meaningful way with commits for each phase to demonstrate the iterative development process?
- Has documentation been added to build/run the project?
- Does the documentation identify any assumptions made during the development process?

- (Optional) Is the api hosted somewhere that can be viewed publicly?
  - Any hosting provider is fine.
- (Optional) Has Docker Compose been used to deploy and run the API server?
  - Mongo, Redis, and the API should all be included.

# Business Goals

As an eFuse employee, I want to be able to get an idea of an applicant’s engineering capability based on this work sample to help determine if they would be a good fit for the eFuse engineering team.

# Proposed Phases

Each of the phases below are laid out in a similar manner to internal eFuse PRDs. While these are guidelines for the applicant to use when building their solution, they are simply the minimum viable product for success. Applicants can feel free to improve on items listed.

## Phase 0 - Project Setup

The goal of this phase is to setup the environment necessary to accomplish this project.

**Business Objectives:**

- As an engineer, I want to be able to run a suite of services with a few simple commands to develop and eventually deploy this project.

**Engineering Recommendations:**

- Implement an API service capable of connecting to Mongo and Redis such as Express or Nest.
- Run a local instance of Mongo database or a Docker instance that can later be used in Docker Compose.
- Run a local instance of Redis or a Docker instance that can later be used in Docker Compose.

**Definition of Done**

- There exists a service that can serve API requests.
- The service connects to an instance of Mongo.
- The service connects to an instance of Redis.
- The entire set up/start process is documented.

## Phase 1 - Create Post

The goal of this phase is to implement the ability for an engineer to create a post via POST.

**Business Objectives:**

- As an engineer, I want to be able to create a text post by making a POST request to the service.

**Engineering Recommendations:**

- Define the Mongo model.
- Create a new POST endpoint.
- Accept and return JSON data.

**Definition of Done**

- There exists a POST endpoint to create a post.
- The POST endpoint accepts a body with the following fields: `content`, `user_id`
- The posted object is stored in the Mongo database with the following fields:  `content`, `created_time`, `updated_time`, `id`, `user_id`
- The response from the post includes the newly created object's ID.

## Phase 2 - Manage Posts

The goal of this phase is to implement the ability for an engineer to manage posts via REST calls.

**Business Objectives:**

- As an engineer, I want to be able to update and fetch a text post by making REST calls to the service.
- As an engineer, I want to be able to fetch all posts by making a REST call to the service.

**Definition of Done**

- There exists a GET endpoint to retrieve a single post.
- There exists a GET endpoint to retrieve all posts.
- There exists a PUT endpoint to update a post.
  - The PUT endpoint accepts a body with appropriate fields.
  - The PUT endpoint returns the updated object.
- There exists a DELETE endpoint to remove a post.
  - The DELETE endpoint returns the deleted object.

## Phase 3 - Create and Manage Post Comments

The goal of this phase is to implement the ability for an engineer to create and manage comments via REST calls.

**Business Objectives:**

- As an engineer, I want to be able to create, update, fetch, and delete a text comment on a post by making REST calls to the service.
- As an engineer, I want to be able to fetch all comments on a post by making a REST call to the service.

**Definition of Done**

- There exists a POST endpoint to create a comment on a post.
- There exists a GET endpoint to retrieve a single comment.
- There exists a GET endpoint to retrieve all comments on a post.
- There exists a PUT endpoint to update a comment.
- There exists a DELETE endpoint to remove a comment.

## Phase 4 - Cache Results

The goal of this phase is to implement the ability to cache results from fetch queries within Redis and return when appropriate.

**Business Objectives:**

- As an engineer, I want fetch queries to be cached to prevent unnecessary calls to the database.

**Definition of Done**

- Fetch queries are cached in Redis.
- The cache is expired after a set time.
- The cache is updated when the data is updated.