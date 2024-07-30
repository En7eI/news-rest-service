# news-rest-service

This project is a simple REST API for news built with Node.js, Koa, and MongoDB. The API allows you to create, read, update, and delete news articles. It also supports sorting and filtering of news articles by date and title.

## Requirements

- Docker
- Docker Compose

## Setup

### Clone the Repository

```bash
git clone https://github.com/En7eI/news-rest-service.git
cd news-rest-service
```

### Start the Application

```bash
docker-compose up --build
```

This command will build the Docker images and start the containers for the application and MongoDB. The API will be accessible at http://localhost:3000.

### Stop the Application

```bash
docker-compose down
```

## API Endpoints

### Get all endpoints

```http
GET /news
```

### Create news

```http
POST /news
Content-Type: application/json
{
  "date": "2024-07-30",
  "title": "News Title",
  "shortDescription": "Short description of the news",
  "text": "Full text of the news"
}
```

### Get news by ID

```http 
GET /news/{id}
```

### Update news

```http
PUT /news/{id}
Content-Type: application/json
{
  "date": "2024-07-30",
  "title": "Updated Title",
  "shortDescription": "Updated short description",
  "text": "Updated text"
}
```

### Delete news

```http
DELETE /news/{id}
```

### Sorting and Filtering

You can sort and filter news articles by date and title using query parameters.

#### Sorting

```http
GET /news?sort=title:asc
GET /news?sort=date:desc
```

#### Filtering

```http
GET /news?filter=example
```

### Testing

#### Create news

```bash
curl -X POST http://localhost:3000/news -H "Content-Type: application/json" -d '{"date":"2024-07-30","title":"News Title","shortDescription":"Short description of the news","text":"Full text of the news"}'
```

#### Get all news 

```bash
curl http://localhost:3000/news
```

#### Get news by id

```bash
curl http://localhost:3000/news/{id}
```

#### Update news

```bash
curl -X PUT http://localhost:3000/news/{id} -H "Content-Type: application/json" -d '{"date":"2024-07-30","title":"Updated Title","shortDescription":"Updated short description","text":"Updated text"}'
```

#### Delete news

```bash 
curl -X DELETE http://localhost:3000/news/{id}
```