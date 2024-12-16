# Invoice Web App

## Description
The Invoice Web App is a modern, user-friendly platform designed to simplify invoice generation and management. With a sleek interface and powerful features, this app empowers users to create, edit, send, and store invoices effortlessly. It is built with cutting-edge technologies to ensure seamless performance and scalability.

## Features
- **Create Invoices**: Easily generate detailed invoices with customizable fields.
- **Edit and Update**: Modify invoices as needed before finalizing them.
- **Send via Email**: Send invoices directly to clients using email integration.
- **Invoice Storage**: Securely store invoices for easy access and management.
- **User Authentication**: Ensure data privacy and security with robust user authentication.
- **Real-Time Previews**: Preview invoices before sending them out.

## Awesome Tech Used
| Technology            | Purpose                                |
|-----------------------|----------------------------------------|
| **Next.js 15.1 RC**  | Frontend and backend framework         |
| **NextAuth.js**       | Authentication and user management     |
| **Neo**               | Database solution                     |
| **Tailwind CSS**      | Styling framework                     |
| **ShadCN UI**         | UI components and design system       |
| **Nodemailer**        | Email integration                     |
| **jsPDF**             | PDF generation for invoices           |

## Installing and Using

### Prerequisites
- Node.js (>=16)
- npm or yarn
- A Neo database instance

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/invoice-web-app.git
   cd invoice-web-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_neo_database_url
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

### Building for Production
1. Build the app:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Start the production server:
   ```bash
   npm run start
   # or
   yarn start
   ```

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "feat: add feature-name"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
