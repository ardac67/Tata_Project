const updateUserInfo = async ({ queryKey }) => {
  const id = queryKey[1]
  const token = queryKey[2]
  const body = queryKey[3]

  const apiRes = await fetch(`http://localhost:3001/api/updateUser/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}` // Replace with your actual bearer token
    },
    body: body
  })

  if (!apiRes.ok) {
    window.alert('Error occured while posting data')
  }
  return apiRes.json()
}

export default updateUserInfo
