"use client"; // Required for components using FontAwesomeIcon in App Router

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function LinkedInIcon() {
  return (
    <a
      href="https://www.linkedin.com/in/your-profile"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <FontAwesomeIcon
        icon={faLinkedin}
        size="2x"
        style={{ color: "#0A66C2" }}
      />
    </a>
  );
}
