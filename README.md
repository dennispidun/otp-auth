# OTP Auth Proxy

The One-Time-Password Authentication Proxy sends a secret to your email to let you login.
It can be combined with nginx' auth_request directive to check if the user is logged in. 

## Usage

Provide either an .env-file at /opt/app/dist/.env or provide the respective environment variables with your docker setup:

```.env
TOKEN_SECRET: MySecret123
PUBLIC_URL: http://localhost:5050
MAIL_USERNAME: username
MAIL_PASSWORD: password
MAIL_HOST: smtp-server
MAIL_FROM: "Firstname Lastname" <firstname.lastname@organization.com>
```

You can find an example nginx config in config/proxy.conf which also needs additional environment variables:

```.env
AUTH_SERVER_NAME: host.docker.internal
AUTH_SERVER_PORT: 5050
AUTH_SERVER_URL: http://localhost:5050
REDIRECT_URL: http://localhost:7070
CLIENT_ID: example-client-id
```

AUTH_SERVER_NAME and PORT are used to contact the authentication server directly. 
AUTH_SERVER_URL is used to redirect the user to the authentication server. 
If you run this in a docker setup you can configure a network and use the authentication container name as the AUTH_SERVER_NAME.