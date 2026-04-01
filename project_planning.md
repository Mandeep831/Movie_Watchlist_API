# Capstone Project Proposal: Movie Watchlist API

## 1. Project Concept

We want to build a Movie Watchlist API. The idea is pretty simple, users can keep track
of movies they want to watch or have already watched, and they can also leave reviews for movies.

We picked this idea because we actually use apps like this (Letterboxd, etc.)
and we thought it would be fun to build something similar. It also has a clear
structure that makes sense for a REST API — there are obvious resources, the 
auth fits naturally, and there's enough complexity to make it interesting without
being overwhelming.

## 2. Scope and Functionality

### Resources

We are planning three main resources on top of the Users resource that comes with auth:

**Movies** — the main catalog of movies. Admins can add/edit/delete movies, 
everyone else can just read them. For testing purposes we'll manually add a 
set of movie data to Firestore. Automating this process using TMDB and node-cron
is something we're considering as an advanced feature in Milestone 3.

| Field | Type |
| `id` | string |
| `title` | string |
| `genre` | string |
| `releaseYear` | number |
| `description` | string |
| `createdAt` | timestamp |

**Watchlists** — each user has their own list of movies they've added, with a status
for whether they've watched it yet or not.

| Field | Type |
| `id` | string |
| `userId` | string |
| `movieId` | string |
| `status` | string |
| `createdAt` | timestamp |

**Reviews** — users can write a review and give a rating for any movie.

| Field | Type | 
| `id` | string |
| `userId` | string |
| `movieId` | string |
| `rating` | number |
| `comment` | string |
| `createdAt` | timestamp |

### Firestore Data Structure

Since Firestore is NoSQL and doesn't have built-in relationships like a relational database, 
we're handling relationships manually using IDs. A watchlist entry stores a `userId` and `movieId`
to link a user to a movie, and a review stores both a `userId` and `movieId` to connect it to the 
right user and movie. The service layer handles looking up the related data when needed.

```
users/
  {userId}/
    name, email, role, createdAt

movies/
  {movieId}/
    title, genre, releaseYear, description, createdAt

watchlists/
  {watchlistId}/
    userId, movieId, status, createdAt

reviews/
  {reviewId}/
    userId, movieId, rating, comment, createdAt
```

### Authentication and Authorization

We are using Firebase Authentication for login and registration, and Firebase custom
claims for role-based access control. There are two roles:

- **admin** — can manage the full movie catalog (add, edit, delete movies) and can 
delete any review if needed
- **user** — the default role for anyone who registers. They can manage their own 
watchlist and write/edit/delete their own reviews

Every protected endpoint checks for a valid Firebase token. On top of that, some 
endpoints also check the user's role before allowing access.

### Planned Endpoints

#### Auth
| Method | Endpoint |
| POST | `/auth/register` |
| POST | `/auth/login` |

#### Movies
| Method | Endpoint |
| GET | `/movies` |
| GET | `/movies/:id` |
| POST | `/movies` |
| PUT | `/movies/:id` |
| DELETE | `/movies/:id` |

#### Watchlists
| Method | Endpoint |
| GET | `/watchlists` |
| POST | `/watchlists` |
| PUT | `/watchlists/:id` |
| DELETE | `/watchlists/:id` |

#### Reviews
| Method | Endpoint |
| GET | `/reviews?movieId=:id` |
| POST | `/reviews` |
| PUT | `/reviews/:id` |
| DELETE | `/reviews/:id` |

### New Back-End Component

We've decided to go with **Nodemailer** as our new back-end component. The plan is to send a
welcome email to users when they register. It fits naturally into the auth flow and adds a nice
touch without being too complicated to implement. We'll document the full plan in `new-component-plan.md`
as part of Milestone 1.

## 3. Course Content Alignment

Most of this project lines up directly with what covered in class:

| Course Topic | Where we're using it |
| Node.js + TypeScript | The whole app is built with these |
| Express | Routing and middleware |
| Firebase Firestore | Database for all three resources |
| Firebase Auth | Login, registration, token verification |
| Role-based auth (custom claims) | Admin manages movies, users manage their own data |
| Layered architecture | Routes → Controllers → Services → Repositories |
| Joi | Validating request bodies |
| Error handling | Central error middleware |
| Swagger/OpenAPI | Documenting all the endpoints |
| Jest | Unit tests, aiming for 65%+ coverage |
| GitHub Actions | Auto-run tests on push/PR |
| helmet + CORS | Basic security setup |
| dotenv | Keeping secrets out of the code |

Things slightly outside normal course content:
- **Nodemailer** — new back-end component
- **TMDB** — potential Milestone 3 advanced feature

## 4. GitHub Project Setup

# Folder Structure

Basic layered structure with routes, controllers, services, repositories, 
middleware, and configuration. Includes testing, CI workflows, environment 
config, API documentation, and README.

# Branches
main — final, stable code
development — active work

## Task Summary by Milestone

# Pre-Milestone

- Project proposal

# Milestone 1

- Project setup and Firebase integration
- CRUD operations (Movies, Watchlists, Reviews)
- Validation, error handling, documentation, and testing

# Milestone 2

- Nodemailer integration
- Feature refinement and sprint demo

# Milestone 3

- Advanced features (filtering, automation)
- Security improvements and final polish

## GitHub Management

All tasks are created as GitHub issues, assigned to milestones, and tracked
using a project board with To Do, In Progress, and Done columns.