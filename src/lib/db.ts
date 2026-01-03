import Database from 'better-sqlite3';
import path from 'path';

// Construct the path to the database file
// In production, this might need adjustment depending on where the file is located relative to the build
const dbPath = path.join(process.cwd(), 'numerology.db');

export const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');
