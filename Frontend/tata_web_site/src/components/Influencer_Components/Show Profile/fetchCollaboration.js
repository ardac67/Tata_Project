const fetchCollaboration = async ({ queryKey }) => {
  const id = queryKey[1];
  const token = queryKey[2];

  const apiRes = await fetch(
    `http://localhost:3001/api/getCollaborationAdvertiser/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Replace with your actual bearer token
      },
    }
  );
  if (!apiRes.ok) {
    window.alert("Error occured while fetching data");
  }
  return apiRes.json();
};

export default fetchCollaboration;
