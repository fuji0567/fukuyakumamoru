import urllib.request, json

if __name__ == "__main__":
    url = "https://hukuyakumamoru.com/manage/today/65181651f674072b98f8a738"
    method = "PATCH"
    headers = {
        'Content-Type': 'application/json'
    }
    body =     {
        "morning": {
            "name": "朝",
            "isImageComplete": True,
            "isCupComplete": True
        },
        "afternoon": {
            "name": "昼",
            "isImageComplete": True,
            "isCupComplete": False
        },
        "evening": {
            "name": "夕",
            "isImageComplete": False,
            "isCupComplete": True
        },
        "night": {
            "name": "夜",
            "isImageComplete": False,
            "isCupComplete": False
        }
    }
    json_data = json.dumps(body).encode("utf-8")
    request = urllib.request.Request(url, data=json_data, method=method, headers=headers)
    with urllib.request.urlopen(request) as response:
        response_body = response.read().decode("utf-8")
