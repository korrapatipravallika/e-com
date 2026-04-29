const addressTypes = ["Home", "Office", "Others"];

function NewAddress({
  formData,
  formError,
  formMode,
  phoneNumberError,
  pinCodeError,
  pinCodeStatus,
  onCancel,
  onChange,
  onSubmit,
}) {
  return (
    <section className="address-card">
      <div className="address-card__header">
        <div>
          <p className="address-card__eyebrow">
            {formMode === "edit" ? "Update your details" : "Create a fresh entry"}
          </p>
          <h3>{formMode === "edit" ? "Edit Address" : "Add New Address"}</h3>
        </div>
        <button
          className="address-button address-button--muted"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>

      <form className="address-form" onSubmit={onSubmit}>
        <div className="address-form__group">
          <h4>Contact details</h4>
          <div className="address-form__grid">
            <label>
              <span>Full Name</span>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                placeholder="Enter your name"
                required
              />
            </label>
            <label>
              <span>Phone Number</span>
              <input
                inputMode="numeric"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChange}
                placeholder="10-digit mobile number"
                required
              />
              {phoneNumberError ? (
                <p className="address-form__error">{phoneNumberError}</p>
              ) : null}
            </label>
            <label>
              <span>Alternate Phone</span>
              <input
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={onChange}
                placeholder="Optional alternate number"
              />
            </label>
          </div>
        </div>

        <div className="address-form__group">
          <h4>Address</h4>
          <div className="address-form__grid">
            <label>
              <span>Flat / House Number</span>
              <input
                name="houseNumber"
                value={formData.houseNumber}
                onChange={onChange}
                placeholder="Flat / House Number"
                required
              />
            </label>
            <label className="address-form__grid-span">
              <span>Full Address</span>
              <input
                name="area"
                value={formData.area}
                onChange={onChange}
                placeholder="Street, area, or apartment name"
                required
              />
            </label>
            <label>
              <span>City / Town</span>
              <input
                name="city"
                value={formData.city}
                onChange={onChange}
                placeholder="City / Town"
                required
              />
            </label>
            <label>
              <span>Pin Code</span>
              <input
                inputMode="numeric"
                name="pinCode"
                value={formData.pinCode}
                onChange={onChange}
                placeholder="Pin Code"
                required
              />
              {pinCodeError ? (
                <p className="address-form__error">{pinCodeError}</p>
              ) : pinCodeStatus ? (
                <p className="address-form__status">{pinCodeStatus}</p>
              ) : null}
            </label>
            <label>
              <span>District</span>
              <input
                name="district"
                value={formData.district}
                onChange={onChange}
                placeholder="District"
                required
              />
            </label>
            <label>
              <span>State</span>
              <input
                name="state"
                value={formData.state}
                onChange={onChange}
                placeholder="State"
                required
              />
            </label>
            <label className="address-form__grid-span">
              <span>Landmark / Nearby Shop</span>
              <input
                name="landmark"
                value={formData.landmark}
                onChange={onChange}
                placeholder="Optional landmark"
              />
            </label>
          </div>
        </div>

        <div className="address-form__group">
          <h4>Address Type</h4>
          {formError ? <p className="address-form__error">{formError}</p> : null}
          <div className="address-type-list">
            {addressTypes.map((type) => (
              <label
                key={type}
                className={`address-type${
                  formData.addressType === type ? " address-type--selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={formData.addressType === type}
                  onChange={onChange}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <label className="address-default-toggle">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={onChange}
            />
            <span>Make this my default address</span>
          </label>
        </div>

        <button
          className="address-button address-button--primary address-form__submit"
          type="submit"
        >
          Save Address
        </button>
      </form>
    </section>
  );
}

export default NewAddress;
