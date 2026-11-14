const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const setupSwagger = require('./swagger/swagger');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

const routes = [
    ['/admins', require('./routes/adminRoutes')],
    ['/bookings', require('./routes/bookingRoutes')],
    ['/cart-items', require('./routes/cart-itemsRoutes')],
    ['/carts', require('./routes/cartRoutes')],
    ['/countries', require('./routes/countryRoutes')],
    ['/customers', require('./routes/customerRoutes')],
    ['/customer-addresses', require('./routes/customer_addressRoutes')],
    ['/customer-cards', require('./routes/customer_cardRoutes')],
    ['/delivery-methods', require('./routes/delivery_methodRoutes')],
    ['/discounts', require('./routes/discountRoutes')],
    ['/districts', require('./routes/districtRoutes')],
    ['/events', require('./routes/eventRoutes')],
    ['/event-types', require('./routes/event_typeRoutes')],
    ['/flats', require('./routes/flatRoutes')],
    ['/genders', require('./routes/genderRoutes')],
    ['/human-categories', require('./routes/human_categoryRoutes')],
    ['/langs', require('./routes/langRoutes')],
    ['/payment-methods', require('./routes/payment_methodRoutes')],
    ['/regions', require('./routes/regionRoutes')],
    ['/seat-types', require('./routes/seat-typeRoutes')],
    ['/seats', require('./routes/seatRoutes')],
    ['/sectors', require('./routes/sectorRoutes')],
    ['/ticket-statuses', require('./routes/ticket-statusRoutes')],
    ['/ticket-types', require('./routes/ticket-typeRoutes')],
    ['/tickets', require('./routes/ticketRoutes')],
    ['/types', require('./routes/typeRoutes')],
    ['/venue-photos', require('./routes/venue-photoRoutes')],
    ['/venue-types', require('./routes/venue-typeRoutes')],
    ['/venues', require('./routes/venueRoutes')]
];

for (const [prefix, router] of routes) {
    app.use(`/api${prefix}`, router);
}

setupSwagger(app);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint topilmadi'
    });
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    console.error(error);
    return res.status(error.status || 500).json({
        success: false,
        message: error.status === 400 ? "Noto'gri so'rov" : "Ichki server xatosi"
    });
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const port = Number(process.env.PORT || 3000);
        const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Swagger UI: http://localhost:${port}/api-docs/`);
        });

        return server;
    } catch (error) {
        console.error('Failed to connect to PostgreSQL or initialize models:', error.message);
        process.exitCode = 1;
    }
};

if (require.main === module) {
    startServer();
}

module.exports = { app, startServer };
