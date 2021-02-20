# CS481.101-Fall-2020

## Run instructions
Type `npm start`, to run the frontend. Prior to starting, set an environment variable named `REACT_APP_SIMULATION_FACTORY_URL` to the url of the backend you wish to connect to.
Or, alternatively, execute `start-aws.sh` to run the frontend, connected to the current live backend on AWS. This does not require setting an environment variable.
If you are working with a local backend branch, or for some reason the AWS backend goes down, execute `start-local.sh` to run the frontend connected to your local backend instance.