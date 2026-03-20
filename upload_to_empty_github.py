import requests
import base64
import os
import time

REPO_OWNER = 'abhimanyunain07'
REPO_NAME = 'KRATOS-Terminal'
BRANCH = 'main'
GITHUB_TOKEN = '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'

API_URL = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}'
HEADERS = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Accept': 'application/vnd.github.v3+json'
}

def upload_file_direct(filepath, message="Initial commit"):
    clean_path = filepath[2:] if filepath.startswith('./') else filepath
    if 'node_modules/' in clean_path or '.git/' in clean_path or 'dist/' in clean_path or clean_path.endswith('.py'):
        return
        
    print(f"Uploading {clean_path}...")
    
    with open(filepath, 'rb') as f:
        content = f.read()
        
    url = f'{API_URL}/contents/{clean_path}'
    data = {
        'message': message,
        'content': base64.b64encode(content).decode('utf-8'),
        'branch': BRANCH
    }
    
    response = requests.put(url, headers=HEADERS, json=data)
    if response.status_code in [201, 200]:
        print(f"Successfully uploaded {clean_path}")
    else:
        print(f"Failed to upload {clean_path}: {response.status_code}")
        print(response.json())
    time.sleep(0.5)

def main():
    print("Starting direct file upload to empty repository...")
    
    for root, dirs, files in os.walk('.'):
        for file in files:
            filepath = os.path.join(root, file)
            upload_file_direct(filepath)

if __name__ == "__main__":
    main()
