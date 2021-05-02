const stripe = require('../stripe')

const createCheckoutSession = async (req, res) => {
    const domainURL = process.env.DOMAIN_URL
    const {line_items, customer_email} = req.body
   try {
        const session = await stripe.checkout.sessions.create({
            success_url: `${domainURL}/success.html`,
            cancel_url: `${domainURL}/cancel.html`,
            payment_method_types: ['card'],
            line_items,
            customer_email,
            mode: 'payment',
            // shipping_address_collection: {allowed_countries: ['GB', 'US']}
        })

        if (session){
            console.log('a new session had been created with stripe')
            console.log('Session Id: ', session.id)
            res.status(200).json({sessionId: session.id})
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ERROR: 'something goes wrong!!'})
    }
}

module.exports = createCheckoutSession