

# Production Line Management System

A comprehensive manufacturing workflow management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that enables tracking of production orders, materials, and workstations with role-based access control.

## Features

### Role-Based Access
- **Manager Dashboard**
  - Create and delete production orders
  - View analytics and metrics
  - Monitor material stock levels
  - Access all workstation data

- **Operator Dashboard**
  - Update order statuses
  - Log material usage
  - View assigned production orders
  - Monitor active workstations

### Core Functionality
- **Production Orders**
  - Custom auto-incrementing IDs (PROD-001)
  - Priority levels (High/Medium/Low)
  - Status tracking (Planned → In Production → Quality Check → Completed)
  - Material usage logging
  - Workstation assignment

- **Materials Management**
  - Real-time stock tracking
  - Minimum stock level alerts
  - Usage history per order

- **Analytics**
  - Order status distribution
  - Material consumption metrics
  - Workstation utilization

### Technical Implementation
- JWT authentication
- Redux Toolkit for state management
- Shadcn UI components
- Responsive design
- Real-time updates

## Technologies Used

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Shadcn UI
- TailwindCSS
- Recharts for analytics

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Bcrypt
- Express Validator

## Live Demo
- Frontend: [https://product-line-management.vercel.app](https://product-line-management.vercel.app)
- Backend: [https://product-line-management-backend.onrender.com](https://product-line-management-backend.onrender.com)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Product-Line-Management.git
cd Product-Line-Management
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Configure environment variables

Create `.env` in server directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Create `.env` in client directory:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development servers

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## API Documentation

### Auth Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Production Orders
- `GET /api/orders` - Get all orders (with filters)
- `POST /api/orders` - Create new order (Manager only)
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order (Manager only)

### Materials
- `GET /api/materials` - Get all materials
- `PUT /api/materials/:id` - Update material stock

### Analytics
- `GET /api/analytics/overview` - Get dashboard metrics

### Workstations
- `GET /api/workstations` - Get all workstations
I'll help you add the Postman collection section to your README.md. Here's how to add it:

### Postman Collection
You can import the complete API collection into Postman using this link:
[Download Postman Collection](./postman/Production_Line_API.postman_collection.json)

To use the collection:
1. Download the JSON file
2. Open Postman
3. Click "Import" button
4. Drag and drop the JSON file or browse to its location
5. The collection will be imported with all endpoints

### Environment Variables
The collection uses environment variables. Create two environments in Postman:

**Development**
```json
{
  "baseUrl": "http://localhost:5000/api",
  "token": "your_jwt_token_after_login"
}
```

**Production**
```json
{
  "baseUrl": "https://product-line-management-backend.onrender.com/api",
  "token": "your_jwt_token_after_login"
}
```

### Available Endpoints

#### Auth
- **Register User**
  - `POST {{baseUrl}}/auth/register`
  - Body:
    ```json
    {
      "username": "manager1",
      "email": "manager@example.com",
      "password": "password123",
      "role": "Manager",
      "department": "Production"
    }
    ```

- **Login**
  - `POST {{baseUrl}}/auth/login`
  - Body:
    ```json
    {
      "email": "manager@example.com",
      "password": "password123"
    }
    ```

#### Orders
- **Get All Orders**
  - `GET {{baseUrl}}/orders`
  - Headers: `Authorization: Bearer {{token}}`

- **Create Order (Manager Only)**
  - `POST {{baseUrl}}/orders`
  - Headers: `Authorization: Bearer {{token}}`
  - Body:
    ```json
    {
      "productName": "Steel Frame",
      "quantity": 100,
      "priority": "High",
      "workstationId": "workstation_id_here",
      "materialsUsed": [
        {
          "materialId": "material_id_here",
          "quantity": 50
        }
      ]
    }
    ```

#### Materials
- **Get All Materials**
  - `GET {{baseUrl}}/materials`
  - Headers: `Authorization: Bearer {{token}}`

- **Update Material Stock**
  - `PUT {{baseUrl}}/materials/:id`
  - Headers: `Authorization: Bearer {{token}}`
  - Body:
    ```json
    {
      "currentStock": 500,
      "minimumStockLevel": 100
    }
    ```

#### Analytics
- **Get Overview**
  - `GET {{baseUrl}}/analytics/overview`
  - Headers: `Authorization: Bearer {{token}}`

## Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String,
  role: Enum['Manager', 'Operator'],
  department: String
}
```

### Production Order Model
```javascript
{
  orderId: String,
  productName: String,
  quantity: Number,
  priority: Enum['High', 'Medium', 'Low'],
  status: Enum['Planned', 'In Production', 'Quality Check', 'Completed'],
  materialsUsed: Array,
  workstationId: ObjectId,
  startDate: Date,
  endDate: Date,
  createdBy: ObjectId
}
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License

## Contact
Your Name - piyushdhondge03@gmail.com
Project Link: [https://github.com/yourusername/Product-Line-Management](https://github.com/yourusername/Product-Line-Management)

## Acknowledgments
- Shadcn UI for the component library
- Redux Toolkit for state management
- MongoDB Atlas for database hosting
- Vercel and Render for deployment
