function buildCustomerEmail(
  name: string,
  reference: string
) {
  return `
    <div
      style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #18181b;
      "
    >
      <h2>
        Thank you for contacting
        Golden Palmera Global
      </h2>

      <p>
        Dear ${escapeHtml(name)},
      </p>

      <p>
        We have received your inquiry
        and our team will review your
        requirements shortly.
      </p>

      <p>
        <strong>
          Your reference number:
        </strong>
        ${escapeHtml(reference)}
      </p>

      <p>
        Please keep this reference number
        for future correspondence.
      </p>

      <p>
        Kind regards,<br />
        Golden Palmera Global
      </p>
    </div>
  `;
}