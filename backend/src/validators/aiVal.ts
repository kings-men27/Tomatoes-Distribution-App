import { 
  Origin, 
  Destination, 
  PackagingType, 
  Season, 
  TransportMode, 
  StorageType, 
  DamageLevel,
  Logistics 
} from '../controllers/entity';

export interface AiModelPayload {
  originState: string;
  destinationCity: string;
  season: string;
  packagingType: string;
  transportMode: string;
  coldStorageAvailable: 'Yes' | 'No';
  storageType: string;
  ripenessLevel: string;
  initialDamageLevel: string;
  routeDistanceKm: number;
  quantitySentCrates: number;
  hoursSinceHarvestAtDispatch: number;
}

export function mapEntityToAiPayload(
  logistics: Partial<Logistics>, 
  ripenessLevel: 'Unripe' | 'Semi-Ripe' | 'Ripe' | 'Overripe' = 'Ripe'
): AiModelPayload {
  
  // Map DB Season to AI Season
  const seasonMap: Record<Season, string> = {
    [Season.DRY]: 'Dry Season',
    [Season.RAINY]: 'Wet Season', 
  };

 
  const packagingMap: Record<PackagingType, string> = {
    [PackagingType.PLASTIC_CRATE]: 'Plastic Crate',
    [PackagingType.WOODEN_CRATE]: 'Wooden Crate',
    [PackagingType.SACK]: 'Sack/Bag',
    [PackagingType.RAFFIA_BASKET]: 'Sack/Bag',
  };

 
  const transportMap: Record<TransportMode, string> = {
    [TransportMode.OPEN_TRUCK]: 'Traditional Open Truck',
    [TransportMode.COVERED_TRUCK]: 'Covered Truck',
    [TransportMode.COLD_VAN]: 'Refrigerated Truck',
  };

  
  const storageMap: Record<StorageType, string> = {
    [StorageType.COLD]: 'Cold Room',
    [StorageType.FALSE]: 'No Storage',
    [StorageType.OPEN]: 'Ambient Storage',
    [StorageType.SHED]: 'Ambient Storage',
  };


  const damageMap: Record<DamageLevel, string> = {
    [DamageLevel.NONE]: 'Low',
    [DamageLevel.LOW]: 'Low',
    [DamageLevel.MODERATE]: 'Medium',
    [DamageLevel.SEVERE]: 'High',
  };

  
  const originState = logistics.originState === Origin.GOMBE ? 'Kano' : logistics.originState!;
  const destinationCity = logistics.destinationCity === Destination.ONITSHA ? 'Enugu' : logistics.destinationCity!;

  return {
    originState,
    destinationCity,
    season: seasonMap[logistics.season!],
    packagingType: packagingMap[logistics.packagingType!],
    transportMode: transportMap[logistics.transportMode!],
    coldStorageAvailable: logistics.coldStorageAvailable ? 'Yes' : 'No',
    storageType: storageMap[logistics.storageType!],
    ripenessLevel,
    initialDamageLevel: damageMap[logistics.damageLevel!],
    routeDistanceKm: Number(logistics.routeDistanceKm),
    quantitySentCrates: Number(logistics.quantitySentCrates),
    hoursSinceHarvestAtDispatch: Number(logistics.hoursSinceHarvestAtDispatch),
  };
}