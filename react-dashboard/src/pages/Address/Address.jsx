import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotals } from "../../features/cart/selectors";
import { formatCurrency } from "../../utils/formatters";
import { loadAddressState, saveAddressState } from "../../utils/storage";
import NewAddress from "./NewAddress";
import { fetchPincodeDetails } from "./pincodeApi";
import "./Address.css";

const initialAddresses = [];

const emptyForm = {
  id: null,
  fullName: "",
  phoneNumber: "",
  alternatePhone: "",
  houseNumber: "",
  area: "",
  city: "",
  pinCode: "",
  district: "",
  state: "",
  landmark: "",
  addressType: "Home",
  isDefault: false,
};

const checkoutSteps = [
  { number: 1, label: "My Cart", status: "done", path: "/cart" },
  { number: 2, label: "Address", status: "active", path: "/address" },
  { number: 3, label: "Payment", status: "upcoming", path: "/payment" },
  { number: 4, label: "Order Confirm", status: "upcoming", path: "/order-confirm" },
];

const PINCODE_LENGTH_ERROR = "Postal code should be exactly 6 digits.";
const PINCODE_PENDING_MESSAGE = "Fetching pincode details...";
const PINCODE_SUCCESS_MESSAGE = "Pincode details added.";
const PINCODE_VALIDATION_MESSAGE = "Please wait while we validate the postal code.";
const PHONE_NUMBER_ERROR = "Phone number should be exactly 10 digits.";

