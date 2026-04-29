function CardOption({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
}) {
  const sanitizedCardNumber = cardNumber.replace(/\s+/g, "");
  const hasCardNumberInput = sanitizedCardNumber.length > 0;
  const isCardNumberValid = /^\d{16}$/.test(sanitizedCardNumber);

  const handleCardNumberChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 16);
    const groupedDigits = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(groupedDigits);
  };

  return (
    <div className="payment-method-content">
      <h3>Credit / Debit Cards</h3>
      <p className="payment-method-hint payment-method-hint--dark">
        Please ensure your card can be used for online transactions.
      </p>
      <div className="payment-grid">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          inputMode="numeric"
          aria-invalid={hasCardNumberInput && !isCardNumberValid}
        />
        {hasCardNumberInput && !isCardNumberValid && (
          <p className="payment-method-hint">Enter a valid 16-digit card number.</p>
        )}
        <input
          type="text"
          placeholder="Name on Card"
          value={cardName}
          onChange={(event) => setCardName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Valid Thru (MM/YY)"
          value={cardExpiry}
          onChange={(event) => setCardExpiry(event.target.value)}
        />
        <input
          type="password"
          placeholder="CVV"
          value={cardCvv}
          onChange={(event) => setCardCvv(event.target.value)}
        />
      </div>
    </div>
  );
}

export default CardOption;
