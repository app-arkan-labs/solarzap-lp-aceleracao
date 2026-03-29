import requests
import json
import os

PORTAINER_URL = "https://portainer.arkanlabs.com.br/api"
USERNAME = "arkan"
PASSWORD = "ArkanLabs@555"

def deploy():
    # 1. Authenticate
    print("Authenticating...")
    auth_resp = requests.post(f"{PORTAINER_URL}/auth", json={"username": USERNAME, "password": PASSWORD})
    auth_resp.raise_for_status()
    token = auth_resp.json()["jwt"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Get Endpoint ID
    print("Getting environment...")
    endpoints = requests.get(f"{PORTAINER_URL}/endpoints", headers=headers).json()
    endpoint_id = endpoints[0]["Id"]

    # 3. Read Stack YAML
    with open("stack.yml", "r") as f:
        stack_content = f.read()

    # 4. Create Stack
    # Endpoint: /stacks/create/standalone/string
    print(f"Deploying stack 'solarzap-lp-aceleracao' to endpoint {endpoint_id}...")
    payload = {
        "name": "solarzap-lp-aceleracao",
        "stackFileContent": stack_content
    }
    
    # Check if stack exists (optional, but safer)
    stacks = requests.get(f"{PORTAINER_URL}/stacks", headers=headers).json()
    existing_stack = next((s for s in stacks if s["Name"] == "solarzap-lp-aceleracao"), None)
    
    if existing_stack:
        print("Stack already exists. Updating...")
        stack_id = existing_stack["Id"]
        # Update existing stack
        update_url = f"{PORTAINER_URL}/stacks/{stack_id}?endpointId={endpoint_id}"
        resp = requests.put(update_url, headers=headers, json={"stackFileContent": stack_content})
    else:
        print("Creating new stack...")
        create_url = f"{PORTAINER_URL}/stacks/create/standalone/string?endpointId={endpoint_id}"
        resp = requests.post(create_url, headers=headers, json=payload)
    
    if resp.status_code in [200, 201]:
        print("Deployment Successful!")
        print(resp.json())
    else:
        print(f"Deployment Failed: {resp.status_code}")
        print(resp.text)

if __name__ == "__main__":
    deploy()
