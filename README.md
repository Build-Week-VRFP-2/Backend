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

## - Add contact information

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

##  - Create a new investor

> #### POST /api/investor

```
expects:
{
    "name": <string>,
    "description": <string>,
    "city": <string>,
    "state": <string>,
    "offers_capital": <boolean>
    "offers_resources": <boolean>
    "offers_mentorship": <boolean>
}
(note at least one of the offers booleans must be true)

returns:
{
    "message": "successfully added the investor info"
    "inv_id": <integer>
}
```

##  - Create Contact info for an investor

> #### POST /api/investor/:authID/contact

```
expects:
{
    "email": <string>,
    "phone_number": <integer>,
    "address": <string>
}
```
## - (note at least one of the offers booleans must be true)
```
returns:
{
    "message": "successfully added the contact info"
}
```
<br />

## - Get investor info

> #### GET /api/investor/:authID/info/:invID

```
return example:
{
        investor_id: 1,
        name: 'example name',
        description: 'example description',       
        auth_id: 1,
        contactInfo: {
                        email: 'example@email.com',
                        phone: 3033033003,
                        address: 'example address'
                     },
        offerings: ['capital', 'mentorship',],
        saved_projects: [
                        {project 1},
                        {project 2},
                        {project 3}
                     ]
}
```
<br />

## - get dashboard (returns an array of all projects)

> #### GET /api/investor/:authID/info/:invID

<br />

## - add a project to the saved list

> #### POST /api/investor//:authID/saved/:invID

```
expects: 
{
    "applicant_id": <the id of the project you want to save>
}

returns: 
{
    message: 'heres your updated saved list',
    saved_projects: <array of that investors saved projects>
}

```

<br />

## - update investor info

> #### PUT /api/investor//:authID/info/:invID

```
expects:
{
    "name": <string>,
    "description": <string>,
    "city": <string>,
    "state": <string>,
    "offers_capital": <boolean>
    "offers_resources": <boolean>
    "offers_mentorship": <boolean>
}
(note at least one of the offers booleans must be true)

return example:
{
        investor_id: 1,
        name: 'example name',
        description: 'example description',       
        auth_id: 1,
        contactInfo: {
                        email: 'example@email.com',
                        phone: 3033033003,
                        address: 'example address'
                     },
        offerings: ['capital', 'mentorship',],
        saved_projects: [
                        {project 1},
                        {project 2},
                        {project 3}
                     ]
}

```

## - Update contact information

> #### PUT /api/investor/:authID/contact

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

## - add a project to the saved list

> #### DEL /api/investor//:authID/saved/:invID/:saveID

```

returns: 
{
    message: 'heres your updated saved list',
    saved_projects: <array of that investors saved projects>
}

```

<br />