import CheckboxIcon from "components/CheckboxIcon";
import OrderConfirmation from "components/OrderConfirmation";
import * as S from "./style";
import { HTMLAttributes, useEffect, useState } from "react";

import { ReactComponent as Card } from "assets/icons/credit-card.svg";
import { ReactComponent as Cash } from "assets/icons/wallet.svg";
import { OrderItemType } from "types/OrderItemType";
import { OrderType } from "types/orderType";
import { PaymentMethod } from "types/PaymentMethod";
import { useMutation } from "react-query";
import { OrderService } from "services/OrderService";
import { ErrorResponse } from "types/api/error";
import { LocalStorageHelper } from "helpers/LocalStorageHelper";
import { UserResponse } from "types/api/user";
import { LocalStorageKeys } from "types/LocalStorageKeys";
import { Order } from "types/api/order";

type CheckoutSectionType = HTMLAttributes<HTMLDivElement>

type CheckoutSectionProps = {
  orders: OrderItemType[];
  selectedTable?: number;
  activeOrderType: OrderType;
  onOrdersChange: (orders: OrderItemType[]) => void,
  onChangeActiveOrderType: (data: OrderType) => void;
  onCloseSection: () => void;

} & CheckoutSectionType

const CheckoutSection = ({ orders, onOrdersChange, onCloseSection, selectedTable, onChangeActiveOrderType, activeOrderType }: CheckoutSectionProps) => {

  const [activeMethod, setActiveMethod] = useState<PaymentMethod>();
  const [closing, setClosing] = useState<boolean>(false);
  const closeOrder = useMutation(OrderService.create, {
    onSuccess: (data: {} & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }
      onOrdersChange([]);
    },
    onError: () => {
      console.error("Erro ao fechar pedido")
    }
  })

  const HandlePaymentConfirm = () => {
    const userId = LocalStorageHelper.get<UserResponse>(LocalStorageKeys.USER)?.id || "";
    const orderRequest: Order = {
      userId,
      tableNumber:Number(selectedTable),
      products:orders,
    };
    closeOrder.mutate(orderRequest)

  }

  const handleCloseSection = () => {
    setClosing(true);
    setTimeout(onCloseSection, 800);
  }
  return (
    <S.CheckoutSection closing={closing}>
      <S.CheckoutSectionConfirmation>
        <S.BackIcon onClick={handleCloseSection} />
        <OrderConfirmation
          orders={orders}
          onOrdersChange={onOrdersChange}
        />
      </S.CheckoutSectionConfirmation>
      <S.CheckoutSectionPayment>
        <S.CheckoutSectionPaymentHead>Pagamento</S.CheckoutSectionPaymentHead>
        <S.CheckoutSectionPaymentSub>
          2 métodos de pagamento disponíveis
        </S.CheckoutSectionPaymentSub>
        <S.CheckoutSectionPaymentForm>
          <S.CheckoutSectionPaymentFormTitle>
            Método de Pagamento
          </S.CheckoutSectionPaymentFormTitle>
          <S.PaymentForm>
            <S.PaymentFormCheckbox>
              <CheckboxIcon
                onClick={() => setActiveMethod(PaymentMethod.CARD)} active={activeMethod === PaymentMethod.CARD} value="Cartão" icon={<Card />} />
              <CheckboxIcon onClick={() => setActiveMethod(PaymentMethod.CASH)} active={activeMethod === PaymentMethod.CASH} value="Dinheiro" icon={<Cash />} />
            </S.PaymentFormCheckbox>
            {activeMethod === PaymentMethod.CARD && (
              <>
                <S.PaymentFormGroup>
                  <label htmlFor="titular">Titular do cartão</label>
                  <input
                    type="text"
                    name="titular"
                    id="titular"
                    placeholder="Marcus Silva"
                  />
                </S.PaymentFormGroup>

                <S.PaymentFormGroup>
                  <label htmlFor="card">Número do cartão</label>
                  <input
                    type="text"
                    name="card"
                    id="card"
                    placeholder="5369 7644 5393 3165"
                  />
                </S.PaymentFormGroup>

                <S.PaymentFormHalf>
                  <S.PaymentFormHalfItem>
                    <label htmlFor="validity">Validade</label>
                    <input
                      type="text"
                      name="card"
                      id="validity"
                      placeholder="09/2023"
                    />
                  </S.PaymentFormHalfItem>
                  <S.PaymentFormHalfItem>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" name="cvv" id="cvv" placeholder="218" />
                  </S.PaymentFormHalfItem>
                </S.PaymentFormHalf>
              </>
            )}
          </S.PaymentForm>
        </S.CheckoutSectionPaymentForm>
        <S.PaymentActions>
          <S.PaymentActionsDetails>
            <S.PaymentActionsDetailsOrderType>
              <label htmlFor="card">Tipo de pedido</label>
              <select
                onChange={({ target }) => onChangeActiveOrderType(target.value as OrderType)}
                name="order-type"
                id="order-type"
                value={Object.values(OrderType).filter((option) => option === activeOrderType).pop()}
              >
                {Object.values(OrderType).map((value, idx) => (
                  <option
                    key={`OrderType-${idx}`}
                    value={value}
                  >{value}</option>
                ))}

              </select>
            </S.PaymentActionsDetailsOrderType>
            <S.PaymentActionsDetailsTableNumber>
              <label htmlFor="card">Número da mesa</label>
              <input
                value={selectedTable}
                type="text"
                name="table"
                id="table"
                placeholder="01"
                disabled
              />
            </S.PaymentActionsDetailsTableNumber>
          </S.PaymentActionsDetails>

          <S.PaymentActionsButtonGroup>
            <S.PaymentActionsButtonGroupCancel onClick={handleCloseSection}>
              Cancelar
            </S.PaymentActionsButtonGroupCancel>
            <S.PaymentActionsButtonGroupConfirm 
            onClick={HandlePaymentConfirm}>
              Confirmar Pagamento
            </S.PaymentActionsButtonGroupConfirm>
          </S.PaymentActionsButtonGroup>
        </S.PaymentActions>
      </S.CheckoutSectionPayment>
    </S.CheckoutSection >
  );
};

export default CheckoutSection;