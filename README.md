

## Getting Started

First, run the development server:

```bash
git clone https://github.com/Rifat7432/L2-B2-assignment-9-client.git
npm i
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## About This Project

The Pet Adoption Platform project is designed to facilitate the adoption of pets by connecting potential pet adopters with shelters and pet owners. The platform provides a comprehensive system for managing user registrations, pet profiles, and adoption requests, ensuring a streamlined and user-friendly experience. The project utilizes modern web technologies, including TypeScript, Express.js, Prisma, PostgreSQL, and JWT-based authentication to build a robust and secure application.





## **Endpoints:**
### **1. User Registration**

-  **Endpoint:** **`POST /api/register`**
-  **Request Body:**

```json
{
   "name": "John Doe",
   "email": "john@example.com",
   "password": "password"
}
```

-  **Response** (Response should not include the password):

```json
{
   "success": true,
   "statusCode": 201,
   "message": "User registered successfully",
   "data": {
      "id": "b9964127-2924-42bb-9970-60f93c016bvf",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### **2. User Login**

-  **Endpoint:** **`POST /api/login`**
-  **Request Body:**

```json
{
   "email": "john@example.com",
   "password": "password"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "User logged in successfully",
   "data": {
      "id": "b9964127-2924-42bb-9970-60f93c016bvf",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "<JWT token>"
   }
}
```

### **3. Add a Pet**

-  **Endpoint:** **`POST /api/pets`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Request Body:**

```json
{
   "name": "Buddy",
   "species": "dog",
   "breed": "Labrador Retriever",
   "age": 3,
   "size": "Large",
   "location": "Shelter XYZ",
   "description": "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
   "temperament": "Friendly, playful",
   "medicalHistory": "Up to date on vaccinations, neutered.",
   "adoptionRequirements": "Buddy needs a home with a fenced yard and an active family."
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 201,
   "message": "Pet added successfully",
   "data": {
      "id": "b9964127-2924-42bb-9970-60f93c016ghs",
      "name": "Buddy",
      "species": "Dog",
      "breed": "Labrador Retriever",
      "age": 3,
      "size": "Large",
      "location": "Shelter XYZ",
      "description": "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
      "temperament": "Friendly, playful",
      "medicalHistory": "Up to date on vaccinations, neutered.",
      "adoptionRequirements": "Buddy needs a home with a fenced yard and an active family.",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### **4. Get Paginated and Filtered Pets**

-  **Endpoint:** **`GET /api/pets`**

**Query Parameters for API Requests:**

When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

-  `species`: (Optional) Filter pets by species (e.g., dog, cat).
-  `breed`: (Optional) Filter pets by breed.
-  `age`: (Optional) Filter pets by age.
-  `size`: (Optional) Filter pets by size.
-  `location`: (Optional) Filter pets by location.
-  `searchTerm`: (Optional) Searches for pets based on a keyword or phrase. Only applicable to the following fields: `species`, `breed`, `location`, etc.
-  `page`: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=2
-  `limit`: (Optional) Sets the number of data per page. Default is 10. Example: ?limit=5
-  `sortBy`: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: `species`, `breed`, `size`. Example: ?sortBy=species
-  `sortOrder`: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc
-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Pets retrieved successfully",
   "meta": {
      // only for paginated result
      "page": 1,
      "limit": 10,
      "total": 20
   },
   "data": [
      {
         "id": "b9964127-2924-42bb-9970-60f93c016ghs",
         "name": "Buddy",
         "species": "Dog",
         "breed": "Labrador Retriever",
         "age": 3,
         "size": "Large",
         "location": "Shelter XYZ",
         "description": "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
         "temperament": "Friendly, playful",
         "medicalHistory": "Up to date on vaccinations, neutered.",
         "adoptionRequirements": "Buddy needs a home with a fenced yard and an active family.",
         "createdAt": "2024-03-24T12:00:00Z",
         "updatedAt": "2024-03-24T12:00:00Z"
      }
      // More pets
   ]
}
```

### 5. Update Pet profile

-  **Endpoint:** **`PUT /api/pets/:petId`**
-  **Request Headers:**
   -  **`Authorization: <JWT_TOKEN>`**
-  **Request Body:**

```json
{
   "location": "Shelter ABC"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Pet profile updated successfully",
   "data": {
      "id": "b9964127-2924-42bb-9970-60f93c016ghs",
      "name": "Buddy",
      "species": "Dog",
      "breed": "Labrador Retriever",
      "age": 3,
      "size": "Large",
      "location": "Shelter ABC",
      "description": "Buddy is a friendly and energetic Labrador Retriever. He loves playing fetch and going for long walks.",
      "temperament": "Friendly, playful",
      "medicalHistory": "Up to date on vaccinations, neutered.",
      "adoptionRequirements": "Buddy needs a home with a fenced yard and an active family.",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:05:00Z"
   }
}
```

This endpoint allows users with appropriate permissions to update the profile of a pet.

### 6. Submit Adoption Request

-  **Endpoint:** **`POST /api/adoption-request`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Request Body:**

```json
{
   "petId": "b9964127-2924-42bb-9970-60f93c016ghs",
   "petOwnershipExperience": "Previous owner of a Labrador Retriever"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 201,
   "message": "Adoption request submitted successfully",
   "data": {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
      "petId": "b9964127-2924-42bb-9970-60f93c016ghs",
      "status": "PENDING",
      "petOwnershipExperience": "Previous owner of a Labrador Retriever",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### 7. Get Adoption Requests

-  **Endpoint:** **`GET /api/adoption-requests`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Adoption requests retrieved successfully",
   "data": [
      {
         "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
         "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
         "petId": "b9964127-2924-42bb-9970-60f93c016ghs",
         "status": "PENDING",
         "petOwnershipExperience": "Previous owner of a Labrador Retriever",
         "createdAt": "2024-03-24T12:00:00Z",
         "updatedAt": "2024-03-24T12:00:00Z"
      }
      // More adoption requests
   ]
}
```

### 8. Update Adoption Request Status

-  **Endpoint:** **`PUT /api/adoption-requests/:requestId`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Request Body:**

```json
{
   "status": "APPROVED"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "Adoption request updated successfully",
   "data": {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
      "petId": "b9964127-2924-42bb-9970-60f93c016ghs",
      "status": "APPROVED",
      "petOwnershipExperience": "Previous owner of a Labrador Retriever",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### 9. Get User Information

-  **Endpoint:** **`GET /api/profile`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "User profile retrieved successfully",
   "data": {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z"
   }
}
```

### 10. Update User Information

-  **Endpoint:** **`PUT /api/profile`**
-  **Request Headers:**
   -  `Authorization: <JWT_TOKEN>`
-  **Request Body:**

```json
{
   "name": "John Doe",
   "email": "john.doe@example.com"
}
```

-  **Response:**

```json
{
   "success": true,
   "statusCode": 200,
   "message": "User profile updated successfully",
   "data": {
      "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:05:00Z"
   }
}
```




## **Project Models:**
## User Model
```
model User {
  id              String            @id @default(uuid())
  name            String
  email           String            @unique
  password        String
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  adoptionRequest AdoptionRequest[]

}
```
### Pet Model

```
model Pet {
  id                   String            @id @default(uuid())
  name                 String            @unique
  species              String
  breed                String
  age                  Int
  size                 String
  location             String
  description          String
  temperament          String
  medicalHistory       String
  adoptionRequirements String
  createdAt            DateTime          @default(now())
  updatedAt            DateTime          @updatedAt
  AdoptionRequest      AdoptionRequest[]
}
```
### Adoption Request Model

```
model AdoptionRequest {
  id                     String        @id @default(uuid())
  userId                 String
  user                   User          @relation(fields: [userId], references: [id])
  petId                  String
  pet                    Pet           @relation(fields: [petId], references: [id])
  status                 RequestStatus @default(PENDING)
  petOwnershipExperience String
  createdAt              DateTime      @default(now())
  updatedAt              DateTime      @updatedAt
}

enum RequestStatus {
  PENDING
  APPROVED
  REJECTED
}
```


## 🔗 Server is GitHub on
[(https://github.com/Rifat7432/L2-B2-assignment-9-server/)](https://github.com/Rifat7432/L2-B2-assignment-9-server/)



## MY Package
## Frontend Technology Stack Overview

Your project utilizes a modern frontend technology stack with a focus on building an interactive and responsive web application. The primary technologies and libraries used in the project include:

## Next.js
Next.js is a powerful React framework that enables several key features for your web application:

- Server-Side Rendering (SSR): Improves performance by rendering pages on the server and sending the pre-rendered HTML to the client.
- Static Site Generation (SSG): Allows generating static pages at build time, enhancing performance and SEO.
API Routes: Facilitates creating API endpoints within the same codebase.
- File-Based Routing: Simplifies routing with a filesystem-based approach, eliminating the need for a separate routing library.
- Built-In CSS and Sass Support: Supports global CSS, CSS modules, and Sass, allowing you to style your application effectively.
## Next UI
Next UI is a beautiful, fast, and modern React UI library. It provides a set of high-quality and customizable components that help you build responsive and user-friendly interfaces quickly:

- Pre-styled Components: Offers a wide range of - - pre-styled components such as buttons, cards, modals, and more, reducing the need to write custom styles.
- Light and Dark Themes: Provides built-in support for light and dark themes, allowing you to easily switch between them.
- Responsive Design: Ensures that the components are mobile-friendly and adapt well to different screen sizes.
- Tailwind CSS
- Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS:

- Utility-First Approach: Allows for rapid styling using utility classes directly in your JSX.
- Customization: Highly customizable, enabling you to define your design system in a tailwind.config.js file.
- Responsive Design: Built-in responsive utilities make it easy to design mobile-first and responsive interfaces.
TypeScript
- TypeScript is a superset of JavaScript that adds static typing, enhancing code quality and developer experience:

- Static Typing: Helps catch errors early during development, improving code reliability.
Enhanced IDE Support: Provides better IntelliSense and autocompletion in code editors.
- Type Safety: Ensures type safety, making the codebase more maintainable and scalable.
## Additional Libraries
- React Hook Form: A performant and flexible library for managing forms and validations in React applications.
- Framer Motion: A popular animation library for React, providing powerful tools for creating smooth and complex animations.
- Lucide React: A collection of beautiful and customizable icons as React components.
- Redux Toolkit: A set of tools and best practices for efficient Redux development.
- React Redux: The official React bindings for Redux, allowing you to connect your React components to the Redux store.
- Redux Persist: Helps persist and rehydrate the Redux store, maintaining the application state across sessions.
- JWT Decode: A utility for decoding JSON Web Tokens (JWTs), commonly used for authentication.
- Sonner: A library for toast notifications, providing a simple and customizable API for displaying notifications.
- Next Themes: A library for implementing dark mode and theming in Next.js applications.
- Dotenv: Loads environment variables from a .env file, making it easy to manage configuration settings.
## Project Configuration
The project is configured with the following scripts for development, building, and starting the application:

- dev: Runs the application in development mode.
- build: Builds the application for production.
- start: Starts the application in production mode.
- lint: Runs ESLint to lint the codebase and ensure code quality.
## ESLint
- ESLint is a static code analysis tool used to identify and fix problematic patterns in your JavaScript code:

- eslint-config-next: Provides ESLint configurations tailored for Next.js projects.
- Conclusion
Your Next.js project leverages a robust set of tools and libraries to build a modern, performant, and responsive web application. With the combination of Next.js, Next UI, Tailwind CSS, and TypeScript, you can create highly interactive and user-friendly interfaces while maintaining a clean and maintainable codebase. The additional libraries and tools further enhance the development experience, providing powerful capabilities for state management, form handling, animations, theming, and more.
- dotenv : This package is used  to protect environment variables.
- Moduler Code Pattern 

##  About Me
Hi,I am Md Rifat.I'm a full stack developer.
