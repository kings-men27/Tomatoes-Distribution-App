
import { AppDataSource } from './datasource';
import { 
  Logistics, 
  User,
  Origin, 
  Destination, 
  PackagingType, 
  Season, 
  TransportMode, 
  StorageType, 
  DamageLevel 
} from '../controllers/entity';
import { mapEntityToAiPayload, AiModelPayload } from '../validators/aiVal';

const AI_MODEL_URL = process.env.AI_MODEL_URL || 'https://your-render-ai-service.onrender.com/predict';

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function generatePlateNumber(): string {
  const states = ['LSD', 'KND', 'ABJ', 'OYO', 'ENU'];
  const prefix = getRandom(states);
  const num = getRandomNum(100, 999);
  const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${prefix}-${num}${suffix}`;
}

async function getAiPrediction(payload: AiModelPayload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for Render spin-up

  try {
    const response = await fetch(AI_MODEL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return {
      spoilageProbability: data.spoilageProbability ?? 0.35,
      prediction: data.prediction ?? 'not_spoiled',
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn(' AI Service unavailable or timing out on Render. Defaulting to local prediction.');
    return { spoilageProbability: 0.35, prediction: 'not_spoiled' };
  }
}

async function seedDatabase() {
  console.log(' Connecting to database...');
  await AppDataSource.initialize();

  const logisticsRepo = AppDataSource.getRepository(Logistics);
  const userRepo = AppDataSource.getRepository(User);

  let users = await userRepo.find();
  if (users.length === 0) {
    console.log('👤 No users found. Creating a seed user...');
    const defaultUser = userRepo.create({
      phoneNumber: '08030000000',
      role: 'FARMER',
      userName: 'Seed User',
      securityAnswer: 'Seed Answer',
    } as Partial<User>);
    const savedUser = await userRepo.save(defaultUser);
    users = [savedUser];
  }

  console.log(` Using ${users.length} user(s) for foreign key associations.`);
  console.log(' Pinged AI Model on Render (free tier cold-start may take up to 50s)...');

  const recordsToCreate = 25;
  const logisticsBatch: Logistics[] = [];

  for (let i = 0; i < recordsToCreate; i++) {
    const assignedUser = users[i % users.length];

    const quantitySentCrates = getRandomNum(10, 80);
    const quantitySentKg = quantitySentCrates * 25; // 1 standard crate = 25kg

    // Pick random DB Enum values
    const draftRecord: Partial<Logistics> = {
      originState: getRandom(Object.values(Origin)),
      destinationCity: getRandom(Object.values(Destination)),
      packagingType: getRandom(Object.values(PackagingType)),
      season: getRandom(Object.values(Season)),
      transportMode: getRandom(Object.values(TransportMode)),
      storageType: getRandom(Object.values(StorageType)),
      damageLevel: getRandom(Object.values(DamageLevel)),
      coldStorageAvailable: Math.random() < 0.3, // 30% chance of cold storage
      routeDistanceKm: getRandomNum(150, 1100),
      quantitySentCrates,
      quantitySentKg,
      hoursSinceHarvestAtDispatch: getRandomNum(4, 48),
      plateNumber: generatePlateNumber(),
      driverName: `Driver ${i + 1}`,
      driverPhoneNumber: `0803${getRandomNum(1000000, 9999999)}`,
      userId: assignedUser.id, 
    };

    // Transform DB entity draft to AI Payload format
    const aiPayload = mapEntityToAiPayload(
      draftRecord, 
      getRandom(['Unripe', 'Semi-Ripe', 'Ripe', 'Overripe'])
    );
    
    // Test AI prediction & convert probability to percentage
    const prediction = await getAiPrediction(aiPayload);
    const spoilageRatePercent = Number((prediction.spoilageProbability * 100).toFixed(2));
    
    draftRecord.spoilageRatePercent = spoilageRatePercent;

    console.log(
      `[Record ${i + 1}/${recordsToCreate}] Distance: ${draftRecord.routeDistanceKm}km | ` +
      `Qty: ${quantitySentKg}kg (${quantitySentCrates} crates) | Spoilage: ${spoilageRatePercent}% (${prediction.prediction})`
    );

    // Create TypeORM entity instance
    const entityInstance = logisticsRepo.create(draftRecord);
    logisticsBatch.push(entityInstance);
  }

  console.log(`Saving ${logisticsBatch.length} logistics records to database...`);
  await logisticsRepo.save(logisticsBatch);

  console.log(' Seeding completed successfully!');
  await AppDataSource.destroy();
}

seedDatabase().catch((err) => {
  console.error(' Seeding error:', err);
  process.exit(1);
});