function Address() {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totals = useSelector(selectCartTotals);
  const [savedAddressState] = useState(() => loadAddressState() ?? {});
  const [addresses, setAddresses] = useState(savedAddressState.addresses ?? initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(
    savedAddressState.selectedAddressId ?? savedAddressState.addresses?.[0]?.id ?? null
  );
  const [formMode, setFormMode] = useState("add");
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [pinCodeStatus, setPinCodeStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ?? addresses[0] ?? null;

  useEffect(() => {
    saveAddressState({ addresses, selectedAddressId });
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    if (formData.pinCode.length !== 6) {
      return;
    }

    const controller = new AbortController();

    fetchPincodeDetails(formData.pinCode, controller.signal)
      .then((details) => {
        setFormData((current) => {
          if (current.pinCode !== formData.pinCode) {
            return current;
          }

          return {
            ...current,
            city: details.city,
            district: details.district,
            state: details.state,
          };
        });
        setPinCodeStatus(PINCODE_SUCCESS_MESSAGE);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }

        setPinCodeError(error.message);
        setPinCodeStatus("");
      });

    return () => controller.abort();
  }, [formData.pinCode]);

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    const shouldUseDigitsOnly = name === "phoneNumber" || name === "pinCode";
    const digitValue = shouldUseDigitsOnly ? value.replace(/\D/g, "") : value;
    const nextValue =
      name === "phoneNumber"
        ? digitValue.slice(0, 10)
        : name === "pinCode"
          ? digitValue.slice(0, 6)
          : digitValue;

    setFormError("");
    if (name === "phoneNumber") {
      setPhoneNumberError(
        digitValue.length > 0 && digitValue.length !== 10 ? PHONE_NUMBER_ERROR : ""
      );
    }

    if (name === "pinCode") {
      if (digitValue.length === 6) {
        setPinCodeError("");
        setPinCodeStatus(PINCODE_PENDING_MESSAGE);
      } else {
        setPinCodeError(digitValue.length > 0 ? PINCODE_LENGTH_ERROR : "");
        setPinCodeStatus("");
      }
    }

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : nextValue,
    }));
  };

  const handleStartAdd = () => {
    setFormMode("add");
    setFormData(emptyForm);
    setFormError("");
    setPhoneNumberError("");
    setPinCodeError("");
    setPinCodeStatus("");
    setShowForm(true);
  };

  const handleStartEdit = (address) => {
    setFormMode("edit");
    setFormData(address);
    setFormError("");
    setPhoneNumberError("");
    setPinCodeError("");
    setPinCodeStatus("");
    setShowForm(true);
  };

  const handleDelete = (addressId) => {
    const nextAddresses = addresses.filter((address) => address.id !== addressId);
    setAddresses(nextAddresses);

    if (selectedAddressId === addressId) {
      setSelectedAddressId(nextAddresses[0]?.id ?? null);
    }

    if (formData.id === addressId) {
      setFormData(emptyForm);
      setFormError("");
      setPhoneNumberError("");
      setPinCodeError("");
      setPinCodeStatus("");
      setShowForm(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      id: formMode === "edit" ? formData.id : Date.now(),
    };

    if (payload.phoneNumber.length !== 10) {
      setPhoneNumberError(PHONE_NUMBER_ERROR);
      return;
    }

    if (payload.pinCode.length !== 6) {
      setPinCodeError(PINCODE_LENGTH_ERROR);
      return;
    }

    if (pinCodeError) {
      return;
    }

    if (pinCodeStatus === PINCODE_PENDING_MESSAGE) {
      setPinCodeError(PINCODE_VALIDATION_MESSAGE);
      setPinCodeStatus("");
      return;
    }

    const addressTypeExists = addresses.some(
      (address) =>
        address.addressType === payload.addressType && address.id !== payload.id
    );

    if (addressTypeExists) {
      setFormError(
        `${payload.addressType} address already exists. Please choose another address type.`
      );
      return;
    }

    setAddresses((current) => {
      let nextAddresses;

      if (payload.isDefault) {
        nextAddresses = current.map((address) => ({
          ...address,
          isDefault: false,
        }));
      } else {
        nextAddresses = [...current];
      }

      if (formMode === "edit") {
        return nextAddresses.map((address) =>
          address.id === payload.id ? payload : address
        );
      }

      return [payload, ...nextAddresses];
    });

    setSelectedAddressId(payload.id);
    setFormData(emptyForm);
    setFormError("");
    setPhoneNumberError("");
    setPinCodeError("");
    setPinCodeStatus("");
    setShowForm(false);
  };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <section className="address-page">
      <div className="address-shell">
        <div className="address-intro">
          <div>
            <p className="eyebrow">Checkout flow</p>
            <h2>Choose a delivery address</h2>
            <p className="address-subtitle">
              Select an existing address or add a new one before moving to payment.
            </p>
          </div>
          <Link className="ghost-button address-back-link" to="/cart">
            Back to cart
          </Link>
        </div>

        <div className="checkout-steps">
          {checkoutSteps.map((step) => (
            <Link
              key={step.number}
              className={`checkout-step checkout-step--${step.status}`}
              to={step.path}
            >
              <span className="checkout-step__number">{step.number}</span>
              <span className="checkout-step__label">{step.label}</span>
            </Link>
          ))}
        </div>

        <div className="address-layout">
          <div className="address-main">
            <section className="address-card">
              <div className="address-card__header">
                <div>
                  <p className="address-card__eyebrow">Default delivery address</p>
                  <h3>Select Delivery Address</h3>
                </div>
                <button className="address-button address-button--ghost" onClick={handleStartAdd}>
                  Add New Address
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="address-empty">
                  <p>No saved addresses yet.</p>
                  <button className="address-button address-button--primary" onClick={handleStartAdd}>
                    Add your first address
                  </button>
                </div>
              ) : (
                <div className="address-list">
                  {addresses.map((address) => (
                    <article
                      key={address.id}
                      className={`address-option${
                        selectedAddressId === address.id ? " address-option--selected" : ""
                      }`}
                    >
                      <label className="address-option__body">
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                        />

                        <div className="address-option__details">
                          <div className="address-option__title">
                            <strong>{address.fullName}</strong>
                            <span className="address-tag">{address.addressType}</span>
                            {address.isDefault ? (
                              <span className="address-tag address-tag--default">Default</span>
                            ) : null}
                          </div>
                          <p>
                            {address.houseNumber}, {address.area}
                          </p>
                          <p>
                            {address.city}, {address.district}, {address.state} -{" "}
                            {address.pinCode}
                          </p>
                          <p>Mobile: {address.phoneNumber}</p>
                          {address.landmark ? <p>Landmark: {address.landmark}</p> : null}
                        </div>
                      </label>

                      <div className="address-option__actions">
                        <button
                          className="address-button address-button--muted"
                          onClick={() => handleDelete(address.id)}
                          type="button"
                        >
                          Remove
                        </button>
                        <button
                          className="address-button address-button--primary"
                          onClick={() => handleStartEdit(address)}
                          type="button"
                        >
                          Edit
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {showForm ? (
              <NewAddress
                formData={formData}
                formError={formError}
                formMode={formMode}
                phoneNumberError={phoneNumberError}
                pinCodeError={pinCodeError}
                pinCodeStatus={pinCodeStatus}
                onCancel={() => {
                  setShowForm(false);
                  setFormData(emptyForm);
                  setFormError("");
                  setPhoneNumberError("");
                  setPinCodeError("");
                  setPinCodeStatus("");
                }}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
              />
            ) : null}
          </div>

          <aside className="address-summary">
            <section className="address-card address-summary-card">
              <p className="address-card__eyebrow">Estimated delivery time</p>
              <h3>Tomorrow by 7 PM</h3>

              <div className="address-summary__rows">
                <div className="address-summary__row">
                  <span>Price ({itemCount} items)</span>
                  <strong>{formatCurrency(totals.subtotal)}</strong>
                </div>
                <div className="address-summary__row">
                  <span>Discount</span>
                  <strong className="address-summary__saving">
                    -{formatCurrency(Math.max(totals.subtotal * 0.08, 0))}
                  </strong>
                </div>
                <div className="address-summary__row">
                  <span>Delivery Fee</span>
                  <strong>{formatCurrency(totals.delivery)}</strong>
                </div>
                <div className="address-summary__row address-summary__row--total">
                  <span>Total Amount</span>
                  <strong>{formatCurrency(totals.grandTotal)}</strong>
                </div>
              </div>

              {selectedAddress ? (
                <div className="address-summary__selected">
                  <p className="address-card__eyebrow">Deliver to</p>
                  <strong>{selectedAddress.fullName}</strong>
                  <p>
                    {selectedAddress.houseNumber}, {selectedAddress.area}
                  </p>
                  <p>
                    {selectedAddress.city} - {selectedAddress.pinCode}
                  </p>
                </div>
              ) : (
                <div className="address-summary__selected address-summary__selected--empty">
                  Add an address to continue to the next step.
                </div>
              )}

              <button
                className="address-button address-button--primary address-summary__cta"
                disabled={!selectedAddress || cartItems.length === 0}
                onClick={() => navigate("/payment")}
                type="button"
              >
                Continue to Payment
              </button>

              {cartItems.length === 0 ? (
                <p className="address-summary__hint">
                  Your cart is empty right now. Add products before checkout.
                </p>
              ) : null}
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Address;
