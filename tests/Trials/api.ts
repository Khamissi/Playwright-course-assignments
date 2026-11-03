import {test, expect, request} from '@playwright/test';

// 1- Define payload object for the API request
const logInPayload = 
{
  email: 'user@example.com',
  password: 'password123'
};

// 2- Define the token variable
let token;

// 3- Use the test.beforeAll hook to run the API request before all tests
test.beforeAll(async () => {

    // 4- Creates "context" an isolated environment for making HTTP requests.
    const apiContext = await request.newContext();

    // 5- Create response const that gets its value from the API request
    // and wait to call the api with method post for this url and the payload defined above
    const logInResponse = await apiContext.post('https://api.example.com/login', 
    {
      data: logInPayload
    }
);

// 6- Check if the response is successful
expect(logInResponse.ok()).toBeTruthy(); 

// 7- Wait the response to be converted to JSON and assign it to logInResponseJson variable
const logInResponseJson = await logInResponse.json();

// 8- Assign the token from the logInResponseJson variable to the token variable
token = logInResponseJson.token; 
    });
