let baseUrl = 'http://localhost:5000/api';
let mediaUrl = 'http://localhost:5000/';

if (window.location.host === 'medusched-admin-dev.falconweb.app') {
  baseUrl = 'https://medusched-api-dev.falconweb.app/api';
  mediaUrl = 'https://medusched-api-dev.falconweb.app/';
} else if (window.location.host === 'medusched-admin-qa.falconweb.app') {
  baseUrl = 'https://medusched-api-qa.falconweb.app/api';
  mediaUrl = 'https://medusched-api-qa.falconweb.app/';
} else if (window.location.host === 'medusched-admin-staging.falconweb.app') {
  baseUrl = 'https://medusched-api-staging.falconweb.app/api';
  mediaUrl = 'https://medusched-api-staging.falconweb.app/';
} else if (window.location.host === 'medusched-admin-prod.falconweb.app') {
  baseUrl = 'https://medusched-api-prod.falconweb.app/api';
  mediaUrl = 'https://medusched-api-prod.falconweb.app/';
}

module.exports = { baseUrl, mediaUrl };
