// import dotenv from 'dotenv';
// import express from 'express';
// import departmentRoutes from './routes/departmentRoute';
// import cors from 'cors';
// import path from 'path';
// import {connectDB} from './config/db';
// // import db = require('./config/db.ts');

// dotenv.config();

// //app config
// const app = express();
// const PORT = process.env.PORT || 5000;

// // middleware
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({extended: true}));

// // Serve uploads statically
// app.use('/uploads', express.static(path.join('uploads')));

// // Routes
// app.use('/api/departments', departmentRoutes);

// // db connection
// connectDB();


// app.get('/', (req,  res) => {
//   res.send('✅ Server is running, i am so glad ');
// });


// app.listen(PORT, () => {
//   console.log(`🚀 Server is listening on http://localhost:${PORT}`);
// });
// //mongodb+srv://vignan:Vignan@123@cluster0.lmg3gy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



// import express from 'express';
// import mongoose from 'mongoose';
// import departmentRoutes from './routes/departmentRoute';
// import {connectDB} from './config/db';
// import path from 'path';

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploads statically
// app.use('/uploads', express.static(path.join('uploads')));

// // Routes
// app.use('/api/departments', departmentRoutes);

// // Connect to DB and start server
// // Connect to DB and start server
// mongoose.connect('mongodb://localhost:27017/vignan', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(5000, () => {
//       console.log('Server running on port 5000');
//     });
//   })
//   .catch((err) => {
//     console.log('Mongo error', err);
//   });


import express from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
// import path from 'path';
import departmentRoutes from './routes/departmentRoute';
import userRoute from './routes/userRoute';
import hostelUserRoute from './routes/hostelUserRoute';
import newsEventsRoute from './routes/newsEventsRoute';
import heroImageRoute from './routes/heroImageRoute';
import announcementRoute from './routes/announcementRoute';
import placementRoute from './routes/placementRoute';
import { s3 } from './config/spaces';
import { HeadObjectCommand, GetObjectAclCommand } from '@aws-sdk/client-s3';

dotenv.config();
const app = express();

// Middleware
// app.use((req, res, next) => {
//   console.log(`⭐ ${req.method} ${req.url}`);
//   next();
// });
// app.use(cors({ origin: true, credentials: true }));
app.use(cors({
  origin: [
    'https://admin.vignaniit.edu.in',
    'https://www.vignaniit.edu.in/',
    'https://vignaniit.edu.in/',
    'https://vignaniit.edu.in',
    'https://www.vignaniit.edu.in',
    'https://vignan.blr1.cdn.digitaloceanspaces.com/animation/lv_0_20250729191233_1.mp4',
    'https://vignan.blr1.cdn.digitaloceanspaces.com/animation/lv_0_20250728171716_1.mp4',
    'https://admin-viit.onrender.com',
    'https://viit-portal.onrender.com',
    'https://vignanwebsite.vercel.app',
    'https://vignansfrontendadmin.vercel.app',
    'https://viitadminfrontend.onrender.com',
  ],
  credentials: true
}));
// app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/department', departmentRoutes);
app.use('/api/user',userRoute);
app.use('/api/hostelUser',hostelUserRoute);
app.use('/api/newsEvents',newsEventsRoute);
app.use('/api/heroImage',heroImageRoute);
// app.use("/images",express.static('uploads'));
app.use("/api/announcement",announcementRoute);
app.use("/api/placement",placementRoute);
// app.use('')

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    // console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));

// ---- DEBUG ROUTES (development only) ----
// Returns head info and ACL for a given object key in the Spaces bucket.
// Usage: GET /debug/object-status?key=department/bosMinutes/your-key.pdf&bucket=vignan
app.get('/debug/object-status', async (req, res) => {
  const key = String(req.query.key || "");
  const bucket = String(req.query.bucket || process.env.SPACES_BUCKET || "");
  if (!key) return res.status(400).json({ error: 'key query param required' });
  if (!bucket) return res.status(400).json({ error: 'bucket not provided and SPACES_BUCKET missing' });
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    let acl: any = null;
    try {
      acl = await s3.send(new GetObjectAclCommand({ Bucket: bucket, Key: key }));
    } catch (e: any) {
      // ACL may be disallowed depending on credentials; return error string
      acl = { error: e?.name || String(e) };
    }
    return res.json({ exists: true, head, acl });
  } catch (err: any) {
    // If head fails, include the error name/message to help debugging
    return res.status(500).json({ exists: false, error: err?.name || 'Error', message: err?.message || String(err) });
  }
});
