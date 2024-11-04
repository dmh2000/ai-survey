# Simple Survey App

This is a simple survey web app created using AI.

## AI

This was created using Aider and Anthropic's Claude-3-5-sonnet-20241022 model. It ook about 2 hours to complete it. I just wanted a simple survey to use at a developer meetup.

I only had to add a few of things by hand:

- added a 'survey-completed' cookie that checks if the user has already completed the survey. This is to prevent the user from completing the survey multiple times in one instance of the browser. The AI kept trying to use either the Deno Oak framework or 'Fresh-Session'. Oak conflicted with Deno-Fresh, and Free-Session was out of date. I just added a vary simple cookie to the response headers.
- found a 'bad word' list to remove them from the comments. Added it to utils and had the AI use it to clean the comments.

There is no login or registration. The 'survey-completed' cookie is set on the first page load. If the user has already completed the survey, it won't let them do it again while the same browser is running. If you kill the browser and start over it will let you complete the survey again. So don't do that.

## App Tech

- Deno
- Deno-Fresh
- Tailwind CSS
- SQLite 3

## Data

The survey data is stored in a SQLite database. The data is stored in the `data` directory or in-memory if no path is provided in utils/db.ts. The schema is in `data/schema.sql`. If the database is empty, it will be created on the first run.

The survey definition itself is defined in `data/questions.json`. The sample code creates a survey about various AI tools, models etc. But you can create your own survey by editing the JSON file. Make sure that no ID values are duplicated.

## Running the App

To run the app, you need to have Deno installed.
Then run the following command:

```bash
deno task start
```

This will start the app in development mode.

## IMPORTANT

- There are no cookies except for the survey-completed cookie.
- Nothing about the user is stored except the survey data. No login, no saving ip address or anything like that.
