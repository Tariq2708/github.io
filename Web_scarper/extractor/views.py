from django.shortcuts import render
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
import subprocess
import tempfile

def extract_headlines(request):
    if request.method == 'GET' and 'websiteUrl' in request.GET:
        website_url = request.GET['websiteUrl']
        headlines = extract_headlines_from_url(website_url)
        # Save extracted headlines to a temporary file
        with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
            temp_file.write(headlines)
            temp_file_path = temp_file.name
        # Open Notepad.exe with the temporary file
        subprocess.Popen(['notepad.exe', temp_file_path])
        return JsonResponse({'headlines': headlines})
    return JsonResponse({'error': 'Invalid request'})


def extract_headlines_from_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    headlines = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p','pre'])
    headlines_text = '\n'.join([headline.get_text().strip() for headline in headlines])
    return headlines_text

def index(request):
    return render(request, 'scarp.html')
