import { Model, DataTypes } from "sequelize"
import connectToDB from "./db.js"
import url from "url"
import util from "util"

export const db = await connectToDB("postgresql:///adjungo")

export class Client extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

Client.init(
  {
    clientId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyBio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    individual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    modelName: "client",
    sequelize: db,
  }
)

export class Pilot extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

Pilot.init(
  {
    pilotId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    part107Cert: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    modelName: "pilot",
    sequelize: db,
  }
)

export class Listing extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

Listing.init(
  {
    listingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignedPilot: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    offer: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    flightDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    multiday: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    hardwareProvided: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    softwareProvided: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    internetProvided: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    powerProvided: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    highFlying: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    blosFlying: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    payloadDropping: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    hazmatFlying: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    heavyFlying: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    nightFlying: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    crowdFlying: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    flightAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flightRadius: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    modelName: "listing",
    sequelize: db,
  }
)

export class Application extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

Application.init(
  {
    applicationId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applyingListing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    applyingPilot: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    modelName: "application",
    sequelize: db,
  }
)

export class PilotReview extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

PilotReview.init(
  {
    pilotReviewId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reviewedPilot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clientReviewing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pilotRating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    modelName: "pilotReview",
    sequelize: db,
  }
)

export class ClientReview extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

ClientReview.init(
  {
    clientReviewId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reviewedClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pilotReviewing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    clientRating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    modelName: "clientReview",
    sequelize: db,
  }
)

//client-listing relationship
Client.hasMany(Listing, { foreignKey: "clientId" })
Listing.belongsTo(Client, { foreignKey: "clientId" })

//pilot-application relationship
Pilot.hasMany(Application, { foreignKey: "applyingPilot" })
Application.belongsTo(Pilot, { foreignKey: "applyingPilot" })

//listing-application relationship
Listing.hasMany(Application, { foreignKey: "applyingListing" })
Application.belongsTo(Listing, { foreignKey: "applyingListing" })

//assignedPilot-listing relationship
Listing.hasOne(Pilot, { foreignKey: "assignedPilot" })
Pilot.belongsTo(Listing, { foreignKey: "assignedPilot" })

//pilotReviews-pilot relationship
Pilot.hasMany(PilotReview, { foreignKey: "reviewedPilot"})
PilotReview.belongsTo(Pilot, { foreignKey: "reviewedPilot"})

//pilotReviews-client relationship
Client.hasMany(PilotReview, { foreignKey: "clientReviewing"})
PilotReview.belongsTo(Client, { foreignKey: "clientReviewing"})

//clientReviews-pilot relationship
Pilot.hasMany(ClientReview, { foreignKey: "pilotReviewing"})
ClientReview.belongsTo(Pilot, { foreignKey: "pilotReviewing"})

//clientReviews-client relationship
Client.hasMany(ClientReview, { foreignKey: "reviewedClient"})
ClientReview.belongsTo(Client, { foreignKey: "reviewedClient"})

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing database...")
  await db.sync({ force: true })
  console.log("Finished syncing database.")
}
