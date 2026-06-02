# Authentication

### Auth Service
| Endpoint | HTTP Method | Description | Body |
|----------|-------------|-------------|------|
| api/register| POST        | Register a new user | {"email":"[EMAIL_ADDRESS]","password":"[PASSWORD]"} |
| api/login   | POST        | Login a user | {"email":"[EMAIL_ADDRESS]","password":"[PASSWORD]"} |
### Current user
| Endpoint | HTTP Method | Description | Body |
|----------|-------------|-------------|------|
| api/current-user| POST        | current user logged in | none |
| api/current-admin   | POST        | current admin logged in | none |

---

# Category
### Category Service
| Endpoint | HTTP Method | Description | Body |
|----------|-------------|-------------|------|
| api/category| POST        | Create a new category | {"name":"category","image":"url","parent":"catId"} |
