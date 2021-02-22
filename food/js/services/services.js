const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
       'Content-type': 'aplication/json'
      },
      body: data
    });

    return await res.json();
   };

   export {postData};