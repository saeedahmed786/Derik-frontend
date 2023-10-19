
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const Paypal = (props) => {
    const { PayPalScript } = window;

    // Replace with your sandbox client ID
    return (
        <PayPalScriptProvider options={{ "client-id": "Af_tZDlybGeIRne-TrRMLkBya28evKhdt2O_MPlz8NUCTW8d6aI3_N85dkdH-GGhgcW0d1WrYbG8vBDP", components: "buttons", "currency": "ILS" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    // Replace with your order creation logic
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: props.toPay, // Replace with your product's price
                                    currency_code: "ILS"
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    // Replace with your onApprove logic (e.g., handling successful payment)
                    return actions.order.capture().then(function (details) {
                        // Handle successful payment here
                        console.log("Payment completed: ", details);
                        props.onSuccess(details);
                    });
                }}
                onError={(err) => {
                    console.log("Error!", err);
                    props.transactionError(err);
                }}
            />
        </PayPalScriptProvider>
    );
};

