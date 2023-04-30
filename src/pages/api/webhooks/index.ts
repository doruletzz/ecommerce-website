// import type { Stripe } from 'stripe';
// import getRawBody from 'raw-body';
// import { NextApiRequest, NextApiResponse } from 'next';
// import stripeClient from '@/lib/stripeClient';

// const STRIPE_SIGNATURE_HEADER = 'stripe-signature';

// // NB: we disable body parser to receive the raw body string. The raw body
// // is fundamental to verify that the request is genuine
// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// export default async function checkoutsWebhooksHandler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	const signature = req.headers[STRIPE_SIGNATURE_HEADER];
// 	const rawBody = await getRawBody(req);
// 	const stripe = await stripeClient();

// 	const event = stripe!.webhooks.constructEvent(
// 		rawBody,
// 		signature,
// 		webhookSecretKey
// 	);

// 	try {
// 		switch (event.type) {
// 			case StripeWebhooks.Completed: {
// 				const session = event.data.object as Stripe.Checkout.Session;
// 				const subscriptionId = session.subscription as string;

// 				const subscription = await stripe.subscriptions.retrieve(
// 					subscriptionId
// 				);

// 				await onCheckoutCompleted(session, subscription);

// 				break;
// 			}

// 			case StripeWebhooks.AsyncPaymentSuccess: {
// 				const session = event.data.object as Stripe.Checkout.Session;
// 				const organizationId = session.client_reference_id as string;

// 				await activatePendingSubscription(organizationId);

// 				break;
// 			}

// 			case StripeWebhooks.SubscriptionDeleted: {
// 				const subscription = event.data.object as Stripe.Subscription;

// 				await deleteOrganizationSubscription(subscription.id);

// 				break;
// 			}

// 			case StripeWebhooks.SubscriptionUpdated: {
// 				const subscription = event.data.object as Stripe.Subscription;

// 				await onSubscriptionUpdated(subscription);

// 				break;
// 			}

// 			case StripeWebhooks.PaymentFailed: {
// 				const session = event.data.object as Stripe.Checkout.Session;

// 				// TODO: handle this properly
// 				onPaymentFailed(session);

// 				break;
// 			}
// 		}

// 		return respondOk(res);
// 	} catch (e) {
// 		return internalServerErrorException(res);
// 	}
// }
