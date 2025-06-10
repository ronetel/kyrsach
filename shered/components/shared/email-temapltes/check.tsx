export const getOrderReceiptTemplate = (
  orderId: number,
  items: any[],
  totalAmount: number,
  address: string,
  fullName: string,
  email: string,
  phone: string,
  comment?: string
): string => {
  const itemsList = items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${
            item.productItem?.Product?.name || 'Товар не найден'
          }</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${
            item.quantity
          }</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${
            item.productItem?.Price * item.quantity || 0
          } ₽</td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #2563eb; text-align: center;">Чек за заказ #${orderId}</h2>
      <p style="color: #64748b; text-align: center;">Спасибо за ваш заказ в GreenBite!</p>

      <h3 style="color: #1e293b; margin-top: 20px;">Детали заказа</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="padding: 8px; text-align: left;">Товар</th>
            <th style="padding: 8px; text-align: center;">Количество</th>
            <th style="padding: 8px; text-align: right;">Стоимость</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
      </table>

      <div style="margin-top: 20px; font-size: 16px; text-align: right;">
        <strong>Итоговая сумма: ${totalAmount} ₽</strong>
      </div>

      <h3 style="color: #1e293b; margin-top: 30px;">Информация о доставке</h3>
      <p><strong>Имя:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Адрес доставки:</strong> ${address}</p>
      ${comment ? `<p><strong>Комментарий:</strong> ${comment}</p>` : ''}
      </div>
    </div>
  `;
};
