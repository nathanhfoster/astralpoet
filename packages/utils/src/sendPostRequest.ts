const sendPostRequest = (
  data: any,
  url: string,
  authorization?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    if (authorization) {
      xhr.setRequestHeader("Authorization", authorization);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`${xhr.status}`));
        }
      }
    };
    const postData = JSON.stringify(data);

    xhr.send(postData);
  });
};

export default sendPostRequest;
