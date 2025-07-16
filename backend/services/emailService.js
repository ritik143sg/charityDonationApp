const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const SibApiV3Sdk = require("sib-api-v3-sdk");

// Step 1: Configure Brevo API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.GMAILKEY;

// Step 2: Define controller function
const sendEmail = async (req) => {
  //   const user = req.body;

  console.log("Email11111111111111111", req.user.email);

  try {
    // Step 3: Instantiate the API
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Step 4: Set sender and receiver details
    const sender = {
      email: "ritiksg143@gmail.com", // This must be a Brevo-verified sender
      name: "CharityDonationApp",
    };

    const receivers = [
      {
        email: "ritiksg143@gmail.com", // Receiver's email from request body
      },
    ];

    // Step 5: Send the transactional email
    const sendEmail = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Test Email from Brevo",
      textContent:
        "This is a plain text fallback for email clients that do not support HTML.",
      htmlContent: `
        <html>
          <body>
            <h1>Hello, ${req.user.username}, Thanks To help us with your Donation. Amount = ₹ ${req.money}</h1>
            <p>This is a test transactional email sent via the Brevo API.</p>
          </body>
        </html>
      `,
    });

    // Step 6: Send success response
    // res.status(200).json({ message: "Email sent successfully", sendEmail });
    return "Success Email Send";
  } catch (error) {
    // Handle API or logic errors
    console.error("Error while sending email:", error);
    // res.status(500).json({ error: error.message });
    return "Failed Email Send";
  }
};

module.exports = sendEmail;
