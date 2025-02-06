import fs from 'fs';
import path from 'path';
import pluralize from 'pluralize';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Transaction from '../models/transactionModel';
import Course from '../models/courseModel';
import UserCourseProgress from '../models/userCourseProgressModel';

dotenv.config();

// Model mapping configuration
const MODEL_MAP: { [key: string]: mongoose.Model<any> } = {
  Course: Course,
  Transaction: Transaction,
  UserCourseProgress: UserCourseProgress,
};

const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/lms';

// MongoDB connection setup
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

// Clear existing collections
async function clearCollections() {
  const models = [Transaction, Course, UserCourseProgress];

  for (const model of models) {
    try {
      await (model as mongoose.Model<any>).deleteMany({});
      console.log(`Cleared collection: ${model.collection.name}`);
    } catch (err: any) {
      console.error(
        `Error clearing collection ${model.collection.name}:`,
        err.message
      );
    }
  }
}

// Seed data into MongoDB
async function seedData(fileName: string, filePath: string) {
  const tableName = path.basename(fileName, '.json');
  const singularName = pluralize.singular(tableName);
  const modelName =
    singularName.charAt(0).toUpperCase() + singularName.slice(1);

  const Model = MODEL_MAP[modelName];
  if (!Model) {
    console.error(`Model not found for: ${modelName}`);
    return;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    await Model.insertMany(data);
    console.log(
      `\x1b[32mSeeded ${data.length} documents to ${modelName}\x1b[0m`
    );
  } catch (err) {
    console.error(`Error seeding ${modelName}:`, err);
  }
}

// Main seed function
export default async function seed() {
  try {
    await connectDB();
    await clearCollections();

    const seedDataPath = path.join(__dirname, './data');
    const files = fs
      .readdirSync(seedDataPath)
      .filter((file) => file.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(seedDataPath, file);
      await seedData(file, filePath);
    }

    console.log('\x1b[32mDatabase seeding completed successfully\x1b[0m');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run seed when executed directly
if (require.main === module) {
  seed().catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
  });
}
