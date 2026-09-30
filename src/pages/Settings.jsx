import { useState } from "react";
import {
  Search,
  Mail,
  Lock,
  QrCode,
  Building2,
  Bell,
  Upload,
  Eye,
  Send,
  Save,
} from "lucide-react";

import "../CSS/Settings.css";

function Settings() {
  const [search, setSearch] = useState("");

  const [emailData, setEmailData] = useState({
    currentEmail: "admin@thumpbeyondlimits.com",
    newEmail: "",
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [paymentData, setPaymentData] = useState({
    upi: "",
  });

  const [bankData, setBankData] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    branch: "",
    accountType: "Current",
    pan: "",
    gst: "",
    businessName: "",
    businessAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    audience: "All Customers",
    specificUsers: "",
    screen: "",
  });

  const [qrPreview, setQrPreview] = useState(null);

  const handleEmailChange = (event) => {
    const { name, value } = event.target;

    setEmailData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;

    setPaymentData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleBankChange = (event) => {
    const { name, value } = event.target;

    setBankData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleNotificationChange = (event) => {
    const { name, value } = event.target;

    setNotificationData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleQrUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setQrPreview(imageUrl);
  };

  const handleUpdateEmail = (event) => {
    event.preventDefault();

    console.log("Update email:", emailData);
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();

    console.log("Update password:", passwordData);
  };

  const handleSavePayment = (event) => {
    event.preventDefault();

    console.log("Save payment details:", {
      upi: paymentData.upi,
      qrPreview,
    });
  };

  const handleSaveBank = (event) => {
    event.preventDefault();

    console.log("Save bank and KYC details:", bankData);
  };

  const handlePreviewNotification = () => {
    console.log("Notification preview:", notificationData);
  };

  const handleSendNotification = () => {
    console.log("Send notification:", notificationData);
  };

  return (
    <section className="settings-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="settings-header">

        <div className="settings-heading">
          <div className="settings-heading-icon">
            <Building2
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h1>Settings</h1>

            <p>
              Manage your admin, payment, bank and notification settings.
            </p>
          </div>
        </div>

      </div>


      {/* =========================================
          SEARCH
      ========================================= */}

      <div className="settings-search-wrapper">

        <Search
          size={16}
          strokeWidth={1.8}
        />

        <input
          type="text"
          placeholder="Search settings..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>


      {/* =========================================
          1. ADMIN CREDENTIALS
      ========================================= */}

      {(!search ||
        "admin credentials email password"
          .includes(search.toLowerCase())) && (
        <section className="settings-section">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              <Lock
                size={17}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2>Admin Credentials</h2>

              <p>
                Manage your administrator email and password.
              </p>
            </div>

          </div>


          {/* Update Email */}

          <form
            className="settings-form"
            onSubmit={handleUpdateEmail}
          >

            <div className="settings-subheading">
              <Mail
                size={15}
                strokeWidth={1.8}
              />

              <span>Update Email</span>
            </div>


            <div className="settings-form-grid">

              <div className="settings-field">

                <label>
                  Current Email
                </label>

                <input
                  type="email"
                  name="currentEmail"
                  value={emailData.currentEmail}
                  onChange={handleEmailChange}
                  placeholder="Current email"
                />

              </div>


              <div className="settings-field">

                <label>
                  New Email
                </label>

                <input
                  type="email"
                  name="newEmail"
                  value={emailData.newEmail}
                  onChange={handleEmailChange}
                  placeholder="Enter new email"
                />

              </div>


              <div className="settings-field">

                <label>
                  Password to Confirm
                </label>

                <input
                  type="password"
                  name="password"
                  value={emailData.password}
                  onChange={handleEmailChange}
                  placeholder="Enter current password"
                />

              </div>

            </div>


            <div className="settings-action-row">

              <button
                type="submit"
                className="settings-primary-button"
              >
                <Save
                  size={14}
                  strokeWidth={1.9}
                />

                <span>
                  Update Email
                </span>
              </button>

            </div>

          </form>


          <div className="settings-horizontal-divider" />


          {/* Change Password */}

          <form
            className="settings-form"
            onSubmit={handleUpdatePassword}
          >

            <div className="settings-subheading">
              <Lock
                size={15}
                strokeWidth={1.8}
              />

              <span>Change Password</span>
            </div>


            <div className="settings-form-grid">

              <div className="settings-field">

                <label>
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />

              </div>


              <div className="settings-field">

                <label>
                  Confirm Old Password to Verify
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />

              </div>

            </div>


            <div className="settings-action-row">

              <button
                type="submit"
                className="settings-primary-button"
              >
                <Lock
                  size={14}
                  strokeWidth={1.9}
                />

                <span>
                  Update Password
                </span>
              </button>

            </div>

          </form>

        </section>
      )}


      {/* =========================================
          2. PAYMENT QR
      ========================================= */}

      {(!search ||
        "payment qr upi"
          .includes(search.toLowerCase())) && (
        <section className="settings-section">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              <QrCode
                size={17}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2>Payment QR</h2>

              <p>
                Manage the QR code and UPI details used for payments.
              </p>
            </div>

          </div>


          <div className="settings-form">

            {/* Existing QR */}

            <div className="settings-subheading">
              <QrCode
                size={15}
                strokeWidth={1.8}
              />

              <span>
                Current QR Code
              </span>
            </div>


            <div className="settings-qr-area">

              <div className="settings-current-qr">

                {qrPreview ? (
                  <img
                    src={qrPreview}
                    alt="Payment QR preview"
                  />
                ) : (
                  <QrCode
                    size={42}
                    strokeWidth={1.2}
                  />
                )}

              </div>

              <div className="settings-qr-info">

                <strong>
                  Existing payment QR
                </strong>

                <span>
                  Upload a new QR code below to replace the current one.
                </span>

              </div>

            </div>


            {/* Upload */}

            <div className="settings-field">

              <label>
                New QR Code
              </label>

              <label className="settings-upload-button">

                <Upload
                  size={15}
                  strokeWidth={1.8}
                />

                <span>
                  Upload QR Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQrUpload}
                />

              </label>

            </div>


            {/* UPI */}

            <div className="settings-field">

              <label>
                UPI ID
              </label>

              <input
                type="text"
                name="upi"
                value={paymentData.upi}
                onChange={handlePaymentChange}
                placeholder="example@upi"
              />

            </div>


            <div className="settings-action-row">

              <button
                type="button"
                className="settings-primary-button"
                onClick={handleSavePayment}
              >
                <Save
                  size={14}
                  strokeWidth={1.9}
                />

                <span>
                  Save UPI & QR Details
                </span>
              </button>

            </div>

          </div>

        </section>
      )}


      {/* =========================================
          3. BANK & CHECK DETAILS
      ========================================= */}

      {(!search ||
        "bank check details kyc account gst pan"
          .includes(search.toLowerCase())) && (
        <section className="settings-section">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              <Building2
                size={17}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2>Bank & Check Details</h2>

              <p>
                Manage bank account and KYC information.
              </p>
            </div>

          </div>


          <form
            className="settings-form"
            onSubmit={handleSaveBank}
          >

            <div className="settings-subheading">
              <Building2
                size={15}
                strokeWidth={1.8}
              />

              <span>
                Bank Account Details
              </span>
            </div>


            <div className="settings-form-grid">

              <div className="settings-field">
                <label>Account Holder Name</label>

                <input
                  type="text"
                  name="accountHolder"
                  value={bankData.accountHolder}
                  onChange={handleBankChange}
                  placeholder="Account holder name"
                />
              </div>


              <div className="settings-field">
                <label>Bank Name</label>

                <input
                  type="text"
                  name="bankName"
                  value={bankData.bankName}
                  onChange={handleBankChange}
                  placeholder="Bank name"
                />
              </div>


              <div className="settings-field">
                <label>Account Number</label>

                <input
                  type="text"
                  name="accountNumber"
                  value={bankData.accountNumber}
                  onChange={handleBankChange}
                  placeholder="Account number"
                />
              </div>


              <div className="settings-field">
                <label>IFSC Code</label>

                <input
                  type="text"
                  name="ifsc"
                  value={bankData.ifsc}
                  onChange={handleBankChange}
                  placeholder="IFSC code"
                />
              </div>


              <div className="settings-field">
                <label>Branch</label>

                <input
                  type="text"
                  name="branch"
                  value={bankData.branch}
                  onChange={handleBankChange}
                  placeholder="Branch name"
                />
              </div>


              <div className="settings-field">
                <label>Account Type</label>

                <select
                  name="accountType"
                  value={bankData.accountType}
                  onChange={handleBankChange}
                >
                  <option value="Current">
                    Current
                  </option>

                  <option value="Savings">
                    Savings
                  </option>
                </select>
              </div>

            </div>


            <div className="settings-horizontal-divider" />


            <div className="settings-subheading">
              <Building2
                size={15}
                strokeWidth={1.8}
              />

              <span>
                KYC & Business Details
              </span>
            </div>


            <div className="settings-form-grid">

              <div className="settings-field">
                <label>Business Name</label>

                <input
                  type="text"
                  name="businessName"
                  value={bankData.businessName}
                  onChange={handleBankChange}
                  placeholder="Business name"
                />
              </div>


              <div className="settings-field">
                <label>PAN</label>

                <input
                  type="text"
                  name="pan"
                  value={bankData.pan}
                  onChange={handleBankChange}
                  placeholder="PAN number"
                />
              </div>


              <div className="settings-field">
                <label>GST Number</label>

                <input
                  type="text"
                  name="gst"
                  value={bankData.gst}
                  onChange={handleBankChange}
                  placeholder="GST number"
                />
              </div>


              <div className="settings-field">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={bankData.city}
                  onChange={handleBankChange}
                  placeholder="City"
                />
              </div>


              <div className="settings-field">
                <label>State</label>

                <input
                  type="text"
                  name="state"
                  value={bankData.state}
                  onChange={handleBankChange}
                  placeholder="State"
                />
              </div>


              <div className="settings-field">
                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={bankData.pincode}
                  onChange={handleBankChange}
                  placeholder="Pincode"
                />
              </div>


              <div className="settings-field settings-field-full">
                <label>Business Address</label>

                <textarea
                  name="businessAddress"
                  value={bankData.businessAddress}
                  onChange={handleBankChange}
                  placeholder="Complete business address"
                  rows="3"
                />
              </div>

            </div>


            <div className="settings-action-row">

              <button
                type="submit"
                className="settings-primary-button"
              >
                <Save
                  size={14}
                  strokeWidth={1.9}
                />

                <span>
                  Save Bank & KYC Details
                </span>
              </button>

            </div>

          </form>

        </section>
      )}


      {/* =========================================
          4. PUSH NOTIFICATIONS
      ========================================= */}

      {(!search ||
        "push notifications broadcast customers approval"
          .includes(search.toLowerCase())) && (
        <section className="settings-section">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              <Bell
                size={17}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2>
                Push Notifications Broadcast
              </h2>

              <p>
                Send a notification broadcast to selected customers.
              </p>
            </div>

          </div>


          <div className="settings-form">

            <div className="settings-form-grid">

              {/* Title */}

              <div className="settings-field settings-field-full">

                <label>
                  Notification Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={notificationData.title}
                  onChange={handleNotificationChange}
                  placeholder="Enter notification title"
                />

              </div>


              {/* Message */}

              <div className="settings-field settings-field-full">

                <label>
                  Message
                </label>

                <textarea
                  name="message"
                  value={notificationData.message}
                  onChange={handleNotificationChange}
                  placeholder="Write your notification message..."
                  rows="5"
                />

              </div>


              {/* Audience */}

              <div className="settings-field">

                <label>
                  Target Audience
                </label>

                <select
                  name="audience"
                  value={notificationData.audience}
                  onChange={handleNotificationChange}
                >
                  <option value="All Customers">
                    All Customers
                  </option>

                  <option value="Pending Approval">
                    Pending Approval
                  </option>

                  <option value="Approved Only">
                    Approved Only
                  </option>

                  <option value="Specific Users">
                    Specific Users
                  </option>
                </select>

              </div>


              {/* Specific Users */}

              {notificationData.audience ===
                "Specific Users" && (
                <div className="settings-field">

                  <label>
                    Specific Users
                  </label>

                  <input
                    type="text"
                    name="specificUsers"
                    value={notificationData.specificUsers}
                    onChange={handleNotificationChange}
                    placeholder="Customer IDs or emails"
                  />

                </div>
              )}


              {/* Navigate */}

              <div className="settings-field">

                <label>
                  Navigate to Screen
                  <span className="optional-label">
                    Optional
                  </span>
                </label>

                <input
                  type="text"
                  name="screen"
                  value={notificationData.screen}
                  onChange={handleNotificationChange}
                  placeholder="Example: /orders"
                />

              </div>

            </div>


            {/* Preview */}

            <div className="settings-notification-preview">

              <div className="settings-preview-header">

                <div>
                  <span>
                    Preview
                  </span>

                  <strong>
                    Customer notification
                  </strong>
                </div>

                <Bell
                  size={17}
                  strokeWidth={1.7}
                />

              </div>


              <div className="settings-preview-content">

                <strong>
                  {notificationData.title ||
                    "Notification title"}
                </strong>

                <p>
                  {notificationData.message ||
                    "Your notification message will appear here."}
                </p>

              </div>

            </div>


            <div className="settings-action-row">

              <button
                type="button"
                className="settings-secondary-button"
                onClick={handlePreviewNotification}
              >
                <Eye
                  size={14}
                  strokeWidth={1.9}
                />

                <span>
                  Preview
                </span>
              </button>


              <button
                type="button"
                className="settings-primary-button"
                onClick={handleSendNotification}
              >
                <Send
                  size={14}
                  strokeWidth={1.9}
                />

                <span>
                  Send Notifications
                </span>
              </button>

            </div>

          </div>

        </section>
      )}

    </section>
  );
}

export default Settings;