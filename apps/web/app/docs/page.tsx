import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DocsPage = () => {
  return (
    <div className="p-8 font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-2xl">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-lg">
          Welcome to the API documentation for the OpenScoreboard project. This
          document provides information on how to use the API to manage scoreboards
          and scores. The API is designed to be simple and easy to use, allowing
          you to create, update, and retrieve scoreboards and scores with ease.
        </p>
      </section>
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Getting an API key</h1>
        <p className="text-lg">
          To use the API, you need to create a scoreboard. This will generate an
          API key that you can use to authenticate your requests. You can create a
          scoreboard by visiting the dashboard and filling out the form. Once you
          create a scoreboard, you will receive an API key that you can use in
          your requests.
        </p>
      </section>
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Upload Score</h1>
        <p className="text-lg">
          This API endpoint allows you to upload or update a score for a specific
          scoreboard using its API key. Only higher scores will be added or
          updated in the database.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Endpoint</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <code>POST /api/scoreboard/upload</code>
        </pre>

        <h3 className="text-xl font-semibold mt-6 mb-2">Request Body</h3>
        <p className="text-lg">
          The request body must be a JSON object with the following fields:
        </p>
        <table className="table-auto border-collapse border border-gray-300 dark:border-gray-700 w-full text-left mt-4">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Field</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Type</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Required</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">apiKey</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The API key of the scoreboard.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">username</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The username of the player.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">score</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">number</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The score to be uploaded.
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mt-6 mb-2">Example Request</h3>
        <SyntaxHighlighter language="json" style={oneDark}>
          {`POST /api/scoreboard/upload
Content-Type: application/json

{
  "apiKey": "example-api-key",
  "username": "player1",
  "score": 150
}`}
        </SyntaxHighlighter>

        <h3 className="text-xl font-semibold mt-6 mb-2">Responses</h3>
        <h4 className="text-lg font-semibold mt-4">Success (200)</h4>
        <p className="text-lg">If the score is successfully added or updated:</p>
        <SyntaxHighlighter language="json" style={oneDark}>
          {`{
  "id": "score1",
  "scoreboardId": "scoreboard1",
  "username": "player1",
  "score": 150,
  "createdAt": "2025-05-05T12:00:00.000Z",
  "updatedAt": "2025-05-05T12:00:00.000Z"
}`}
        </SyntaxHighlighter>

        <h4 className="text-lg font-semibold mt-4">Score Not Updated (200)</h4>
        <p className="text-lg">If the existing score is higher or equal:</p>
        <SyntaxHighlighter language="json" style={oneDark}>
          {`{
  "message": "Score not updated. Existing score is higher or equal."
}`}
        </SyntaxHighlighter>

        <h4 className="text-lg font-semibold mt-4">Errors</h4>
        <ul className="list-disc list-inside">
          <li>
            <strong>400 Bad Request</strong>: Missing or invalid input.
            <SyntaxHighlighter language="json" style={oneDark}>
              {`{
  "error": "API key, username, and score are required."
}`}
            </SyntaxHighlighter>
          </li>
          <li>
            <strong>404 Not Found</strong>: Invalid API key or scoreboard not
            found.
            <SyntaxHighlighter language="json" style={oneDark}>
              {`{
  "error": "Invalid API key or scoreboard not found."
}`}
            </SyntaxHighlighter>
          </li>
          <li>
            <strong>500 Internal Server Error</strong>: Server error.
            <SyntaxHighlighter language="json" style={oneDark}>
              {`{
  "error": "Failed to upsert score."
}`}
            </SyntaxHighlighter>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Notes</h3>
        <ul className="list-disc list-inside">
          <li>
            This endpoint does not require authentication and is accessible to
            anyone with the correct API key.
          </li>
          <li>
            Ensure that the API key is kept secure to prevent unauthorized access.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Get a Scoreboard</h1>
        <p className="text-lg">
          This API endpoint allows you to retrieve a specific scoreboard and its associated scores using the scoreboard&apos;s slug.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Endpoint</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <code>GET /api/scoreboard/get?board={"{slug}"}</code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Query Parameters</h2>
        <table className="table-auto border-collapse border border-gray-300 dark:border-gray-700 w-full text-left mt-4">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Parameter</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Type</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Required</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">board</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                The slug of the scoreboard to retrieve.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Example Request</h2>
        <SyntaxHighlighter language="bash" style={oneDark}>
          {`GET /api/scoreboard/get?board=example-scoreboard`}
        </SyntaxHighlighter>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Responses</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">Success (200)</h3>
        <p className="text-lg">If the scoreboard is successfully retrieved:</p>
        <SyntaxHighlighter language="json" style={oneDark}>
          {`{
  "id": "bfa7892d-84f7-4e96-b8f1-e0e16a76a5de",
  "name": "Example Scoreboard",
  "description": "This is an example scoreboard.",
  "owner": {
    "name": "John Doe",
    "website": "https://example.com"
  },
  "scores": [
    {
      "username": "player1",
      "score": 150
    },
    {
      "username": "player2",
      "score": 200
    }
  ]
}`}
        </SyntaxHighlighter>

        <h3 className="text-xl font-semibold mt-6 mb-2">Errors</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>400 Bad Request</strong>: Missing or invalid query parameter.
            <SyntaxHighlighter language="json" style={oneDark}>
              {`{
  "error": "Missing 'board' query parameter."
}`}
            </SyntaxHighlighter>
          </li>
          <li>
            <strong>404 Not Found</strong>: Scoreboard not found.
            <SyntaxHighlighter language="json" style={oneDark}>
              {`{
  "error": "Scoreboard not found."
}`}
            </SyntaxHighlighter>
          </li>
          <li>
            <strong>500 Internal Server Error</strong>: Server error.
            <SyntaxHighlighter language="json" style={oneDark}>
              {`{
  "error": "Failed to fetch scoreboard."
}`}
            </SyntaxHighlighter>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        <ul className="list-disc list-inside">
          <li>
            This endpoint is public and does not require authentication.
          </li>
          <li>
            Ensure the slug provided in the query parameter matches the scoreboard&apos;s slug.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default DocsPage;
