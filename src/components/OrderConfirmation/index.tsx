import OrderItem from "components/OrderItem";
import OrderItemList from "components/OrderItemList/Index";
import { HTMLAttributes, useEffect, useState } from "react";
import { OrderItemType } from "types/OrderItemType";
import { OrderType } from "types/orderType";
import * as S from "./style";

type OrderConfirmationType = HTMLAttributes<HTMLDivElement>;

type OrderConfirmationsProps = {
    orders: OrderItemType[];
    onOrdersChange: (orders: OrderItemType[]) => void;

} & OrderConfirmationType;


const OrderConfirmation = ({ orders, onOrdersChange }: OrderConfirmationsProps) => {
    const price = orders
        .map((i) => i.product.price * i.quantity)
        .reduce((a, b) => a + b, 0);

    const [priceState, setPriceState] = useState(price);

    const handleChange = (data: OrderItemType) => {
        const list = orders.map((item) =>
            item.product.id === data.product.id ? data : item
        );
        onOrdersChange(list)
    }
    useEffect(() => {
        setPriceState(price)
    },
        [orders, price])
    return (
        <S.OrderConfirmation>
            <S.OrderConfirmationHead>Confirmação</S.OrderConfirmationHead>
            <S.OrderConfirmationSub>Detalhes do pedido</S.OrderConfirmationSub>
            <OrderItemList
                list={orders.map((item, index) =>(
            <OrderItem
                onItemChange={handleChange}
                product={item.product}
                quantity={item.quantity}
                observation={item.observation}
                key={`OrderConfirmation-${index}`}
                canDelete={false}
            />
                ))}
            footer={
                <S.OrderConfirmationFooter>
                    <S.OrderConfirmationFooterRow>
                        <span>Subtotal</span>
                        <span>R${priceState.toFixed(2)}</span>
                    </S.OrderConfirmationFooterRow>
                </S.OrderConfirmationFooter>
            } />
        </S.OrderConfirmation>
    );
}

export default OrderConfirmation;