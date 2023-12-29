const getMessage = async ({ queryKey }) => {
    const token = queryKey[1];
    const id = queryKey[2];
  
    const apiRes = await fetch(`http://localhost:3001/api/returnBasedMessages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Replace with your actual bearer token
      },
    });
    if (!apiRes.ok) {
      window.alert("Error occured while fetching data");
    }
    return apiRes.json();
  };
  
  export default getMessage;
  