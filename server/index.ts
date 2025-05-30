import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import cors from "cors";
import { initializeDatabase } from "./db";
import path from "path";
import authRoutes from "./routes/auth";
import healthRoutes from "./routes/health";

// Simple log function
const log = (message: string) => {
  console.log(`[SERVER] ${message}`);
};

// Initialize the database
await initializeDatabase();

const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? "https://www.legendsofcocktails.com"
    : "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// In development, the React app will be served by Vite
// In production, we serve the built React app as static files
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the build directory
  app.use(express.static(path.join(process.cwd(), 'dist')));
  
  // Serve the React app for any route not starting with /api
  app.get('*', (req, res) => {
    // Skip API routes
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    }
  });
} else {
  // Development - API server only, frontend served by Vite
  console.log('Running in development mode - API server only');
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Listen on process.env.PORT or 3001
  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Visit http://localhost:${port} to view the application`);
  });
})();
