import { MongoClient, Db, Collection } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sntgpa2005_db_user:Sanket%402508@cluster0.i6o0lrm.mongodb.net/?appName=Cluster0';
const DB_NAME = 'food_ordering';

let mongoClient: MongoClient;
let db: Db;

export async function connectMongoDB(): Promise<Db> {
  if (db) return db;
  
  mongoClient = new MongoClient(MONGODB_URI);
  await mongoClient.connect();
  db = mongoClient.db(DB_NAME);
  return db;
}

export async function disconnectMongoDB(): Promise<void> {
  if (mongoClient) {
    await mongoClient.close();
  }
}

export async function getOrdersCollection(): Promise<Collection> {
  const database = await connectMongoDB();
  return database.collection('orders');
}

export async function getOrder(orderId: string) {
  const collection = await getOrdersCollection();
  return collection.findOne({ orderId });
}

export async function getAllOrders() {
  const collection = await getOrdersCollection();
  return collection.find({}).toArray();
}

export async function deleteOrderByOrderId(orderId: string) {
  const collection = await getOrdersCollection();
  return collection.deleteOne({ orderId });
}

export async function clearAllOrders() {
  const collection = await getOrdersCollection();
  return collection.deleteMany({});
}

export async function verifyOrderExists(orderId: string): Promise<boolean> {
  const order = await getOrder(orderId);
  return !!order;
}

export async function verifyOrderDetails(orderId: string, expectedData: any): Promise<boolean> {
  const order = await getOrder(orderId);
  if (!order) return false;
  
  return (
    order.customerName === expectedData.customerName &&
    order.phone === expectedData.phone &&
    order.address.city === expectedData.address.city
  );
}
