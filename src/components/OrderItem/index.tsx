import { ReactComponent as Trash } from "assets/icons/trash.svg";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { OrderItemType } from "types/OrderItemType";
import { ProductResponse } from "types/api/product";
import * as S from "./style";

type DivType = ButtonHTMLAttributes<HTMLDivElement>;

export type OrderItemProps = {
  canDelete?: Boolean;
  product: ProductResponse;
  quantity: number;
  observation?: string;
  onRemoveItem?: () => void;
  onItemChange: (item: OrderItemType) => void;
} & DivType;

const OrderItem = ({
  product,
  quantity,
  observation = "",
  onRemoveItem,
  onItemChange,
  canDelete = true,
  ...props
}: OrderItemProps) => {
  const [quantityState, setQuantityState] = useState(quantity);
  const [observationState, setObservationState] = useState(observation);

  const handleQuantity = (data: number) => {
    setQuantityState(data);
  };

  const handleObservation = (data: string) => {
    setObservationState(data);
  };

  const HandleChange = (quantityParam: number, observationParam: string) => {
    onItemChange({
      product: product,
      quantity: quantityParam,
      observation: observationParam,
    });
  }

  useEffect(() => {
    handleQuantity(quantity)
  }, [quantity]);

  useEffect(() => {
    handleObservation(observation)
  }, [observation])
  return (
    <S.OrderItens {...props} role="listitem">
      <S.OrderItemLeft>
        <S.OrderItemLeftTop>
          <S.OrderItemProduct>
            <S.OrderItemProductImage
              src={product.image}
              alt={`Pizza de ${product.name}`}
            />
            <S.OrderItemProductDetails>
              <S.OrderItemProductDetailsName>
                {product.name}
              </S.OrderItemProductDetailsName>
              <S.OrderItemProductDetailsPrice>
                R$ {product.price}
              </S.OrderItemProductDetailsPrice>
            </S.OrderItemProductDetails>
          </S.OrderItemProduct>
          <S.OrderItemQuantity
            type="number"
            value={quantityState}
            onChange={({ target }) => {
              setQuantityState(Number(target.value));
              HandleChange(Number(target.value), observationState)
            }}
          />
        </S.OrderItemLeftTop>
        <S.OrderItemLeftObservation
          value={observationState}
          type="text"
          placeholder="Observações do pedido"
          onChange={({ target }) => {
            setObservationState(target.value);
            HandleChange(quantityState, target.value)
          }}
        />
      </S.OrderItemLeft>
      <S.OrderItemRight>
        <S.OrderItemRightTotalPrice>
          R$ {Number(product.price * quantityState).toFixed(2)}
        </S.OrderItemRightTotalPrice>

        {canDelete && (<S.OrderItemRightTrash onClick={onRemoveItem}>
          <Trash />
        </S.OrderItemRightTrash >
        )}
      </S.OrderItemRight>
    </S.OrderItens>
  );
};

export default OrderItem; 