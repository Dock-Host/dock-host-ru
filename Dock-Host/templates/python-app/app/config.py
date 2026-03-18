import os


def get_port() -> int:
    return int(os.getenv("PORT", "8000"))


def build_payload() -> dict:
    return {
        "app": "dock-host-python-example",
        "status": "ok",
        "message": "Hello from Dock-Host!",
    }
