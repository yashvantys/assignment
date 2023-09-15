**#Designing a database**

- #States Table

  - Create a table to store information about states, including a unique state ID, state name, and other relevant attributes.

- CREATE TABLE states (
    state_id SERIAL PRIMARY KEY,
    state_name VARCHAR(255) NOT NULL,    
);

- 2. Geographical Data Table

- Create a table to store GeoJSON data for each state. You can use a data type like jsonb to store GeoJSON data efficiently.

- CREATE TABLE geographical_data (
    geo_id SERIAL PRIMARY KEY,
    state_id INT REFERENCES states(state_id) NOT NULL,
    geo_data jsonb NOT NULL
);

- 3. Population Data Table

- Create a table to store population data. The structure of this table depends on the data in the provided CSV file

- CREATE TABLE population_data (
    person_id SERIAL PRIMARY KEY,
    state_id INT REFERENCES states(state_id) NOT NULL,   
);

- 4. Adding Indexes

- Create appropriate indexes on foreign keys and columns used frequently in queries to improve data retrieval performance.

- CREATE INDEX idx_state_id ON geographical_data(state_id);
- CREATE INDEX idx_state_id ON population_data(state_id);

**#Hosting**
- To host your Node.js API and PostgreSQL database in the cloud, you can follow these general steps
- 1. Database Hosting
    - Amazon RDS (Relational Database Service):
    - Sign in to your AWS Management Console.
    - Navigate to the Amazon RDS service.
    - Click "Create database" and choose the PostgreSQL engine.
    - Configure the database settings, including instance type, storage, and security settings.
    - Create a new database or use an existing one.
    - Launch the database instance.
    - Once the database is running, note the connection details (endpoint, username, and password).
- 2. Application Hosting
    - Sign in to your AWS Management Console.
    - Navigate to the AWS Elastic Beanstalk service.
    - Click "Create Application."
    - Choose a name for your application and select the Node.js platform.
    - Configure the environment, including instance type, database connection settings, and environment  variables.
    - Upload your Node.js application code or provide a link to your source code repository (e.g., GitHub).
    - Review the configuration and launch the application.
    - AWS Elastic Beanstalk will automatically deploy and manage your Node.js application.
- 3. Configure Environment Variables
     - Configure environment variables to store sensitive information like database credentials and API keys securely
- 4. Security and Access Control
    - Configure security groups and access control policies to restrict access to your PostgreSQL database and API endpoints as needed

#**API documentation in open api spec 3.0**
`openapi: 3.0.3
info:
  title: Population API
  version: 1.0.0
  description: An API for managing state information and population data.

paths:
  /states:
    get:
      summary: Get a list of all states
      responses:
        '200':
          description: A list of states
          content:
            application/json:
              example:
                - state_id: 1
                  state_name: "State A"
                - state_id: 2
                  state_name: "State B"
              schema:
                type: array
                items:
                  type: object
                  properties:
                    state_id:
                      type: integer
                    state_name:
                      type: string
      tags:
        - States

  /state/{stateId}:
    parameters:
      - in: path
        name: stateId
        required: true
        schema:
          type: integer
        description: The unique ID of the state
    get:
      summary: Get people living in a specific state
      responses:
        '200':
          description: A list of people in the state
          content:
            application/json:
              example:
                - person_id: 1
                  state_id: 1
                  name: "John Doe"
                - person_id: 2
                  state_id: 1
                  name: "Jane Smith"
              schema:
                type: array
                items:
                  type: object
                  properties:
                    person_id:
                      type: integer
                    state_id:
                      type: integer
                    name:
                      type: string
      tags:
        - People

tags:
  - name: States
    description: Endpoints related to states
  - name: People
    description: Endpoints related to people`

