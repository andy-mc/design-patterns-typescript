namespace Auth {
  interface Handler<Request = string, Result = string> {
    setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

    handle(request: Request): Result;
  }

  interface AuthenticationHandler extends Handler<AuthenticationRequest, AuthenticationResult> { }

  type AuthenticationRequest = {
    user?: {
      name: string;
      password: string;
    }
    apiKey?: string;
    jwtToken?: string;
  };

  type AuthenticationResult = {
    success: boolean,
    message: string
  }

  abstract class AbstractAuthenticationHandler implements AuthenticationHandler {
    private nextHandler?: AuthenticationHandler;

    public setNext(handler: AuthenticationHandler): AuthenticationHandler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: AuthenticationRequest): AuthenticationResult {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return { success: false, message: 'Unable to authenticate user.' };
    }
  }

  class BasicAuthenticationHandler extends AbstractAuthenticationHandler {
    public handle(request: AuthenticationRequest): AuthenticationResult {
        const user = request.user;
        if (user?.name === 'admin' && user?.password === 'password') {
            return {
                success: true,
                message: 'User authenticated with basic authentication.'
            };
        }
        return super.handle(request);
    }
  }

  class ApiKeyAuthenticationHandler extends AbstractAuthenticationHandler {
    public handle(request: AuthenticationRequest): AuthenticationResult {
        if (request.apiKey === 'my-api-key') {
            return {
                success: true, message: 'User authenticated with API key.'
            };
        }
        return super.handle(request);
    }
  }

  class JwtAuthenticationHandler extends AbstractAuthenticationHandler {
    public handle(request: AuthenticationRequest): AuthenticationResult {
        if (request.jwtToken === 'my-jwt-token') {
            return {
                success: true, message: 'User authenticated with JWT token.'
            };
        }
        return super.handle(request);
    }
  }

  function authenticate(handler: AuthenticationHandler, requests: AuthenticationRequest[]): void {
    for (const request of requests) {
      const result = handler.handle(request);
      console.log(result);
    }
  }

  const basicAuthHandler = new BasicAuthenticationHandler();
  const apiKeyAuthHandler = new ApiKeyAuthenticationHandler();
  const jwtAuthHandler = new JwtAuthenticationHandler();

  basicAuthHandler.setNext(apiKeyAuthHandler).setNext(jwtAuthHandler);
  
  const requests: AuthenticationRequest[] = [
    { user: { name: 'admin', password: 'password' } },
    { apiKey: 'my-api-key' },
    { jwtToken: 'my-jwt-token' }
  ];

  authenticate(basicAuthHandler, requests);
}