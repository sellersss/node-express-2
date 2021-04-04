### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

  __JWT stands for JSON Web Token, an open standard that adds methods of securely transmitting information between clients as a JSON object.__

- What is the signature portion of the JWT?  What does it do?

  __Signed tokens verify the integrity of the data within it. When tokens are signed using public and private key pairs, the signature certifies that only the client who has the private key is the one that signed it.__

- If a JWT is intercepted, can the attacker see what's inside the payload?

  __The interceptor can see the payload's contents. That's why information like passwords and other sensitive information should never be sent in a JWT payload.__

- How can you implement authentication with a JWT?  Describe how it works at a high level.

  __Instead of using cookies, an application can use JWT to authenticate a user. When a user registers, the server will send a JWT back. The token is then passed back from the client to the server with each and every request made. This token is then checked against the server's private key in order to validate said token.__

- Compare and contrast unit, integration and end-to-end tests.

  - __Unit testing__:
    - This method of application testing is meant to cover the entire scope of the app. They focus on testing small units, typically classes, methods, and algorithms. They are also isolated and independent of other units/dependencies, which should be mocked. Unit tests are also notoriously faster than most other types of testing. Unit tests are very cheap and also fast.
  - __Integration testing__:
    - This method of testing covers the harmonious aspects of an application. It verifies that several units work together. Integration tests are normally slower and more costly than unit tests, but faster and cheaper than end to end tests.
  - __End to end testing__:
    - These tests will run the entire application, both frontend and backend, and your test will interact with the app just like a user would. End to end tests are the most costly and also the slowest. 

- What is a mock? What are some things you would mock?

  __A mock is a method of simulating a dependency, network interaction, random data, etc. For example, a developer can mock an API during the testing phase instead of making requests to the original API.__

- What is continuous integration?

  __CI is a development practice put in place when developers frequently push small commits of code into a shared repo. Each integration can then be verified by an automated build/test each time a PR is accepted.__

- What is an environment variable and what are they used for?

  __Environment variables are variables whose values are set outside of the program. This is typically done to keep these certain variables a secret. They are made up of a name/value pair. (ex., SECRET_KEY=24fg08n24fion;o4bfg)__

- What is TDD? What are some benefits and drawbacks?

  __Test driven development is the practice of writing tests before completing their matching methods, classes, etc.__ 
  - __Some benefits include__:
    - writing tests first requires the developers to really consider what they want from the code
    - receive fast feedback on code
    - final sprints are reduced heavily because mosts tests are alread completed
    - spend lest time in a debugger
  - __Some drawbacks include__:
    - development can be very slow
    - every member of a development team has to do it
    - tests have to be maintained when requirements change
    - continuous tweaking
    - design impacts

- What is the value of using JSONSchema for validation?

  __Server side validation is great because it helps prevent incorrect data from being committed to a database. It also helps set a clear and concise way of describing how data should be formatted in order to be used within an appliaction. It can prevent your code from being riddled with specific data validation tests.__

- What are some ways to decide which code to test?

  __Testing almost every portion of your code is an acceptable way of ensuring everything works. You should try to test any code in which other parts of the program rely on.__

- What are some differences between Web Sockets and HTTP?

  __Web Sockets are stateful while HTTP is stateless. WS must remain open in order to transfer data while an HTTP request contains everything in a single request. WS are recursive while HTTP requests are more periodic.__

- Did you prefer using Flask over Express? Why or why not (there is no right 
  answer here --- we want to see how you think about technology)?

  __I really enjoyed Flask, but Express so far has been very easy to work with. NPM is much cleaner and simpler to maintain/use than Python's "package manager", pip.__