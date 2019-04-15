import base64
import hashlib

salt = "apple"
originalSecretKey = "5pNLOl9L0kVi83XfhqVOJIJK9Wb1NaUoB6wTdxrW_II"

def main():
    encode = base64.b64encode(b''+salt+":" + originalSecretKey)
    data = b''+salt+":"+originalSecretKey
    m = hashlib.sha256()
    m.update(data)
    res = m.digest()
    content_sha256 = base64.b64encode(res)
    print(content_sha256)


if __name__ == "__main__":
    main()


'''
{
  "access_token": "e4a4fec6-cebc-4211-a5c7-7f7102f83fde",
  "token_type": "bearer",
  "expires_in": 259199,
  "scope": "read write trust"
}

{
  "access_token": "208a3157-8664-48a2-9750-d796009c3272",
  "token_type": "bearer",
  "expires_in": 259199,
  "scope": "read write trust"
}
'''
