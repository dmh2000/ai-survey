**Prompt:**

You are a highly skilled software developer specializing in web application
development. Your task is to create a comprehensive plan for developing a modern
web application using the Claude 3.5 Sonnet framework.

Please provide the following:

1. **Project Overview:**

   - The project name is "Reno Developer AI Survey".
   - The project description is "a web application that implements a simple
     online survey about what AI tools developers use."
   - The target audience is developers who are interested in AI technologies.
   - The project goal is a simple survey for the intended audience.
   - The project is not a framework or library for general use, just a web
     application.
   - features
     - the web application will display a set of questions about AI tools
       developers use, and allow users to pick the answers they prefer, using
       checkboxes. No text input is required.
     - the web application will be responsive and accessible to users with
       disabilities.
     - the web application will support multiple users simultaneously, allowing
       for a more interactive and engaging experience.
     - the web application will have a clean and modern design, with a focus on
       user experience.
     - the web application will not require users to register or create an
       account. Users will be anonymous. the application will not try to prevent
       multiple instances of the same user from using the application.

2. **Technology Stack:**

   - the application will be built using the deno runtime and libraries.
   - the application will use the deno-Fresh framework for the front-end.
   - the application will use deno and typescript for the back-end.
   - the deno project directory structure uses the following directory conventions:
     - routes - for server-side routes
     - data - for the database and json files
     - islands - for dynamic components
     - components - for server-rendered components
     - static - for static components
   - the application will use a sqlite database for storing user data.
   - follow the deno-fresh file structure

3. **Architecture Design:**

   - the architecture will be a simple web application with a front-end and a
     back-end.
   - the front-end will be built using the deno-fresh framework.
   - the application will have three pages:
     - a home page that describes the purpose of the survey. this will be the home page, named "index.tsx" in the "routes" directory.
     - a single page with a set of questions about AI tools developers use with a checkbox for each answer. this will be the 'questions' page, named "questions.tsx" in the "routes" directory.
     - a results page that displays the results of the survey. the form of the results display will be developed later. For now just display the results in a table. this will be the 'results' page, named "results.tsx" in the "routes" directory.
     - each page will have a navigation bar at the top that allows users to
       navigate between pages.
     - the application will have a responsive design that adapts to different
       screen sizes.
     - the application will be accessible to users with disabilities.
     - the application will support multiple users simultaneously.
     - the application will have a clean and modern design.
     - the application will not require users to register or create an account.
     - the application will not try to prevent multiple instances of the same
       user from using the application. it is based on the honor system.

4. **Back End Development:**

   - The back-end will be built using deno, deno-fresh server framework, sqlite,
     and typescript.
   - the back-end will use deno-fresh server framework's principles and best
     practices which ships plain HTML to the client, then hydrates with
     JavaScript only where needed.
   - when the back-end starts it will check that the datafile exists. if the
     database does not exist, it will print an error message and exit the
     program.
   - the backend will use the "Deno Deploy" service to deploy the application.
   - the back-end will generate the questions page and the results page using a
     json file that contains the questions and answers.
   - the format of the json file will be as follows. there will be a variable
     number of questions and a variable number of answers for each question.
     this is an example only. I will provide the actual json file later.

```json
{
    "questions": [
        {
            "id": 1,
            "question": "What AI Models do you use?",
            "answers": [
                {
                    "id": 1,
                    "answer": "OpenAI",
                    "selected": false
                },
                {
                    "id": 2,
                    "answer": "Anthropic",
                    "selected": false
                }
            ]
        },
        {
            "id": 2,
            "question": "What is your favorite AI tool?",
            "answers": [
                {
                    "id": 3,
                    "answer": "Claude",
                    "selected": true
                },
                {
                    "id": 4,
                    "answer": "ChatGPT",
                    "selected": false
                }
            ]
        }
}
```

    - a list of questions, each with a unique id, a question text, and a list of answers, each with a unique id and a boolean value indicating whether the answer is selected or not.

5. **Database Schema:**

   - the back-end will use an in-memory sqlite database to store data.
   - the schema for the database will have two tables:
     - one for storing the questions.this table will have a unique id for each
       question and the question text.
       - the questions table will be named "QUESTIONS".
       - the questions table will have the following columns:
         - id: the unique id for the question.
     - one for storing answers. each answer will be associated with a question
       id. each answer will have a count the number of times it was selected by
       users.
       - the answer table will be named "ANSWERS".
       - the answer table will have the following columns:
         - id: the unique id for the answer.
         - question_id: the id of the question that the answer is associated
           with.
         - a count column that will store the number of times the answer was
           selected by users.
   - when results are submitted, the application will increase the count of
     checked answers for each question by 1.

6. **Front End Development:**

   - the front-end will be built using deno-fresh framework.
   - the front-end will use standard html forms and input elements for the user
     interface.
   - the front-end will use css for styling.
   - the front-end will use typescript for type checking.
   - the front-end will use deno-fresh framework's principles and best practices
     which ships plain HTML to the client, then hydrates with JavaScript only
     where needed.

7. **User Interface/User Experience (UI/UX):**

   - the home page in the user interface will display a brief description of the
     purpose of the survey with a link to the questions page and the results
     page.
   - the questions page in the user interface will display a list of questions,
     each with a set of possible answers.
   - the questions will have a unique id associated with them.
   - each possible answer will have a checkbox associated with it.
   - the checkboxes will have a unique id associated with them.
   - the user can select multiple answers for a given question.
   - eathe questions page will have a submit button that will submit the user's
     answers.

8. **Application Data Flow**

   - when the user submits the answers, the web application will send a POST
     request to the back-end to store the question unique ID and boolean value
     for each associated answer.
   - the back-end will then update the database with the new data.
   - when the user navigates to the results page, the application will send a
     GET request to the back-end to retrieve the data from the database.
   - the application will then display the results in a table format.

9. **Deployment and Maintenance:**

   - the application will be deployed using the "Deno Deploy" service.

10. **Security Considerations:**

    - Identify potential security risks associated with the web application.
    - Propose measures to mitigate these risks.

11. **Other Instructions:**
    - place all 'routes' in directory "routes"
    - place the database file in the "data" directory
    - place the json file in the "data" directory
    - place dynamic frontenv components in the "islands" directory
    - place server rendered components in the "components" directory
    - place static frontenv components in the "static" directory
    - adhere to the deno-fresh file structure
    - adhere to Typescript best practices. be sure to declare types for all variables and parameters
