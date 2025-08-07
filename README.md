# Full Stack Product Segmentation Platform

A microservices-based full stack application that ingests product data from WooCommerce, stores it locally, and enables users to segment products through a rule-based editor UI.

---

## Architecture Overview

This application follows a **clean microservices architecture**, separating concerns into three distinct services:

| Service            | Description                                        |
|--------------------|----------------------------------------------------|
| **Product Service** | Ingests and stores WooCommerce products. Exposes `GET /products`. |
| **Segment Service** | Evaluates user-defined segmentation rules. Exposes `POST /segments/evaluate`. |
| **Frontend UI**     | React-based interface for product display and rule-based filtering. |

Each service is independently deployable and containerized via Docker.

---

##  Folder Structure

```bash
apps/
├── backend/
│   ├── product-service/       # WooCommerce ingestion and product APIs
│   └── segment-service/       # Rule evaluation and filtering
└── frontend/                  # React frontend with segment editor UI
README.md
```

## Live URLs

- Frontend UI:	[WooCommerce](https://convertcartassignment.onrender.com/)
-  Product API:	[Product Service API](https://api-segment-service-1-0.onrender.com)
- Segment API:	[Segment service API](https://api-product-service-1-0.onrender.com)

- [Segment Service API Docker Image](https://hub.docker.com/layers/seviths/api-segment-service/1.0/images/sha256:8332491921009828a54786bc3f272b6e1690451196aa091d662167546eff32b2?uuid=9ED7F120-60FA-4111-B2DC-AE417A468F91)
- [Product Service API Docker Image](https://hub.docker.com/layers/seviths/api-product-service/1.0/images/sha256:08f5c0bdd9ed6f383c350c4810a2f3d7005de28859e59e1439fa51da9988f0b0?uuid=9ED7F120-60FA-4111-B2DC-AE417A468F91)

**Note**: The live frontend might have some delay while fetching the results due to free tier use of Render.

---

##  Setup Instructions

### Example .env file
#### For product-service:

```env

PORT=5000
MONGODB_URI=<your_mongo_db_uri>
WC_BASE_URL=https://wp-multisite.convertcart.com
WC_KEY=ck_af82ae325fbee1c13f31eb26148f4dea473b0f77
WC_SECRET=cs_2d8cc467c5b91a80f5ed18dd3c282ee8299c9445
```
#### For segment-service:

```env
PORT=5001
MONGODB_URI=<your_mongo_db_uri>
```
The segment service only requires the database connection and port configuration.

---

### Docker Setup 

Each service is containerized with a `Dockerfile`. You do **not** need to install dependencies manually if you're using Docker.

#### Run Locally via Docker

   1. Navigate into the backend folder:
   ```
   cd apps/backend/product-service
   ```
   2.Build the Docker image:
   ```
   docker build -t product-service .
   ```
   3.Run the container:
   ```
   docker run -p 5000:5000 --env-file .env product-service
   ```

Now available at http://localhost:5000/products

Repeat for segment-service, using a different port (e.g., 5001:5001).
This will be available at: http://localhost:5001/segments/evaluate

---

### Local setup using npm

1. Navigate into the backend folder:
   ```
   cd apps/backend/product-service
   ```
2. Install all the dependencies/libraries:
  ```
  npm install
  ```
3. Run the backend service:
  ```
  npm start
  ```

Now available at http://localhost:5000/products

Repeat for segment-service, using a different port (e.g., 5001:5001).
This will be available at: http://localhost:5001/segments/evaluate

---

### Frontend Setup

This frontend is built with  Next.js and connects to both the backend services via environment variables.

1. Navigate to the frontend directory:

```bash
cd apps/frontend
```

2. Install dependencies:
   
```bash
npm install
```

3. Create a .env.local file:
Then add your backend API URLs in .env.local:

```env
NEXT_PUBLIC_API_BASE=https://api-product-service-1-0.onrender.com/          
NEXT_PUBLIC_SEGMENT_API=https://api-segment-service-1-0.onrender.com/
```
You can also use your local backend URLs during development:

```env
NEXT_PUBLIC_PRODUCT_API=http://localhost:5000
NEXT_PUBLIC_SEGMENT_API=http://localhost:5001
```

4. Start the frontend:
   
```bash
npm run dev
```
The frontend will be available at: http://localhost:3000

---

## Ingestion Logic

Products are ingested from WooCommerce using:

```
GET /wp-json/wc/v3/products
```

WooCommerce credentials are passed via query parameters.

###  Product Schema Mapping

The following fields are ingested from WooCommerce and stored in MongoDB:

| MongoDB Field     | WooCommerce Source       | Notes                          |
|-------------------|--------------------------|---------------------------------|
| `id`              | `id`                     | Product ID                     |
| `title`           | `name`                   | Product title                  |
| `price`           | `price`                  | May come as string             |
| `stock_status`    | `stock_status`           | e.g., `instock`, `outofstock`  |
| `stock_quantity`  | `stock_quantity`         | Can be `null`                  |
| `category`        | `categories[0].name`     | First category name            |
| `tags`            | `tags[].name`            | Array of tag names             |
| `on_sale`         | `on_sale`                | Boolean                        |
| `created_at`      | `date_created`           | Date Created                |

---

## Sample Input for Segmentation

price > 90
stock_status = instock
on_sale = true

---

## AI Usage Notes

This project used AI (ChatGPT) to assist with:

- Understanding microservices architecture patterns
- Generating clean folder structures and Docker configs
- Debugging .env parsing and MongoDB connection issues
- Writing boilerplate code
- Markdown formatting and README structuring
- All AI-generated code was manually reviewed, tested, and modified as necessary.
- Understanding and implementing cron jobs. I only knew cron jobs theoretically.
- Writing clean error messages and debug logics wherever necessary.
- Understanding new tags in html like <pre></pre>
