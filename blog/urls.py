# example/urls.py
from django.urls import path

from blog.views import index,write_blog,get_blogs,delete_all_blogs,delete_blog


urlpatterns = [
    path('', index),
    path('write_blog/', write_blog, name='write_blog'),
    path('get_blogs/', get_blogs, name='get_blogs'),
    path('delete_blog/<blog_id>/', delete_blog, name='delete_blog'),
    path('delete_all/', delete_all_blogs, name='delete_all'),
]