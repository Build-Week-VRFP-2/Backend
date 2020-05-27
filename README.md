# Virtual Reality API

> ## website here https://virtual-reality01.herokuapp.com

# Auth

`Testing users:`
| | username | password |
--------------- | -------------- | ------------ |
**applicant** | patrick | patrick |
**investor** | lisa | lisapass |

## - applicant and investor register and login routes

> ### POST /api/auth/applicant/register
>
> ### POST /api/auth/investor/register

```
Expects:
{
    username: <string>,
    password: <string>,
}
```

```
Returns:
{
    "id": <integer>
    "username": <string>
}
```

<br />

> #### POST /api/auth/applicant/login
>
> #### POST /api/auth/investor/login

```
Expects:
{
    username: <string>
    password: <string>
}

Returns:
{   "user": <integer> // 4
    "token": <string>
}
```

<br />

> ## All the following routes require **`token`**

# applicants routes

## - Return all projects

> #### GET /api/applicant/projects

```
Returns:
[
    {

        "name": <string>,
        "description": <string>,
        "background": <string>,
        "city": <string>,
        "state": <string>,
        "applicant_auth_id": <integer>, // applicant id
    },
    ...
]
```

<br />

## - create new project

> #### POST /api/applicant/:id/project

```
Expects:
{
        "name": <string>,
        "description": <string>,
        "background": <string>,
        "city": <string>,
        "state": <string>,
}
```

```
Returns:
    {
        "id": <integer>,
        "name": <string>,
        "description": <string>,
        "background": <string>,
        "city": <string>,
        "state": <string>,
        "applicant_auth_id": <integer>, // applicant id
    },
    ...
```

<br />

## - Return specific project

> #### GET /api/applicant/:id/project/:project_id

```
{
        "id": <integer>,
        "name": <string>,
        "description": <string>,
        "background": <string>,
        "city": <string>,
        "state": <string>,
        "applicant_auth_id": <integer>, // applicant id
}
```

## <br />

## - Return projects from specific applicant

> #### GET /api/applicant/:id/projects

```
[
    {
         "id": <integer>,
        "name": <string>,
        "description": <string>,
        "background": <string>,
        "city": <string>,
        "state": <string>,
        "applicant_auth_id": <integer>, // applicant id
    },
    ...
]
```

<br />

## - Return project from specific applicant

> #### GET /api/applicant/:id/project/:project_id

```

    {
         "id": <integer>,
        "name": <string>,
        "description": <string>,
        "background": <string>,
        "city": <string>,
        "state": <string>,
        "applicant_auth_id": <integer>, // applicant id
    }
```

<br />

> ## All the following routes require **`applicant token`**

## - Update applicant project

> #### PUT /api/applicant/:id/project/:project_id

```
Expects:
{
        "name": <string>,
        "description": <string>,
        "background": <string>,
        "city": <string>,
        "state": <string>,
}
```

```
Returns:
{
      "id": <integer>,
        "name": <string>,
        "description": <string>,
        "background": <string>,
        "city": <string>,
        "state": <string>,
        "applicant_auth_id": <integer>, // applicant id
}
```

<br />

## - Delete project

> #### DELETE /api/applicant/:id/project/:project_id

```
Returns:
{
    "message": "project removed successfully"
}
```

<br />

## - Add applicant contact information

> #### POST /api/applicant/:id/contact

```
expects:
{
    email: <string>,
    phone_number: <integer>,
    address: <string>
}
```

```
returns:
{
      id: <integer>,
     email: <string>,
    phone_number: <integer>,
    address: <string>,
    applicant_id: <integer>
}
```

<br />

## - return applicant contact information

> #### GET /api/applicant/:id/contact

```
returns:
{
    id: <integer>,
     email: <string>,
    phone_number: <integer>,
    address: <string>,
    applicant_id: <integer>
}
```

<br />

## - Update contact information

> #### PUT /api/applicant/:id/contact

```
expects:
{
     email: <string>,
    phone_number: <integer>,
    address: <string>,
}
```

```
returns:
{
   message: successfully updated
}
```

<br />

## - Delete contact information

> #### DELETE /api/applicant/:id/contact

```
returns:
{
    "message": 'successfully deleted'
}
```

<br />
