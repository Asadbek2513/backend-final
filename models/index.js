const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');

const Admin = require('./adminSchema')(sequelize, DataTypes);
const Booking = require('./bookingSchema')(sequelize, DataTypes);
const Cart = require('./cartSchema')(sequelize, DataTypes);
const CartItem = require('./cart-itemSchema')(sequelize, DataTypes);
const Country = require('./countrySchema')(sequelize, DataTypes);
const Customer = require('./customerSchema')(sequelize, DataTypes);
const CustomerAddress = require('./customer_addressSchema')(sequelize, DataTypes);
const CustomerCard = require('./customer_cardSchema')(sequelize, DataTypes);
const DeliveryMethod = require('./delivery_methodSchema')(sequelize, DataTypes);
const Discount = require('./discountSchema')(sequelize, DataTypes);
const District = require('./districtSchema')(sequelize, DataTypes);
const Event = require('./eventSchema')(sequelize, DataTypes);
const EventType = require('./event_typeSchema')(sequelize, DataTypes);
const Flat = require('./flatSchema')(sequelize, DataTypes);
const Gender = require('./genderSchema')(sequelize, DataTypes);
const HumanCategory = require('./human_categorySchema')(sequelize, DataTypes);
const Lang = require('./langSchema')(sequelize, DataTypes);
const PaymentMethod = require('./payment_methodSchema')(sequelize, DataTypes);
const Region = require('./regionSchema')(sequelize, DataTypes);
const Seat = require('./seatSchema')(sequelize, DataTypes);
const SeatType = require('./seat_typeSchema')(sequelize, DataTypes);
const Sector = require('./sectorSchema')(sequelize, DataTypes);
const Ticket = require('./ticketSchema')(sequelize, DataTypes);
const TicketStatus = require('./ticket_statusSchema')(sequelize, DataTypes);
const TicketType = require('./ticket_typeSchema')(sequelize, DataTypes);
const Types = require('./typesSchema')(sequelize, DataTypes);
const Venue = require('./venueSchema')(sequelize, DataTypes);
const VenuePhoto = require('./venue_photoSchema')(sequelize, DataTypes);
const VenueTypes = require('./venue_typesSchema')(sequelize, DataTypes);

const models = {
    sequelize,
    Admin,
    Booking,
    Cart,
    CartItem,
    CartItems: CartItem,
    Country,
    Customer,
    CustomerAddress,
    CustomerCard,
    DeliveryMethod,
    Discount,
    District,
    Event,
    EventType,
    Flat,
    Gender,
    HumanCategory,
    Lang,
    PaymentMethod,
    Region,
    Seat,
    SeatType,
    Sector,
    Ticket,
    TicketStatus,
    TicketType,
    Types,
    Venue,
    VenuePhoto,
    VenueTypes
};

for (const model of new Set(Object.values(models))) {
    if (model && typeof model.associate === 'function') {
        model.associate(models);
    }
}

models.createSearchWhere = (Model, query, associationFields = []) => {
    const attributes = Object.entries(Model.rawAttributes);
    const textFields = attributes
        .filter(([, attribute]) => ['STRING', 'TEXT', 'CHAR'].includes(attribute.type.key))
        .map(([field]) => field);
    const conditions = textFields.map((field) => ({
        [field]: { [Op.iLike]: `%${query}%` }
    }));

    conditions.push(...associationFields.map((field) => ({
        [field]: { [Op.iLike]: `%${query}%` }
    })));

    if (/^\d+$/.test(query)) {
        const numericFields = attributes
            .filter(([, attribute]) => ['INTEGER', 'SMALLINT', 'BIGINT', 'DECIMAL', 'FLOAT', 'DOUBLE'].includes(attribute.type.key))
            .map(([field]) => field);
        conditions.push(...numericFields.map((field) => ({ [field]: Number(query) })));
    }

    return conditions.length ? { [Op.or]: conditions } : null;
};

models.getAssociationOptions = (Model, options = {}) => {
    const associations = Object.values(Model.associations);
    const foreignKeys = associations
        .filter((association) => association.associationType === 'BelongsTo')
        .map((association) => association.foreignKey);
    const excludedAttributes = [
        ...(options.attributes?.exclude || []),
        ...foreignKeys
    ];

    if (Model.rawAttributes.hashed_password) {
        excludedAttributes.push('hashed_password', 'hashed_refresh_token');
    }

    const customIncludes = options.include || [];
    const matchedIncludes = new Set();
    const include = associations.map((association) => {
        const customInclude = customIncludes.find((item) =>
            item.association === association || item.as === association.as
        );
        if (customInclude) {
            matchedIncludes.add(customInclude);
        }
        const associationOptions = { association, ...(customInclude || {}) };
        if (association.target.rawAttributes.hashed_password) {
            associationOptions.attributes = {
                ...associationOptions.attributes,
                exclude: ['hashed_password', 'hashed_refresh_token']
            };
        }
        return associationOptions;
    });

    return {
        ...options,
        attributes: {
            ...options.attributes,
            exclude: [...new Set(excludedAttributes)]
        },
        include: [...include, ...customIncludes.filter((item) => !matchedIncludes.has(item))]
    };
};

module.exports = models;
