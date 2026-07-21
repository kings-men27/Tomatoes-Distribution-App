import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ValueTransformer
} from "typeorm";
import { User, Order } from "../entity"; 

// Converts PostgreSQL string decimals ("25.00") directly to TS numbers (25.00)
export const numericTransformer: ValueTransformer = {
  to: (value: number | null) => value,
  from: (value: string | null) => (value === null ? 0 : parseFloat(value)),
};

export enum Destination {
  LAGOS = 'Lagos',
  IBADAN = 'Ibadan',
  PORT_HARCOURT = 'Port Harcourt',
  ONITSHA = 'Onitsha'
}

export enum PackagingType {
  SACK = 'Sack',
  RAFFIA_BASKET = 'Raffia Basket',
  PLASTIC_CRATE = 'Plastic crate',
  WOODEN_CRATE = 'Wooden crate'
}

export enum Origin {
  KANO = 'Kano',
  KADUNA = 'Kaduna',
  GOMBE = 'Gombe',
  PLATEAU = 'Plateau'
}

export enum Season {
  DRY = "Dry Season",
  RAINY = "Rainy Season"
}

export enum TransportMode {
  COVERED_TRUCK = "Covered Truck",
  COLD_VAN = "Refrigerated Reefer Van",
  OPEN_TRUCK = "Traditional Open Truck"
}

export enum StorageType {
  COLD = "Cold Storage",
  FALSE = "No Storage",
  OPEN = "Open Storage",
  SHED = "Shaded Storage"
}

export enum DamageLevel {
  LOW = "Low",
  MODERATE = "Moderate",
  NONE = "None",
  SEVERE = "Severe"
}

@Entity('logistics')
export class Logistics {
  @PrimaryGeneratedColumn('uuid')
  logisticId!: string;

  @Column({ type: 'enum', enum: Origin })
  originState!: Origin;

  @Column({ type: 'enum', enum: Destination })
  destinationCity!: Destination;

  @Column({ type: 'varchar', nullable: true })
  destinationState?: string;

  @Column({ 
    type: 'decimal', 
    precision: 5, 
    scale: 2, 
    default: 0, 
    transformer: numericTransformer 
  })
  spoilageRatePercent!: number;

  @Column({ type: 'varchar', nullable: true, default: 'Not Spoiled' })
  spoilageStatusLabel!: string;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    default: 0, 
    transformer: numericTransformer 
  })
  quantitySentKg!: number;

  @Column({ type: 'int' })
  quantitySentCrates!: number;

  @Column({ type: 'enum', enum: PackagingType })
  packagingType!: PackagingType;

  @Column({ type: 'enum', enum: Season })
  season!: Season;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    transformer: numericTransformer 
  })
  routeDistanceKm!: number;

  @Column({ type: 'enum', enum: TransportMode })
  transportMode!: TransportMode;

  @Column({ 
    type: 'decimal', 
    precision: 5, 
    scale: 2, 
    transformer: numericTransformer 
  })
  hoursSinceHarvestAtDispatch!: number;

  // Added for Dashboard Bottleneck Leaderboard
  @Column({ 
    type: 'decimal', 
    precision: 5, 
    scale: 2, 
    default: 0, 
    transformer: numericTransformer 
  })
  checkpointDelayHours!: number;

  // Added for Dashboard Corridor Temperature Monitoring
  @Column({ 
    type: 'decimal', 
    precision: 5, 
    scale: 2, 
    default: 25, 
    transformer: numericTransformer 
  })
  averageTemperatureC!: number;

  @Column({ type: 'boolean', default: false })
  coldStorageAvailable!: boolean;

  @Column({ type: 'enum', enum: StorageType, nullable: true })
  storageType!: StorageType;

  @Column({ type: 'enum', enum: DamageLevel, default: DamageLevel.NONE })
  damageLevel!: DamageLevel;

  @Column({ type: 'varchar' })
  plateNumber!: string;

  @Column({ type: 'varchar', nullable: true })
  driverName?: string;

  @Column({ type: 'varchar', nullable: true })
  driverPhoneNumber?: string;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    default: 0, 
    transformer: numericTransformer 
  })
  pricePerCrateNgn!: number;

  @Column({ 
    type: 'decimal', 
    precision: 12, 
    scale: 2, 
    default: 0, 
    transformer: numericTransformer 
  })
  deliveredRevenueNgn!: number;

  // FOREIGN KEY COLUMNS
  @Column({ type: 'uuid', nullable: true })
  userId?: string;

  @Column({ type: 'uuid', nullable: true })
  orderId?: string;

  // RELATIONSHIPS
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToOne(() => Order, (order) => order.logistics, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'orderId' })
  order?: Order;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}