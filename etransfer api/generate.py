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
  "access_token": "cabafaf5-fd97-431a-8bb2-72a12da74686",
  "token_type": "bearer",
  "expires_in": 259199,
  "scope": "read write trust"
}
'''
