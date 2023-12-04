import urllib.request, json
url = "https://exp.host/--/api/v2/push/send"
method = "POST"
headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json'
}
body = {
    "to": "ExponentPushToken[MB3lwBKaGyGLkKjR3NdIDb]",
    "title": "薬の取り出し確認",
    "body": "の分として排出した薬が取り出されました",
}
json_data = json.dumps(body).encode("utf-8")
request = urllib.request.Request(url, data=json_data, method=method, headers=headers)
with urllib.request.urlopen(request) as response:
    response_body = response.read().decode("utf-8")
