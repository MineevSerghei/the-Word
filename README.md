# The Word

The Word is a Bible app. It allows you to read and annotate your Bible, as well as create and follow reading plans to consistently stay in God's Word.

<a href='https://the-word.onrender.com/' target='_blank'><img src="https://img.shields.io/badge/Live%20Demo-ffd183?style=for-the-badge" /></a>

## Technologies used:



<div align='center'>
<br>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLALCHEMY-323330?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIyNTguMjMyIDM4Ljk5OSAxOTQuMzI2IDE5NC40MjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Yng9Imh0dHBzOi8vYm94eS1zdmcuY29tIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iY29sb3ItMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGJ4OnBpbm5lZD0idHJ1ZSI+CiAgICAgIDxzdG9wIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoMTE5LCAxMzYsIDExOSk7Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cGF0aCBkPSJNIDM1NS4zOTUgMTM2LjIwOSBtIC05Ny4xNjMgMCBhIDk3LjE2MyA5Ny4xNjMgMCAxIDAgMTk0LjMyNiAwIGEgOTcuMTYzIDk3LjE2MyAwIDEgMCAtMTk0LjMyNiAwIFogTSAzNTUuMzk1IDEzNi4yMDkgbSAtNjcuMjExIDAgYSA2Ny4yMTEgNjcuMjExIDAgMCAxIDEzNC40MjIgMCBhIDY3LjIxMSA2Ny4yMTEgMCAwIDEgLTEzNC40MjIgMCBaIiBzdHlsZT0iZmlsbDogdXJsKCNjb2xvci0wKTsiIGJ4OnNoYXBlPSJyaW5nIDM1NS4zOTUgMTM2LjIwOSA2Ny4yMTEgNjcuMjExIDk3LjE2MyA5Ny4xNjMgMUBhYmZkODdkZCIvPgogIDxwYXRoIGQ9Ik0gMzU1LjI2NCAxMzcuNDQ0IG0gLTQ0LjU2OCAwIGEgNDQuNTY4IDQ0LjU2OCAwIDEgMCA4OS4xMzYgMCBhIDQ0LjU2OCA0NC41NjggMCAxIDAgLTg5LjEzNiAwIFogTSAzNTUuMjY0IDEzNy40NDQgbSAtMTcuNDM4IDAgYSAxNy40MzggMTcuNDM4IDAgMCAxIDM0Ljg3NiAwIGEgMTcuNDM4IDE3LjQzOCAwIDAgMSAtMzQuODc2IDAgWiIgc3R5bGU9ImZpbGw6IHVybCgjY29sb3ItMCk7IiBieDpzaGFwZT0icmluZyAzNTUuMjY0IDEzNy40NDQgMTcuNDM4IDE3LjQzOCA0NC41NjggNDQuNTY4IDFAYTdhZjA3NDEiLz4KPC9zdmc+&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Render-323330?style=for-the-badge&logo=render&logoColor=#46E3B7" />
</div>
<br>

## Landing Page:

<img src="./react-app/public/gifs/gif1.gif" width="1000px">


## Read | Bookmark | Highlight:

<img src="./react-app/public/gifs/gif2.gif" width="1000px">

## Notes:

<img src="./react-app/public/gifs/gif3.gif" width="1000px">

## Plans:

<img src="./react-app/public/gifs/gif4.gif" width="1000px">

<br>

# Documentation

## Database Schema Design


<img src="./react-app/public/db_schema.png" width="1000px">

## API Routes

### Authentication

### -----------------------------
* URL: `/api/auth/`

* METHOD: `GET`

```
    Authenticates a user.
```

### -----------------------------
* URL: `/api/auth/login`

* METHOD: `POST`

```
    Logs a user in
```

### -----------------------------
* URL: `/api/auth/logout`

* METHOD: `GET`

```
    Logs a user out
```

### -----------------------------
* URL: `/api/auth/signup`

* METHOD: `POST`

```
    Creates a new user and logs them in
```

### -----------------------------
* URL: `/api/auth/unauthorized`

* METHOD: `GET`

```
    Returns unauthorized JSON when flask-login authentication fails
```

### Bible Routes

### -----------------------------
* URL: `/api/bible/<name>/<int:number>`

* METHOD: `GET`

```
    Get a single chapter by book name and chapter number
```

### -----------------------------
* URL: `/api/bible/books`

* METHOD: `GET`

```
    Get a list of all the books of the Bible in order
```

### Bookmarks

### -----------------------------
* URL: `/api/bookmarks`

* METHOD: `POST`

```
    Route to create a bookmark on a specific verse
```

### -----------------------------
* URL: `/api/bookmarks/<int:id>`

* METHOD: `DELETE`

```
    Route to delete a bookmark specified by id
```

### Highlights

### -----------------------------
* URL: `/api/highlights`

* METHOD: `POST`

```
    Route to create a highlight on a specific verse
```

### -----------------------------
* URL: `/api/highlights/<int:id>`

* METHOD: `DELETE`

```
    Route to delete a highlight specified by VERSE id
```

### Notes

### -----------------------------
* URL: `/api/notes`

* METHOD: `POST`

```
    Route to create a note on a specific verse
```

### -----------------------------
* URL: `/api/notes/<int:id>`

* METHOD: `PUT`

```
    Route to edit a note by note id
```

### -----------------------------
* URL: `/api/notes/<int:id>`

* METHOD: `DELETE`

```
    Route to delete a note by note id
```

### Plans

### -----------------------------
* URL: `/api/plans`

* METHOD: `GET`

```
    Route to get all PUBLIC reading plan TEMPLATES
```

### -----------------------------
* URL: `/api/plans`

* METHOD: `POST`

```
    Route to create a reading plan
```

### -----------------------------
* URL: `/api/plans/<int:id>`

* METHOD: `DELETE`

```
    Route to delete a reading plan
```

### -----------------------------
* URL: `/api/plans/<int:id>`

* METHOD: `PUT`

```
    Route to edit a reading plan
```

### -----------------------------
* URL: `/api/plans/<int:id>/image`

* METHOD: `PUT`

```
    Route to edit the image of a reading plan
```

### -----------------------------
* URL: `/api/plans/<int:id>/enroll`

* METHOD: `POST`

```
    Route to enroll (create a personal copy of) a plan by the template's plan_id
```

### -----------------------------
* URL: `/api/plans/<int:id>/unenroll`

* METHOD: `DELETE`

```
    Route to unenroll a plan by plan_id
```

### Tasks

### -----------------------------
* URL: `/api/tasks/<int:id>`

* METHOD: `PUT`

```
    Route to toggle tasks completed/not completed
```

### Users

### -----------------------------
* URL: `/api/users/`

* METHOD: `GET`

```
    Query for all users and returns them in a list of user dictionaries
```

### -----------------------------
* URL: `/api/users/<int:id>`

* METHOD: `GET`

```
    Query for a user by id and returns that user in a dictionary
```
