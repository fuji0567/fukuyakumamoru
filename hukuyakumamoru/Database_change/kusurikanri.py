import urllib.request, json

if __name__ == "__main__":
    url = "https://hukuyakumamoru.com/medicationStatus/651816f8f674072b98f8a743"
    method = "PATCH"
    headers = {
        'Content-Type': 'application/json'
    }
    body = {
        "sunday": {
            "day": "日",
            "morning": False,
            "afternoon": False,
            "evening": False,
            "night": False
        },
        "monday": {
            "day": "月",
            "morning": False,
            "afternoon": False,
            "evening": False,
            "night": False
        },
        "tuesday": {
            "day": "火",
            "morning": False,
            "afternoon": False,
            "evening": False,
            "night": False
        },
        "wednesday": {
            "day": "水",
            "morning": False,
            "afternoon": False,
            "evening": False,
            "night": False
        },
        "thursday": {
            "day": "木",
            "morning": False,
            "afternoon": False,
            "evening": False,
            "night": False
        },
        "friday": {
            "day": "金",
            "morning": False,
            "afternoon": False,
            "evening": False,
            "night": False
        },
        "saturday": {
            "day": "土",
            "morning": False,
            "afternoon": False,
            "evening": False,
            "night": False
        }
    }
    json_data = json.dumps(body).encode("utf-8")
    request = urllib.request.Request(url, data=json_data, method=method, headers=headers)
    with urllib.request.urlopen(request) as response:
        response_body = response.read().decode("utf-8")