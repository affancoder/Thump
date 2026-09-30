import { useState } from "react";
import {
  Shield,
  QrCode,
  Landmark,
  Bell,
  Upload,
  Trash2,
} from "lucide-react";

import "../CSS/Settings.css";

function Settings() {
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");
  const [navigateTo, setNavigateTo] = useState("");

  const handleUpdateEmail = () => {
    console.log("Update email");
  };

  const handleUpdatePassword = () => {
    console.log("Update password");
  };

  const handleSavePaymentDetails = () => {
    console.log("Save UPI & QR details");
  };

  const handleSaveBankDetails = () => {
    console.log("Save bank details");
  };

  const handlePreviewNotification = () => {
    console.log("Preview notification");
  };

  const handleSendNotification = () => {
    console.log("Send notification");
  };

  return (
    <section className="settings-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="settings-page-header">

        <div>
          <h1 className="settings-page-title">
            Settings
          </h1>

          <p className="settings-page-subtitle">
            Manage your admin account and application settings.
          </p>
        </div>

      </div>


      {/* =========================================
          1. ADMIN CREDENTIALS
      ========================================= */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon">
            <Shield
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2>
              Admin Credentials
            </h2>

            <p>
              Update your admin email and password.
            </p>
          </div>

        </div>


        {/* UPDATE EMAIL */}

        <form
          className="settings-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdateEmail();
          }}
        >

          <h3 className="settings-subheading">
            Update Email
          </h3>

          <div className="settings-form-grid">

            <div className="settings-field">

              <label htmlFor="current-email">
                Current Email
              </label>

              <input
                id="current-email"
                type="email"
                placeholder="Enter current email"
              />

            </div>


            <div className="settings-field">

              <label htmlFor="new-email">
                New Email
              </label>

              <input
                id="new-email"
                type="email"
                placeholder="Enter new email"
              />

            </div>


            <div className="settings-field">

              <label htmlFor="email-password">
                Password to Confirm
              </label>

              <input
                id="email-password"
                type="password"
                placeholder="Enter password"
              />

            </div>

          </div>


          <div className="settings-action-row">

            <button
              type="submit"
              className="settings-primary-button"
            >
              Update Email
            </button>

          </div>

        </form>


        <div className="settings-horizontal-divider" />


        {/* CHANGE PASSWORD */}

        <form
          className="settings-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdatePassword();
          }}
        >

          <h3 className="settings-subheading">
            Change Password
          </h3>

          <div className="settings-form-grid">

            <div className="settings-field">

              <label htmlFor="new-password">
                New Password
              </label>

              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
              />

            </div>


            <div className="settings-field">

              <label htmlFor="old-password">
                Old Password to Verify
              </label>

              <input
                id="old-password"
                type="password"
                placeholder="Enter current password"
              />

            </div>

          </div>


          <div className="settings-action-row">

            <button
              type="submit"
              className="settings-primary-button"
            >
              Update Password
            </button>

          </div>

        </form>

      </section>


      {/* =========================================
          2. PAYMENT QR
      ========================================= */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon">
            <QrCode
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2>
              Payment QR
            </h2>

            <p>
              Manage your payment QR and UPI details.
            </p>
          </div>

        </div>


        <div className="settings-qr-area">

          {/* CURRENT QR */}

          <div className="settings-current-qr-area">

            <div className="settings-current-qr">

              <div className="settings-qr-placeholder">

                <QrCode
                  size={34}
                  strokeWidth={1.4}
                />

                <span>
                  No QR uploaded
                </span>

              </div>

            </div>


            <div className="settings-action-row">

              <button
                type="button"
                className="settings-remove-button"
              >
                <Trash2
                  size={14}
                  strokeWidth={1.8}
                />

                Remove Old QR
              </button>

            </div>

          </div>


          {/* NEW QR */}

          <div className="settings-qr-info">

            <h3 className="settings-subheading">
              Upload New QR
            </h3>

            <p className="settings-qr-info-text">
              Upload a new payment QR code or provide
              your UPI ID below.
            </p>


            <div className="settings-field">

              <label>
                New QR Image
              </label>

              <label className="settings-upload-button">

                <Upload
                  size={14}
                  strokeWidth={1.8}
                />

                Choose QR File

                <input
                  type="file"
                  accept="image/*"
                  className="settings-file-input"
                />

              </label>

            </div>


            <div className="settings-field">

              <label htmlFor="upi-id">
                UPI ID
              </label>

              <input
                id="upi-id"
                type="text"
                placeholder="example@upi"
              />

            </div>


            <div className="settings-action-row">

              <button
                type="button"
                className="settings-primary-button"
                onClick={handleSavePaymentDetails}
              >
                Save UPI & QR Details
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          3. BANK & CHECK DETAILS
      ========================================= */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon">
            <Landmark
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2>
              Bank & Check Details
            </h2>

            <p>
              Manage your bank and verification details.
            </p>
          </div>

        </div>


        <form
          className="settings-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSaveBankDetails();
          }}
        >

          <div className="settings-form-grid">

            <div className="settings-field">

              <label htmlFor="account-holder">
                Account Holder Name
              </label>

              <input
                id="account-holder"
                type="text"
                placeholder="Enter account holder name"
              />

            </div>


            <div className="settings-field">

              <label htmlFor="bank-name">
                Bank Name
              </label>

              <input
                id="bank-name"
                type="text"
                placeholder="Enter bank name"
              />

            </div>


            <div className="settings-field">

              <label htmlFor="account-number">
                Account Number
              </label>

              <input
                id="account-number"
                type="text"
                placeholder="Enter account number"
              />

            </div>


            <div className="settings-field">

              <label htmlFor="ifsc-code">
                IFSC Code
              </label>

              <input
                id="ifsc-code"
                type="text"
                placeholder="Enter IFSC code"
              />

            </div>


            <div className="settings-field">

              <label htmlFor="branch">
                Branch
              </label>

              <input
                id="branch"
                type="text"
                placeholder="Enter branch"
              />

            </div>


            <div className="settings-field">

              <label htmlFor="account-type">
                Account Type
              </label>

              <select
                id="account-type"
                defaultValue=""
              >
                <option
                  value=""
                  disabled
                >
                  Select account type
                </option>

                <option value="savings">
                  Savings
                </option>

                <option value="current">
                  Current
                </option>

              </select>

            </div>


            <div className="settings-field full-width">

              <label>
                Cancelled Check
                <span className="optional-label">
                  {" "} (Optional)
                </span>
              </label>

              <label className="settings-upload-button">

                <Upload
                  size={14}
                  strokeWidth={1.8}
                />

                Choose Check File

                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="settings-file-input"
                />

              </label>

            </div>

          </div>


          <div className="settings-action-row">

            <button
              type="submit"
              className="settings-primary-button"
            >
              Save Bank Details
            </button>

          </div>

        </form>

      </section>


      {/* =========================================
          4. PUSH NOTIFICATIONS
      ========================================= */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon">
            <Bell
              size={18}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2>
              Push Notifications Broadcast
            </h2>

            <p>
              Send notifications to selected customers.
            </p>
          </div>

        </div>


        <form
          className="settings-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSendNotification();
          }}
        >

          <div className="settings-form-grid">

            {/* TITLE */}

            <div className="settings-field full-width">

              <label htmlFor="notification-title">
                Notification Title
              </label>

              <input
                id="notification-title"
                type="text"
                placeholder="Enter notification title"
                value={notificationTitle}
                onChange={(event) =>
                  setNotificationTitle(event.target.value)
                }
              />

            </div>


            {/* MESSAGE */}

            <div className="settings-field full-width">

              <label htmlFor="notification-message">
                Message
              </label>

              <textarea
                id="notification-message"
                placeholder="Write your notification message..."
                value={notificationMessage}
                onChange={(event) =>
                  setNotificationMessage(event.target.value)
                }
              />

            </div>


            {/* TARGET AUDIENCE */}

            <div className="settings-field">

              <label htmlFor="target-audience">
                Target Audience
              </label>

              <select
                id="target-audience"
                value={targetAudience}
                onChange={(event) =>
                  setTargetAudience(event.target.value)
                }
              >

                <option value="all">
                  All Customers
                </option>

                <option value="pending">
                  Pending Approval
                </option>

                <option value="approved">
                  Approved Only
                </option>

                <option value="specific">
                  Specific Users
                </option>

              </select>

            </div>


            {/* NAVIGATION */}

            <div className="settings-field">

              <label htmlFor="navigate-to">

                Navigate to Screen

                <span className="optional-label">
                  {" "} (Optional)
                </span>

              </label>

              <input
                id="navigate-to"
                type="text"
                placeholder="e.g. /orders"
                value={navigateTo}
                onChange={(event) =>
                  setNavigateTo(event.target.value)
                }
              />

            </div>

          </div>


          {/* NOTIFICATION PREVIEW */}

          <div className="settings-notification-preview">

            <div className="settings-preview-header">

              <span>
                Notification Preview
              </span>

              <small>
                Preview before sending
              </small>

            </div>


            <div className="settings-preview-content">

              <div className="settings-preview-notification">

                <h4 className="settings-preview-notification-title">
                  {notificationTitle ||
                    "Notification Title"}
                </h4>

                <p className="settings-preview-notification-message">
                  {notificationMessage ||
                    "Your notification message will appear here."}
                </p>

              </div>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="settings-action-row">

            <button
              type="button"
              className="settings-secondary-button"
              onClick={handlePreviewNotification}
            >
              Preview
            </button>


            <button
              type="submit"
              className="settings-primary-button"
            >
              <Bell
                size={14}
                strokeWidth={1.8}
              />

              Send Notifications
            </button>

          </div>

        </form>

      </section>

    </section>
  );
}

export default Settings;