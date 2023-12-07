const fetchAllInf = async ({ queryKey }) => {
  const token = queryKey[1];

  const apiRes = await fetch(`http://localhost:3001/api/getInfluencer`, {
    headers: {
      Authorization: `Bearer ${token}`, // Replace with your actual bearer token
    },
  });
  if (!apiRes.ok) {
    window.alert("Error occured while fetching data");
  }
  return apiRes.json();
};

export default fetchAllInf;
