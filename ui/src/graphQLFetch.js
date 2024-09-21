const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

export const graphQLFetch = async (query, variables = {}) => {
    try {
      const respone = await fetch(window.ENV.URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
      });
  
      const body = await respone.text();
      const result = JSON.parse(body, jsonDateReviver);
      console.log(result)
  
      if (result.errors) {
        const error = result.errors[0];
        console.log(error.extensions.code);
        if (error.extensions.code == "BAD_USER_INPUT") {
          const details = error.extensions.exception.errors.join("\n");
          alert(`${error.message} \n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      } else {
        return result.data;
      }
    } catch (error) {
      alert(`Error in sending data  to server: ${error.message}`);
    }
  };