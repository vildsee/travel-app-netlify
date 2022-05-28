// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require("axios");

const handler = async (event) => {
  const { lat, long } = event.queryStringParameters;

  const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&key=${process.env.API_KEY_WEATHERBIT}`;

  try {
    const { data } = await axios.get(weatherbitUrl);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };
