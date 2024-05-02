from django.urls import path
from extractor.views import index, extract_headlines

urlpatterns = [
    path('', index, name='index'),
    path('extract', extract_headlines, name='extract_headlines'),
]
