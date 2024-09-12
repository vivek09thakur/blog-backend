# example/urls.py
from django.urls import path

from blog.views import index,write_blog,get_blogs


urlpatterns = [
    path('', index),
    path('write_blog/', write_blog, name='write_blog'),
    path('get_blogs/', get_blogs, name='get_blogs'),
]