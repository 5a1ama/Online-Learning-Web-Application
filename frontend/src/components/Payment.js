import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
 
export function Payment() {
    const Checkout = () => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
        const [currency, setCurrency] = useState(options.currency);
    
        const onCurrencyChange = ({ target: { value } }) => {
            setCurrency(value);
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: value,
                },
            });
        }
    
        const onCreateOrder = (data,actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: "0.1",
                        },
                    },
                ],
            });
        }
    
        const onApproveOrder = (data,actions) => {
            return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
            });
        }
    
        return (
            <div className="checkout">
                {isPending ? <p>LOADING...</p> : (
                    <>
                        <select value={currency} onChange={onCurrencyChange}>
                                <option value="USD">💵 USD</option>
                                <option value="EUR">💶 Euro</option>
                        </select>
                        <PayPalButtons 
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                        />
                    </>
                )}
            </div>
        );
    }
 return(
    <PayPalScriptProvider options={{
        "client-id": "AY1Tb3_Zmi9_DLq5vshKZvx7L5OxrjYpmHLya4tO_3_1OU7ayomH2h0odlAoETWeXybMcURq7UKL67Gr",
        currency: "USD",
        intent: "capture",
      }}>
        <Checkout/>
    </PayPalScriptProvider>
 )
}