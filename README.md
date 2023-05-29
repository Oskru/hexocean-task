# Hex Ocean dish submitter task

This project is a React SPA that sends details about a user's dish to a given API endpoint with POST request.

## Tools / libraries used to build

- React.js
- Formik + Yup form validation
- Vite
- SASS
- Font Awesome icons

## Requirements

- Node v18.16.0
- npm v9.6.6

## Installation and starting the development server

1. Clone this repository using `git clone`
2. Navigate to the project directory.
3. Run the following command: `npm run dev`

This will start the server on `http://localhost:5173`

## Example request

An example request made by UI can look as following:

```
{
  "name": "Margherita",
  "preparation_time": "03:30:00",
  "type": "pizza",
  "no_of_slices": 6,
  "diameter": 32,
}
```

## React.js UI

<details>
<summary>
Initial look
</summary>
<img src="https://github.com/Oskru/hexocean-task/assets/78699146/4d16a602-1f6b-43cf-9b33-06bf6c5aec3a" alt="initial look"/>
</details>

<details>
<summary>
Valid pizza type form
</summary>
<img src="https://github.com/Oskru/hexocean-task/assets/78699146/1e43773f-7a13-4150-953f-ad8292d419c4" alt="valid pizza type form"/>
</details>

<details>
<summary>
Invalid form
</summary>
<img src="https://github.com/Oskru/hexocean-task/assets/78699146/9007ef3b-547a-4d37-b6d7-cee0660dc960" alt="invalid form"/>
</details>

<details>
<summary>
Form submitting state
</summary>
<img src="https://github.com/Oskru/hexocean-task/assets/78699146/4661a3f4-6d21-419d-b957-5c7a9b483ff2" alt="form submitting state"/>
</details>

<details>
<summary>
Success message on adding dish
</summary>
<img src="https://github.com/Oskru/hexocean-task/assets/78699146/87264564-1c4a-4441-a1e1-e6ccd9fe2141" alt="success message"/>
</details>

<details>
<summary>
Server response error on adding dish
</summary>
<img src="https://github.com/Oskru/hexocean-task/assets/78699146/14d35ad3-cec9-424e-956f-c2bde03108ed" alt="server error message"/>
</details>

<details>
<summary>
Client error on adding dish
</summary>
<img src="https://github.com/Oskru/hexocean-task/assets/78699146/a7e0c139-29fc-4fea-bb7f-0fe85feb45ef" alt="client error message"/>
</details>
